import { IpAddressType } from '@/types/ip.types';
import { type IpAddresBinaryType } from '@/types/ip.types.js';
import { ERROR_MESSAGES } from '@/constant/errors.constants.js';
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

/**
 *
 * @param ipOctetBinary - binary number from ip adress
 * @param maskOctet - mask octet as a decimal number
 * @param fillWith - char to fill right site
 * @returns {number} - binary number to calculate octet
 */
export const calculatePartial = (ipOctetBinary: string, maskOctet: number, fillWith: string) => {
    const onesInMask: number = calculateShorthand([maskOctet]);
    const leftSide: string = ipOctetBinary.slice(0, onesInMask);

    return parseInt(leftSide.padEnd(8, fillWith), 2);
};

/**
 *
 * @param {IpAddressType} ipAdress
 * @param {IpAddressType} ipMask
 * @param {string} filler "0" or "1"
 * @param {number} ifZero what should return as octet if single octet is 0
 * @returns {IpAddressType} - calculates address (network - filler = "0" or broadcast - filler = "1")
 */

export const calculateAdress = (
    ipAdress: IpAddressType,
    ipMask: IpAddressType,
    filler: string,
    ifZero: number
): IpAddressType => {
    const ipAdressBinary: IpAddresBinaryType = ipToBinary(ipAdress);

    const networkIp = ipAdress.map((octet: number, index: number) => {
        if (ipMask[index] === 0) return ifZero;
        if (ipMask[index] === 255) return octet;

        return calculatePartial(ipAdressBinary[index], ipMask[index], filler);
    });
    return networkIp;
};

/**
 *
 * @param ipAdress
 * @returns a index of octet where 0 start to occur in binary ipadress representation
 */
export const whereZerosStart = (ipAdress: IpAddressType): number => {
    //determine where to start incrementing
    let octetToStart: number = 3;

    ipAdress.every((octet: number, index: number) => {
        if (octet === 255) return true;

        octetToStart = index;
        return false;
    });
    return octetToStart;
};
