import { IpAddressType, NetworkInfoType, subnetSettingType } from '@/types/ip.types';
import {
    calculateAdress,
    calculateShorthand,
    calculateSubnetsQuantity,
    getAllSubnets,
    getMaxSubnets,
    ipBinaryToDefault,
    newMaskForSubnet,
    toBinary,
    whereZerosStart
} from '@/utils/calculating.util.js';
import { ipAddressValidation, isInRange, powerOf } from '@/utils/validation.util.js';

/**
 *
 * @param {IpAddressType} ipAdress
 * @param {IpAddressType} ipMask
 * @returns {IpAddressType} - network address for given ip and mask
 */
export function getNetworkAddress(ipAdress: IpAddressType, ipMask: IpAddressType): IpAddressType {
    return calculateAdress(ipAdress, ipMask, '0', 0);
}

/**
 *
 * @param {IpAddressType} ipAdress
 * @param {IpAddressType} ipMask
 * @returns {IpAddressType} - broadcast address for given ip and mask
 */
export function getBroadcastAddress(ipAdress: IpAddressType, ipMask: IpAddressType): IpAddressType {
    return calculateAdress(ipAdress, ipMask, '1', 255);
}

/**
 *
 * @param {IpAddressType} ipMask
 * @returns number of hosts
 */
export function getNumberOfHosts(ipMask: IpAddressType): number {
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
    if (!ipAddressValidation(ipAddress) || !ipAddressValidation(ipMask))
        throw Error('Bad ip address');
    const maxPossibleSubnets = getMaxSubnets(ipMask);
    const maskShorthand = calculateShorthand(ipMask);

    if (typeof subnetsQuantity === 'undefined') {
        subnetsQuantity = calculateSubnetsQuantity(subnetsHostQuantity, ipMask);
    }

    if (maxPossibleSubnets > maxPossibleSubnets) return [];

    const newMaskBinary = newMaskForSubnet(ipMask, subnetsQuantity, maskShorthand);

    const newMask: IpAddressType = ipBinaryToDefault(newMaskBinary);

    ipAddress = getNetworkAddress(ipAddress, ipMask);

    return getAllSubnets(ipAddress, newMask, 0, subnetsQuantity);
}
