import { IpAddressType } from '@/types/ip.types';
import { type IpAddresBinaryType } from '@/types/ip.types.js';
import { ERROR_MESSAGES } from '@/constants/errors.constants.js';
/**
 *
 * @param {number} decimal - number to be convert
 * @returns {string} - string with binary representations of a number
 */
export const toBinary = (decimal: number): string => {
    if (decimal < 0) throw new Error(ERROR_MESSAGES.utils.binary);

    return Number(decimal).toString(2);
};

/**
 *
 * @param {IpAddressType} ipAdress
 * @returns {IpAddressType}
 */
export const ipToBinary = (ipAdress: IpAddressType): IpAddresBinaryType => {
    return ipAdress.map((octet: number) => toBinary(octet).padStart(8, String(0)));
};

/**
 *
 * @param {IpAddressType} ipAddress
 * @returns {number} number represents a shorthand of a adress
 */

export const calculateShorthand = (ipAddress: IpAddressType): number => {
    const adressBinaryString: string = concatBinary(ipToBinary(ipAddress));

    return adressBinaryString.replace(/[^1]/g, '').length;
};

/**
 *
 * @param {IpAddressType} ipAdress
 * @returns - concatenated binary string
 */
export const concatBinary = (ipAdress: IpAddresBinaryType): string => {
    return ipAdress.join('');
};
