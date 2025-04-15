import { ERROR_MESSAGES } from '@/constant/errors.constants.js';
import { IpAddressType, NetworkInfoType, subnetSettingType } from '@/types/ip.types';
import {
    calculateAddress,
    calculateProperHostQuantity,
    calculateShorthand,
    createAddressConversions,
    getAllSubnets,
    getAllSubnetsVLSM,
    getMasksVLSM,
    getSubnetsQuantity,
    ipBinaryToDefault,
    moveInAddress,
    newMaskForSubnet,
    whereZerosStart
} from '@/utils/calculating.util.js';
import {
    ipAddressValidation,
    isInRange,
    subnetsPossibleValidation,
    VLSMSubnetsPossibleValidation
} from '@/utils/validation.util.js';

/**
 *
 * @param {IpAddressType} ipAddress
 * @param {IpAddressType} ipMask
 * @returns {IpAddressType} - network address for given ip and mask
 */
export function getNetworkAddress(ipAddress: IpAddressType, ipMask: IpAddressType): IpAddressType {
    if (!ipAddressValidation(ipAddress) || !ipAddressValidation(ipMask))
        throw Error(ERROR_MESSAGES.validation.ipAddrress);

    return calculateAddress(ipAddress, ipMask, '0', 0);
}

/**
 *
 * @param {IpAddressType} ipAddress
 * @param {IpAddressType} ipMask
 * @returns {IpAddressType} - broadcast address for given ip and mask
 */
export function getBroadcastAddress(
    ipAddress: IpAddressType,
    ipMask: IpAddressType
): IpAddressType {
    if (!ipAddressValidation(ipAddress) || !ipAddressValidation(ipMask))
        throw Error(ERROR_MESSAGES.validation.ipAddrress);

    return calculateAddress(ipAddress, ipMask, '1', 255);
}

/**
 *
 * @param {IpAddressType} ipMask
 * @returns number of hosts
 */
export function getNumberOfHosts(ipMask: IpAddressType): number {
    if (!ipAddressValidation(ipMask)) throw Error(ERROR_MESSAGES.validation.ipAddrress);

    const quantityOfZeros: number = 32 - calculateShorthand(ipMask);

    if (quantityOfZeros === 0 || quantityOfZeros === 1) return 0;

    return Math.pow(2, quantityOfZeros) - 2;
}

/**
 *
 * @param {IpAddressType} ipAddres
 * @param {IpAddressType} ipMask
 * @param {IpAddressType} rangeMin
 * @param {IpAddressType} rangeMax
 * @returns {boolean} true if is in range
 */
export function isIpInRange(
    ipAddres: IpAddressType,
    ipMask: IpAddressType,
    rangeMin: IpAddressType,
    rangeMax: IpAddressType
): boolean {
    const whereToStart: number = whereZerosStart(ipMask);

    let currentIndex = 0;
    return ipAddres.slice(whereToStart, 4).every((octet: number, index: number) => {
        currentIndex = whereToStart + index;
        return isInRange(octet, rangeMin[currentIndex], rangeMax[currentIndex]);
    });
}

/**
 *
 * @param {IpAddressType} ipAddress
 * @param {IpAddressType} ipMask
 * @param {subnetSettingType} subnetsSetting
 * @returns {NetworkInfoType[]} all subnets with certain amount of hosts or certain amount of subnets
 */
export function getSubnets(
    ipAddress: IpAddressType,
    ipMask: IpAddressType,
    { subnetsHostQuantity, subnetsQuantity }: subnetSettingType
): NetworkInfoType[] {
    const maskShorthand = calculateShorthand(ipMask);
    subnetsQuantity = getSubnetsQuantity({ subnetsHostQuantity, subnetsQuantity }, ipMask);

    // console.log(subnetsQuantity, subnetsHostQuantity, subnetsQuantity)
    if (subnetsQuantity === -1 || !subnetsPossibleValidation(ipMask, subnetsQuantity)) return [];
    const newMaskBinary = newMaskForSubnet(ipMask, subnetsQuantity, maskShorthand);

    const newMask: IpAddressType = ipBinaryToDefault(newMaskBinary);

    ipAddress = getNetworkAddress(ipAddress, ipMask);

    return getAllSubnets(ipAddress, newMask, subnetsQuantity);
}

/**
 *
 * @param {IpAddressType} ipAddress
 * @param {IpAddressType} ipMask
 * @param {number[]} hostQuantities
 * @returns {NetworkInfoType[]} an object with complete information of subnets
 */
export function getSubnetsVLSM(
    ipAddress: IpAddressType,
    ipMask: IpAddressType,
    hostQuantities: number[]
): NetworkInfoType[] {
    const { requestedHostQuantity, maxHosts, subnetsSettingsVLSM } = calculateProperHostQuantity(
        hostQuantities,
        ipMask
    );

    if (!VLSMSubnetsPossibleValidation(requestedHostQuantity, maxHosts)) return [];
    const masks: IpAddressType[] = getMasksVLSM(subnetsSettingsVLSM, true);

    return getAllSubnetsVLSM(ipAddress, masks);
}

/**
 *
 * @param {IpAddressType} ipAddress
 * @param {IpAddressType} ipMask
 * @returns {NetworkInfoType} complete info about a network
 */
export function getSingleNetwork(ipAddress: IpAddressType, ipMask: IpAddressType): NetworkInfoType {
    const networkAddress: IpAddressType = getNetworkAddress(ipAddress, ipMask);
    const broadcastAddress: IpAddressType = getBroadcastAddress(ipAddress, ipMask);
    const hostQuantity: number = getNumberOfHosts(ipMask);
    const hosts = {
        first: moveInAddress(true, networkAddress),
        last: moveInAddress(false, broadcastAddress)
    };

    const networkInfo: NetworkInfoType = {
        networkAddress: createAddressConversions(networkAddress),
        broadcastAddress: createAddressConversions(broadcastAddress),
        ipMask: createAddressConversions(ipMask),
        hosts: {
            first: createAddressConversions(hosts.first),
            last: createAddressConversions(hosts.last),
            quantity: hostQuantity
        }
    };

    if (hostQuantity < 2) {
        delete networkInfo.hosts.first;
        delete networkInfo.hosts.last;
    }
    return networkInfo;
}
