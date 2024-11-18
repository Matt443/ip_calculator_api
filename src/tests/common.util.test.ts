import { ERROR_MESSAGES } from '@/constant/errors.constants.js';
import { replaceInString } from '@/utils/common.js';

describe('Testing replaceInString function', () => {
    it('Should replace from start index to end index with given string', () => {
        expect(replaceInString('Hello world', 6, 11, 'Earth')).toBe('Hello Earth');
        expect(replaceInString('Hello world', 6, 11, 'unknown')).toBe('Hello unknown');
    });

    it(`Should throw because ${ERROR_MESSAGES.validation.rangeIndex}`, () => {
        expect(() => {
            replaceInString('Hello world', 1, 0, '');
        }).toThrow(ERROR_MESSAGES.validation.rangeIndex);
        expect(() => {
            replaceInString('Hello world', 1, -1, '');
        }).toThrow(ERROR_MESSAGES.validation.rangeIndex);
        expect(() => {
            replaceInString('Hello world', -1, 1, '');
        }).toThrow(ERROR_MESSAGES.validation.rangeIndex);
    });
});
