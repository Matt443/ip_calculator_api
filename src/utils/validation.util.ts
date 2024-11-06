import { IpAddressType } from '@/types/ip.types';

/**
 *
 * @param emailToValidate - data to be validated
 * @returns {boolean} - true if data passed a test and false if not
 */
export const emailValidation = (emailToValidate: string): boolean => {
    const emailRegex = new RegExp(
        `^[a-zA-Z0-9.!#$%&'*+=?^_\`{|}~-]+@[a-zA-Z.0-9!#$%&'*+=?^_\`{|}~-]+[.]+[A-Za-z]{2,4}$`
    );
    return validationWithRegex(emailToValidate, emailRegex);
};

/**
 *
 * @param stringToValidate - data to be validated
 * @returns {boolean} - true if data passed a test and false if not
 */
export const stringValidation = (stringToValidate: string): boolean => {
    const specialChars = new RegExp('^[a-zA-Z0-9 .,!?()&@#$%^*_-]+$');
    return validationWithRegex(stringToValidate, specialChars);
};

/**
 *
 * @param stringToValidate - data to be validated
 * @param regex - regex pattern to validate a string
 * @returns {boolean} - true if data passed a test and false if not
 */
export const validationWithRegex = (stringToValidate: string, regex: RegExp): boolean => {
    if (regex.test(stringToValidate) === true) return true;
    return false;
};

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

export const ipAddressValidation = (ipAdress: IpAddressType): boolean => {
    return ipAdress.every((octet: number) => {
        return octetValidation(octet);
    });
};

/**
 *
 * @param {number} octet
 * @returns {boolean} - true if param octet is number and is between 0 and 255
 */
export const octetValidation = (octet: number) => {
    if (!isNaN(octet) && typeof octet === 'number' && octet > -1 && octet < 256) return true;
    return false;
};
