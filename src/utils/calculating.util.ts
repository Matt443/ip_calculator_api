import {
    IpAddressDottedType,
    IpAddressInfoType,
    IpAddressType,
    NetworkInfoType,
    subnetSettingVLSM_Type
} from '@/types/ip.types';
import { type IpAddresBinaryType } from '@/types/ip.types.js';
import { ERROR_MESSAGES } from '@/constant/errors.constants.js';
import {
    getBroadcastAddress,
    getNetworkAddress,
    getNumberOfHosts,
    getSingleNetwork
} from '@/services/ipCalculations.service.js';
import {
    ipAddressValidation,
    ipShorthandValidation,
    isInRange,
    powerOf
} from '@/utils/validation.util.js';
import { replaceInString } from '@/utils/common.js';
/**
 *
 * @param {number} decimal - number to be convert
 * @returns {string} - string with binary representations of a number
 */
export function toBinary(decimal: number): string {
    if (decimal < 0) throw new Error(ERROR_MESSAGES.utils.binary);

    return Number(decimal).toString(2);
}

/**
 *
 * @param {IpAddressType} ipAdress
 * @returns {IpAddressType}
 */
export function ipToBinary(ipAdress: IpAddressType): IpAddresBinaryType {
    return ipAdress.map((octet: number) => toBinary(octet).padStart(8, String(0)));
}

/**
 *
 * @param {IpAddressType} ipAddress
 * @returns {number} number represents a shorthand of a adress
 */

export function calculateShorthand(ipAddress: IpAddressType): number {
    const adressBinaryString: string = concatBinary(ipToBinary(ipAddress));

    return adressBinaryString.replace(/[^1]/g, '').length;
}

/**
 *
 * @param shorthand shorthand ip address
 * @returns ip address as contains four numbers
 */

export function calculateFromShorthand(shorthand: number): IpAddressType {
    if (!isInRange(shorthand, 0, 32)) return [];

    let ipBinary: string = '';
    ipBinary = ipBinary.padEnd(shorthand, '1');
    ipBinary = ipBinary.padEnd(32, '0');

    const ipAddress: IpAddressType = binaryMergedToDefault(ipBinary);

    return ipAddress;
}

/**
 *
 * @param {IpAddressType} ipAdress
 * @returns - concatenated binary string
 */
export function concatBinary(ipAdress: IpAddresBinaryType): string {
    return ipAdress.join('');
}

/**
 *
 * @param ipOctetBinary - binary string from ip adress
 * @param maskOctet - mask octet as a decimal number
 * @param fillWith - char to fill right site
 * @returns {number} - calculate octed
 */
export function calculatePartial(
    ipOctetBinary: string,
    maskOctet: number,
    fillWith: string
): number {
    if (!isInRange(maskOctet, 0, 255) || !isInRange(parseInt(ipOctetBinary, 2), 0, 255)) return -1;
    const onesInMask: number = calculateShorthand([maskOctet]);
    const leftSide: string = ipOctetBinary.slice(0, onesInMask);

    return parseInt(leftSide.padEnd(8, fillWith), 2);
}

/**
 *
 * @param {IpAddressType} ipAdress
 * @param {IpAddressType} ipMask
 * @param {string} filler "0" or "1"
 * @param {number} ifZero what should return as octet if single octet is 0
 * @returns {IpAddressType} - calculates address (network - filler = "0" or broadcast - filler = "1")
 */

export function calculateAdress(
    ipAdress: IpAddressType,
    ipMask: IpAddressType,
    filler: string,
    ifZero: number
): IpAddressType {
    const ipAdressBinary: IpAddresBinaryType = ipToBinary(ipAdress);

    const networkIp = ipAdress.map((octet: number, index: number) => {
        if (ipMask[index] === 0) return ifZero;
        if (ipMask[index] === 255) return octet;

        return calculatePartial(ipAdressBinary[index], ipMask[index], filler);
    });
    return networkIp;
}

/**
 *
 * @param {IpAddressType} ipAdress
 * @returns {number} a index of octet where "0" start to occur in binary ipadress representation
 */
