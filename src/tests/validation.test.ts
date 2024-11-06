import {
    emailValidation,
    ipAddressValidation,
    mongooseIdValidation,
    octetValidation,
    stringValidation,
    validationWithRegex
} from '@/utils/validation.util.js';
import {
    emails,
    strings,
    validatorTester,
    texts,
    sampleIpAdress,
    sampleIpAdress_wrong
} from '@/constant/samples.constant.js';

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
    });
    it(texts.pass, () => {
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
    it('Should validate api adress', () => {
        expect(ipAddressValidation(sampleIpAdress)).toBe(true);
    });
    it('Should validate api adress', () => {
        expect(ipAddressValidation(sampleIpAdress_wrong)).toBe(false);
    });
});

describe('Testing ipAddressValidation function', () => {
    it('Should return true after validation', () => {
        expect(octetValidation(sampleIpAdress[1])).toBe(true);
    });
    it('Should return false after validation', () => {
        expect(octetValidation(sampleIpAdress_wrong[0])).toBe(false);
    });
    it('Should return false after validation', () => {
        expect(octetValidation(sampleIpAdress_wrong[2])).toBe(false);
    });
});
