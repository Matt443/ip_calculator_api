import { IpAddressType } from '@/types/ip.types';
import { calculateAdress } from '@/utils/calculating.util.js';

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