export function whereZerosStart(ipAdress: IpAddressType): number {
    if (!ipAddressValidation(ipAdress)) return -1;
    //determine where to start incrementing
    let octetToStart: number = 3;

    ipAdress.every((octet: number, index: number) => {
        if (octet === 255) return true;

        octetToStart = index;
        return false;
    });
    return octetToStart;
}

/**
 *
 * @param {number} numberOfHosts nubmer of host in every subnet
 * @param {IpAddressType} ipMask
 * @returns {number} number of subnets depens on number of hosts on every subnet
 */

export function calculateSubnetsQuantity(numberOfHosts: number, ipMask: IpAddressType): number {
    let hostWith = numberOfHosts + 2;
    if (
        !isInRange(numberOfHosts, 0, 4294967296) ||
        !ipAddressValidation(ipMask) ||
        powerOf(hostWith, 2) === -1
    )
        return -1;

    const possibleHosts = getNumberOfHosts(ipMask) + 2;
    if (possibleHosts === 0 || numberOfHosts >= possibleHosts) return -1;

    return Math.round(possibleHosts / hostWith);
}

export function moveInAddress(forward: boolean, ipAddress: IpAddressType): IpAddressType {
    let modyficator: number = -1;
    const newIp: IpAddressType = [...ipAddress];

    if (forward) modyficator = 1;

    newIp[3] += modyficator;
    if (!ipAddressValidation(newIp)) return ipBalancer(newIp);

    return newIp;
}

/**
 *
 * @param {IpAddressType} ipAddress
 * @returns {IpAddressType} corrected ip adress if possible, if correction isn't possible returns 0;
 */
export function ipBalancer(ipAddress: IpAddressType): IpAddressType {
    if (ipAddressValidation(ipAddress)) return ipAddress;
    const modificationSet: { modyficator: number; newVal: number } = {
        modyficator: -1,
        newVal: 255
    };

    //Checking if address have problem with to big last octet
    if (ipAddress[3] > 255) {
        modificationSet.modyficator = 1;
        modificationSet.newVal = 0;
    }

    let indexToChange: number = -1;
    const ipAddressCopy: IpAddressType = [...ipAddress];

    //Finding indexes to change
    ipAddress
        .slice(0, 4)
        .reverse()
        .find((octet: number, index) => {
            if (modificationSet.modyficator === -1 && octet > 0) {
                indexToChange = index;
                return true;
            }
            if (modificationSet.modyficator === 1 && octet < 255) {
                indexToChange = index;
                return true;
            }
        });
    if (indexToChange === -1) return [];

    //Change first octet on the left
    ipAddressCopy[3 - indexToChange] += modificationSet.modyficator;

    //Setting new values to indexes on the left from incremented/decremented index
    ipAddress.slice(0, indexToChange).forEach((element: number, index: number) => {
        ipAddressCopy[3 - index] = modificationSet.newVal;
    });

    return ipAddressCopy;
}

/**
 *
 * @param {boolean} firstIpAddress
 * @param {boolean} secondIpAddress
 * @returns {boolean} checks if one adress if the same like another
 */
export function isIpEqual(firstIpAddress: IpAddressType, secondIpAddress: IpAddressType): boolean {
    return firstIpAddress.every((octet: number, index) => {
        if (octet === secondIpAddress[index]) return true;
        return false;
    });
}

/**
 *
 * @param {IpAddressType} ipAddres
 * @returns {number} decimal representation of ip adress
 */

export function ipToDecimal(ipAddress: IpAddressType): number {
    if (!ipAddressValidation(ipAddress)) return -1;

    const initialValue: number = 0;
    return ipAddress.reduce((acc, octet, index) => {
        return acc + Math.pow(256, 3 - index) * octet;
    }, initialValue);
}

/**
 *
 * @param {IpAddressType} ipMask
 * @returns {number} max possible quantity of subnets
 */
export function getMaxSubnets(ipMask: IpAddressType): number {
    if (!ipAddressValidation(ipMask)) return -1;

    const subnetsQuantity = Math.pow(2, 30 - calculateShorthand(ipMask));

    if (subnetsQuantity < 2) return -1;
    return subnetsQuantity;
}

