import { IpAddressType } from '@/types/ip.types';
import { type IpAddresBinaryType } from '@/types/ip.types.js';
import { ERROR_MESSAGES } from '@/constant/errors.constants.js';
import {
    getBroadcastAddress,
    getNumberOfHosts,
    isIpInRange
} from '@/services/ipCalculations.service.js';
import { ipAddressValidation, isInRange, powerOf } from './validation.util';
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
    const ipAddress: IpAddressType = [];

    for (let index: number = 0; index < 32; index += 8) {
        ipAddress.push(parseInt(ipBinary.substring(index, index + 8), 2));
    }
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
 * @returns {number} - binary number to calculate octet
 */
export function calculatePartial(
    ipOctetBinary: string,
    maskOctet: number,
    fillWith: string
): number {
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

export function converIpToDecimal(ipAddres: IpAddressType): number {
    if (!ipAddressValidation(ipAddres)) return -1;

    const initialValue: number = 0;
    return ipAddres.reduce(
        (acc, octet, index) => acc + Math.pow(256, 3 - index) * octet,
        initialValue
    );
}
