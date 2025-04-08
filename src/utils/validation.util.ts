import { IpAddresBinaryType, IpAddressType, IpFormatType } from '@/types/ip.types';
import {
    binaryMergedToDefault,
    binaryMergedToUnmerged,
    ipBinaryToDefault,
    ipDecimalToDefault,
    ipDottedToDefault,
    ipToBinary
} from './calculating.util';
import { anyIpAddressStrategy } from '@/types/strategy.types';

/**
 *
 * @param emailToValidate - data to be validated
 * @returns {boolean} - true if data passed a test and false if not
 */
export function emailValidation(emailToValidate: string): boolean {
    const emailRegex = new RegExp(
        `^[a-zA-Z0-9.!#$%&'*+=?^_\`{|}~-]+@[a-zA-Z.0-9!#$%&'*+=?^_\`{|}~-]+[.]+[A-Za-z]{2,4}$`
    );
    return validationWithRegex(emailToValidate, emailRegex);
}

/**
 *
 * @param stringToValidate - data to be validated
 * @returns {boolean} - true if data passed a test and false if not
 */
export function stringValidation(stringToValidate: string): boolean {
    const specialChars = new RegExp('^[a-zA-Z0-9 .,!?()&@#$%^*_-]+$');
    return validationWithRegex(stringToValidate, specialChars);
}

/**
 *
 * @param stringToValidate - data to be validated
 * @param regex - regex pattern to validate a string
 * @returns {boolean} - true if data passed a test and false if not
 */
export function validationWithRegex(stringToValidate: string, regex: RegExp): boolean {
    if (regex.test(stringToValidate) === true) return true;
    return false;
}

/**
 *
 * @param id - string to be validated
 * @returns {boolean}  - true if data passed a test and false if not
 */
export function mongooseIdValidation(id: string): boolean {
    if (typeof id !== 'string' || id.length !== 24) return false;
    return true;
}

/**
 *
 * @param {IpAddressType} ipAdress
 * @returns {boolean} true if adress is valid
 */

export function ipAddressValidation(ipAdress: IpAddressType): boolean {
    if (ipAdress.length !== 4) return false;
    return ipAdress.every((octet: number) => {
        return octetValidation(octet);
    });
}

/**
 *
 * @param {string} ip string with binary representation of ip
 * @returns {boolean} true if address is correct
 */
export function ipAddressBinaryValidation(ip: string): boolean {
    if (!validationWithRegex(ip, new RegExp('^[0-1]{32}$'))) return false;

    const ipDefault: IpAddressType = ipBinaryToDefault(binaryMergedToUnmerged(ip));

    return ipAddressValidation(ipDefault);
}

/**
 *
 * @param {number} ipDecimal
 * @returns {boolean} true if address is correct
 */

export function ipAddressDecimalValidation(ipDecimal: number): boolean {
    if (
        !validationWithRegex(String(ipDecimal), new RegExp('^[0-9]+$')) ||
        !isInRange(ipDecimal, 0, 4294967295)
    )
        return false;

    const ipDefault: IpAddressType = ipDecimalToDefault(ipDecimal);

    return ipAddressValidation(ipDefault);
}

/**
 *
 * @param {number} octet
 * @returns {boolean} - true if param octet is number and is between 0 and 255
 */
export function octetValidation(octet: number): boolean {
    if (!isNaN(octet) && typeof octet === 'number' && octet > -1 && octet < 256) return true;
    return false;
}

/**
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {boolean}
 */
export function isInRange(value: number, min: number, max: number): boolean {
    return value <= max && value >= min;
}

/**
 *
 * @param {number} numberValue
 * @param {number} base
 * @returns {number} Returns the power to which the base must be raised to obtain the numberValue
 */
export function powerOf(numberValue: number, base: number): number {
    if (numberValue === 1) return 0;

    if (numberValue < 0 || numberValue % base !== 0 || numberValue > Number.MAX_SAFE_INTEGER)
        return -1;

    const currentNumber: { power: number; value: number } = {
        power: 0,
        value: 1
    };
    while (currentNumber.value <= numberValue) {
        currentNumber.value = Math.pow(base, currentNumber.power);
        if (currentNumber.value === numberValue) return currentNumber.power;

        currentNumber.power++;
    }

    return -1;
}

/**
 *
 * @param {string} type
 * @returns {boolean} if type is included in supported types
 */

export function ipAddressTypeValidation(type: string): boolean {
    return ['decimal', 'default', 'binary', 'shorthand'].includes(type);
}

/**
 *
 * @param {number} shorthand
 * @returns {boolean}
 */
export function ipShorthandValidation(shorthand: number): boolean {
    if (!isInRange(shorthand, 0, 32)) return false;
    return true;
}

/**
 *
 * @param {string} ipBinaryMerged
 * @returns {boolean}
 */
export function possibleShorthandValidation(ipBinaryMerged: string): boolean {
    if (ipBinaryMerged.length !== 32) return false;
    const firstZero: number = ipBinaryMerged.indexOf('0');

    if (firstZero === -1) return true;

    const rightPart: string = ipBinaryMerged.slice(firstZero);

    if (rightPart.indexOf('1') === -1) return true;

    return false;
}
