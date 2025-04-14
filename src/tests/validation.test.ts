import {
    emailValidation,
    ipAddressBinaryValidation,
    ipAddressValidation,
    ipAddressTypeValidation,
    isInRange,
    mongooseIdValidation,
    octetValidation,
    powerOf,
    stringValidation,
    validationWithRegex,
    ipAddressDecimalValidation,
    ipShorthandValidation,
    possibleShorthandValidation,
    subnetsPossibleValidation
} from '@/utils/validation.util.js';
import {
    emails,
    strings,
    validatorTester,
    texts,
    sampleIpAdress,
    sampleIpAdress_wrong
} from '@/constant/samples.constant.js';
import { supportedIpFormats } from '@/constant/supported.constants.js';

describe('Testing email validation', () => {
    it(texts.pass + '(simple)', () => {
        validatorTester(emails.simple, emailValidation, true);
    });
    it(texts.pass + '(complicated)', () => {
        validatorTester(emails.complicated, emailValidation, true);
    });
    it(texts.pass + '(super complicated)', () => {
        validatorTester(emails.super_complicated, emailValidation, true);
    });

    // False
    it('Should not pass the validation (wrong)', () => {
        validatorTester(emails.wrong, emailValidation, false);
    });
});

describe("String validation tests (^[a-zA-Z0-9 .,!?()&@#$%^*_-]+$')", () => {
    it(texts.pass + 'simple', () => {
        validatorTester(strings.simple, stringValidation, true);
    });
    it(texts.pass + 'complicated', () => {
        validatorTester(strings.complicated, stringValidation, true);
    });

    //False
    it(texts.fail, () => {
        validatorTester(strings.wrong, stringValidation, false);
    });
});

describe('Validation with regex testing', () => {
    it(texts.pass, () => {
        expect(validationWithRegex('1234567890', new RegExp('[0-9]'))).toBe(true);
        expect(validationWithRegex('qwertyiopasdfghjklzxcvbnm', new RegExp('[a-z]'))).toBe(true);
    });
    it(texts.fail, () => {
        expect(validationWithRegex('qwert12321yiopasdfghjklzxcvbnm', new RegExp('^[a-z].$'))).toBe(
            false
        );
    });
});

describe('Mongoose id validation', () => {
    it(texts.pass, () => {
        expect(mongooseIdValidation('64c183349d7baba26fc6755c')).toBe(true);
    });
    it(texts.fail, () => {
        expect(mongooseIdValidation('64c183349sd7baba26fc6755c')).toBe(false);
    });
});

describe('Testing ipAddressValidation function', () => {
    it('Should validate api adress and return true', () => {
        expect(ipAddressValidation(sampleIpAdress)).toBe(true);
    });
    it('Should validate api adress and return false', () => {
        expect(ipAddressValidation(sampleIpAdress_wrong)).toBe(false);
    });
});
describe('Testing ipAddressValidation function', () => {
    it('Should return true after validation', () => {
        expect(octetValidation(sampleIpAdress[1])).toBe(true);
    });
    it('Should return false after validation', () => {
        expect(octetValidation(sampleIpAdress_wrong[0])).toBe(false);
        expect(octetValidation(sampleIpAdress_wrong[2])).toBe(false);
    });
});

describe('Testing is in range function', () => {
    it('Should validate if value is in the range', () => {
        expect(isInRange(1, 0, 2)).toBe(true);
    });
    it('Should validate if value is in the range', () => {
        expect(isInRange(3, 0, 2)).toBe(false);
    });
});

describe('Testing powerOf function', () => {
    it('Should check if value is base^n and return he power to which the base must be raised to obtain the numberValue', () => {
        expect(powerOf(4, 2)).toBe(2);
        expect(powerOf(8, 2)).toBe(3);
        expect(powerOf(1, 2)).toBe(0);
    });
    it('Should check if value is base^n and return he power to which the base must be raised to obtain the numberValue', () => {
        expect(powerOf(5, 2)).toBe(-1);
        expect(powerOf(19, 2)).toBe(-1);
        expect(powerOf(Number.MAX_SAFE_INTEGER + 1, 2)).toBe(-1);
    });
});