/**
 *
 * @param {IpAddressType} ipMask
 * @param {number} subnetsQuantity
 * @param {number} maskShorthand
 * @returns {IpAddresBinaryType} mask for new subnets in binary
 */
export function newMaskForSubnet(
    ipMask: IpAddressType,
    subnetsQuantity: number,
    maskShorthand: number
): IpAddresBinaryType {
    if (subnetsQuantity < 0 || !ipAddressValidation(ipMask) || maskShorthand > 32) return [];

    const bitsToTake: number = powerOf(subnetsQuantity, 2);
    const maxSubnets = getMaxSubnets(ipMask);

    if (bitsToTake === -1 || maxSubnets < subnetsQuantity) return [];

    const ipMaskBinary: string[] = ipToBinary(ipMask);

    const newMaskBinary = replaceInString(
        ipMaskBinary.join(''),
        maskShorthand,
        maskShorthand + bitsToTake,
        '1'.padEnd(bitsToTake, '1')
    );
    return binaryMergedToUnmerged(newMaskBinary);
}

/**
 *
 * @param {IpAddressType} ipAddress
 * @returns {IpAddressType} object with all conversions of ip address
 */
export function createAddressConversions(ipAddress: IpAddressType): IpAddressInfoType {
    if (!ipAddressValidation(ipAddress)) throw Error(ERROR_MESSAGES.validation.ipAdrress);
    return {
        ip: ipAddress,
        decimal: ipToDecimal(ipAddress),
        binary: ipToBinary(ipAddress),
        dotted: ipToDotted(ipAddress)
    };
}

/**
 *
 * @param {IpAddressType} ipAddress
 * @param {IpAddressType} ipMask
 * @param {number} index index of subnet to create
 * @param {number} subnetsQuantity
 * @param {NetworkInfoType[]} subnetsArray array to push results
 * @returns {NetworkInfoType[]} returns all subnets in the network
 */

export function getAllSubnets(
    ipAddress: IpAddressType,
    ipMask: IpAddressType,
    subnetsQuantity: number,
    subnetsArray: NetworkInfoType[] = []
): NetworkInfoType[] {
    if (subnetsQuantity > 1024) return subnetsArray;

    //Maybe back to recursion
    for (let i = 0; i < subnetsQuantity; i++) {
        const subnet: NetworkInfoType = getSingleNetwork(ipAddress, ipMask);
        subnetsArray.push(subnet);

        ipAddress = moveInAddress(true, subnet.broadcastAddress.ip);
    }

    return subnetsArray;
}

/**
 *
 * @param {IpAddresBinaryType} ipAddresBinary
 * @returns {IpAddressType} returns four element array with ip octets
 */

export function ipBinaryToDefault(ipAddresBinary: IpAddresBinaryType): IpAddressType {
    return ipAddresBinary.map((octet: string) => {
        return parseInt(octet, 2);
    });
}

/**
 *
 * @param {string} ipAddress
 * @returns {IpAddressType} returns four element array with ip octets
 */

export function ipDottedToDefault(ipAddress: IpAddressDottedType): IpAddressType {
    const ip: string[] = ipAddress.split('.');

    return ip.map((octet: string) => parseInt(octet, 10));
}

/**
 *
 * @param {IpAddressType} ipAddres
 * @returns {string} ip address as a dotted string
 */

export function ipToDotted(ipAddres: IpAddressType): string {
    return ipAddres.join('.');
}

/**
 *
 * @param {string} binaryString
 * @param {number} index index of a octet
 * @param {IpAddresBinaryType} ipAddressBinary array to return
 * @returns {IpAddresBinaryType} four element array with binary representation of a ip adress
 */
export function binaryMergedToUnmerged(
    binaryString: string,
    index: number = 0,
    ipAddressBinary: IpAddresBinaryType = []
): IpAddresBinaryType {
    if (binaryString.length % 8 !== 0) return [];

    if (index >= binaryString.length) return ipAddressBinary;

    ipAddressBinary.push(binaryString.substring(index, index + 8));

    return binaryMergedToUnmerged(binaryString, index + 8, ipAddressBinary);
}

/**
 *
 * @param {string} binaryString
 * @param {number} index
 * @param {IpAddressType} ipAddress
 * @returns returns four element array with ip octets
 */

