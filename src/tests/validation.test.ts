import {
    emailValidation,
    mongooseIdValidation,
    stringValidation,
    validationWithRegex
} from '@/middlewares/Validation.middlewares.js';

const emails = {
    complicated: 'example.example21.example@example.com',
    simple: 'example@example.com',
    super_complicated: 'example.example21.example@example.123.example.com',
    wrong: 'example@@example.com'
};

const strings = {
    complicated: 'We gonna to give you $$$ @!!!...-  1000% of money?',
    simple: 'test',
    wrong: '<script>alert("Hello world")</script>'
};

const validatorTester = (data: string, callback: Function, result: boolean): void => {
    expect(callback(data)).toBe(result);
};

const texts = {
    pass: 'Should pass validation',
    fail: 'Should not pass validation'
};

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
