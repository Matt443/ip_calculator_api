import { IpAddressType } from '@/types/ip.types';
import {
    calculateAdress,
    calculateShorthand,
    calculateSubnetsQuantity,
    whereZerosStart
} from '@/utils/calculating.util.js';
import { isInRange } from '@/utils/validation.util.js';

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

// export function getSubnets(networkAddress:IpAddressType, ipMask:IpAddressType, {subnetsHostQuantity, subnetsQuantity}:subnetsSetting):IpAddressType[] {
//     if (typeof subnetsQuantity !== 'undefined') {
//         subnetsQuantity = calculateSubnetsQuantity(subnetsHostQuantity, ipMask);
//     }

// }
