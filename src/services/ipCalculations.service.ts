import { IpAddressType } from '@/types/ip.types';
import { calculateAdress, calculateShorthand } from '@/utils/calculating.util.js';

/**
 *
 * @param {IpAddressType} ipAdress
 * @param {IpAddressType} ipMask
 * @returns {IpAddressType} - network address for given ip and mask
 */
export const getNetworkAddress = (
    ipAdress: IpAddressType,
    ipMask: IpAddressType
): IpAddressType => {
    return calculateAdress(ipAdress, ipMask, '0', 0);
};

/**
 *
 * @param {IpAddressType} ipAdress
 * @param {IpAddressType} ipMask
 * @returns {IpAddressType} - broadcast address for given ip and mask
 */
export const getBroadcastAddress = (
    ipAdress: IpAddressType,
    ipMask: IpAddressType
): IpAddressType => {
    return calculateAdress(ipAdress, ipMask, '1', 255);
};

/**
 *
 * @param {IpAddressType} ipMask
 * @returns number of hosts
 */
export const getNumberOfHosts = (ipMask: IpAddressType): number => {
    const quantityOfZeros: number = 32 - calculateShorthand(ipMask);

    if (quantityOfZeros === 0) return 0;
    if (quantityOfZeros === 1) return 1;

    return Math.pow(2, quantityOfZeros) - 2;
};