describe('Testing ipAddresTypeValidation function', () => {
    it('Should check if given type is supported and return true', () => {
        supportedIpFormats.map((format: string) => {
            expect(ipAddressTypeValidation(format)).toBe(true);
        });
    });
    it('Should check if given type is supported and return false', () => {
        expect(ipAddressTypeValidation('1234')).toBe(false);
        expect(ipAddressTypeValidation('decimals')).toBe(false);
        expect(ipAddressTypeValidation('defaults')).toBe(false);
        expect(ipAddressTypeValidation('')).toBe(false);
    });
});

describe('Testing ipAddressBinaryValidation function', () => {
    it('Check if given binary address is correct and return true', () => {
        expect(ipAddressBinaryValidation('11000000101010000000000000000001')).toBe(true);
        expect(ipAddressBinaryValidation('11111111111111111111111111111111')).toBe(true);
        expect(ipAddressBinaryValidation('00000000000000000000000000000000')).toBe(true);
    });
    it('Check if given binary address is correct and return false', () => {
        expect(ipAddressBinaryValidation('1111111111111111111111111111111a')).toBe(false);
        expect(ipAddressBinaryValidation('1111111111111111111111111111111')).toBe(false);
        expect(ipAddressBinaryValidation('0')).toBe(false);
        expect(ipAddressBinaryValidation('')).toBe(false);
        expect(ipAddressBinaryValidation('192.168.0.1')).toBe(false);
        expect(ipAddressBinaryValidation('-11111111111111111111111111111111')).toBe(false);
        expect(ipAddressBinaryValidation('1111111111111111-1111111111111111')).toBe(false);
        expect(ipAddressBinaryValidation('11111111111111111111111111111111-')).toBe(false);
    });
});

describe('Testing ipAddressDecimalValidation', () => {
    it('Should check if given decimal ip is correct and return true', () => {
        expect(ipAddressDecimalValidation(0)).toBe(true);
        expect(ipAddressDecimalValidation(4294967295)).toBe(true);
        expect(ipAddressDecimalValidation(3232235521)).toBe(true);
    });
    it('Should check if given decimal ip is correct and return false', () => {
        expect(ipAddressDecimalValidation(-1)).toBe(false);
        expect(ipAddressDecimalValidation(4294967295 + 1)).toBe(false);
    });
});

describe('Testing ipShorthandValidation function', () => {
    it('Should check if shorthand is valid and return true', () => {
        expect(ipShorthandValidation(0)).toBe(true);
        expect(ipShorthandValidation(32)).toBe(true);
        expect(ipShorthandValidation(11)).toBe(true);
        expect(ipShorthandValidation(25)).toBe(true);
        expect(ipShorthandValidation(31)).toBe(true);
    });
    it('Should check if shorthand is valid und return false', () => {
        expect(ipShorthandValidation(-1)).toBe(false);
        expect(ipShorthandValidation(-33)).toBe(false);
    });
});

describe('Testing possibleShorthandValidation function', () => {
    it('Should check if given ip can be converted to shorthand and return true', () => {
        expect(possibleShorthandValidation('11111111111111111111111111111111')).toBe(true);
        expect(possibleShorthandValidation('11111111111111111111111100000000')).toBe(true);
        expect(possibleShorthandValidation('11111111111111110000000000000000')).toBe(true);
    });
    it('Should check if given ip can be converted to shorthand and return false', () => {
        expect(possibleShorthandValidation('1111111111111111000000000000001')).toBe(false);
        expect(possibleShorthandValidation('111111111111111100000000000000')).toBe(false);
        expect(possibleShorthandValidation('1111111111111111010000000000000')).toBe(false);
    });
});

describe('Testing subnetsPOssibleValidation', () => {
    it('Should return ture, because subnets can be created', () => {
        expect(subnetsPossibleValidation([255, 255, 255, 0], 2)).toBe(true);
        expect(subnetsPossibleValidation([255, 255, 255, 0], 64)).toBe(true);
    });
});
