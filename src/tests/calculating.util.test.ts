import { ERROR_MESSAGES } from '@/constants/errors.constants.js';
import {
    calculateShorthand,
    concatBinary,
    ipToBinary,
    toBinary
} from '@/utils/calculating.util.js';

const sampleIpAdress = [255, 255, 255, 0];
const sampleIpAdress_wrong = [-1, 255, 255, 0];
const sampleIpBinaryAdress = ['11111111', '11111111', '11111111', '00000000'];

describe('Testing toBinary function', () => {
    it('Should convert to binary', () => {
        expect(toBinary(3)).toBe('11');
    });
    it('Should convert to binary even with so big number', () => {
        expect(toBinary(Number.MAX_SAFE_INTEGER)).toBe(
            '11111111111111111111111111111111111111111111111111111'
        );
    });
    it('Should return empty string because argument is smaller than 0 ', () => {
        expect(() => toBinary(-3)).toThrow(ERROR_MESSAGES.utils.binary);
    });
});

describe('Testing ipToBinary function', () => {
    it('Should convert whole ip adress to binary', () => {
        expect(ipToBinary(sampleIpAdress)).toEqual([
            '11111111',
            '11111111',
            '11111111',
            '00000000'
        ]);
    });
    it('Should return false because of minus value', () => {
        expect(() => ipToBinary(sampleIpAdress_wrong)).toThrow(ERROR_MESSAGES.utils.binary);
    });
});

describe('Testing calculateShorthand function', () => {
    it('Should convert to a short hand', () => {
        expect(calculateShorthand(sampleIpAdress)).toBe(24);
    });
    it('Should return false because of minus value', () => {
        expect(() => calculateShorthand(sampleIpAdress_wrong)).toThrow(ERROR_MESSAGES.utils.binary);
    });
});

describe('Testing concatBinary', () => {
    it('Should contate ip adress', () => {
        expect(concatBinary(sampleIpBinaryAdress)).toBe('11111111111111111111111100000000');
    });
});