export function binaryMergedToDefault(
    binaryString: string,
    index: number = 0,
    ipAddress: IpAddressType = []
): IpAddressType {
    if (binaryString.length % 8 !== 0) return [];

    if (index >= binaryString.length) return ipAddress;

    ipAddress.push(parseInt(binaryString.substring(index, index + 8), 2));

    return binaryMergedToDefault(binaryString, index + 8, ipAddress);
}

/**
 *
 * @param {number} power
 * @param {number} value
 * @param {number} currentPower
 * @param {number} maxValue @default 1024
 * @returns an object with the correct host value and a power number to obtain a value
 */

export function findNextHostQuantity(
    power: number,
    value: number = 2,
    currentPower: number = 1,
    maxValue: number = 1024
): subnetSettingVLSM_Type {
    if (!isInRange(value, power, maxValue))
        throw new Error('Number of host must be a number between given power and maxValue');
    const currentValue: number = Math.pow(power, currentPower);
    if (currentValue >= value) return { hostQuantity: currentValue, power: currentPower };
    currentPower++;
    return findNextHostQuantity(power, value, currentPower);
}

/**
 *
 * @param {IpAddressType} ipAddres
 * @param {IpAddressType[]} masks
 * @param {number} index @default 0 index to start
 * @param {NetworkInfoType[]} resultArray @default []
 * @returns {NetworkInfoType[]} subnets calculated with VLSM method
 */
export function getAllSubnetsVLSM(
    ipAddres: IpAddressType,
    masks: IpAddressType[],
    index: number = 0,
    resultArray: NetworkInfoType[] = []
): NetworkInfoType[] {
    if (index >= masks.length) return resultArray;

    const currentNet = getSingleNetwork(ipAddres, masks[index]);

    resultArray.push(currentNet);

    return getAllSubnetsVLSM(
        moveInAddress(true, currentNet.broadcastAddress.ip),
        masks,
        index + 1,
        resultArray
    );
}

/**
 *
 * @param {subnetSettingVLSM_Type[]} subnetsSettingsVLSM object with host quanity and power of to obtain this host quantity
 * @returns {IpAddressType} object with masks for given amount of host
 */
export function getMasksVLSM(subnetsSettingsVLSM: subnetSettingVLSM_Type[]): IpAddressType[] {
    return subnetsSettingsVLSM.map((subnetSetting: subnetSettingVLSM_Type) => {
        if (subnetSetting.power < 3) subnetSetting.power++;
        const newMaskBinary = '1'.padEnd(32 - subnetSetting.power, '1').padEnd(32, '0');

        return ipBinaryToDefault(binaryMergedToUnmerged(newMaskBinary));
    });
}

/**
 *
 * @param {number[]} hostQuantities array with number of hosts
 * @returns {subnetSettingVLSM_Type[]} object with host quanity and power of to obtain this host quantity
 */
export function calculateNumberOfHostsVLSM(hostQuantities: number[]): subnetSettingVLSM_Type[] {
    return hostQuantities.map((hostQuantity: number) => {
        let powerOfTwo = powerOf(hostQuantity, 2);

        if (powerOfTwo !== -1) return { hostQuantity: hostQuantity, power: powerOfTwo };

        return findNextHostQuantity(2, hostQuantity);
    });
}

/**
 *
 * @param {number} ipDecimal
 * @returns {IpAddressType}
 */
export function ipDecimalToDefault(ipDecimal: number): IpAddressType {
    if (!isInRange(ipDecimal, 0, 4294967295)) return [];
    return [
        (ipDecimal >> 24) & 0xff,
        (ipDecimal >> 16) & 0xff,
        (ipDecimal >> 8) & 0xff,
        ipDecimal & 0xff
    ];
}

/**
 *
 * @param {number} shorthand
 * @returns {IpAddressType}
 */
export function shorthandToDefault(shorthand: number): IpAddressType {
    if (!ipShorthandValidation(shorthand)) return [];
    const ipBinary = ''.padEnd(shorthand, '1').padEnd(32, '0');
    const ipDefault = binaryMergedToDefault(ipBinary);
    return ipDefault;
}
