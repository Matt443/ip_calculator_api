import { ERROR_MESSAGES } from '@/constant/errors.constants.js';
import {
    calculateShorthand,
    concatBinary,
    ipToBinary,
    moveInAddress,
    toBinary,
    whereZerosStart
} from '@/utils/calculating.util.js';
import {
    sampleIpAdress,
    sampleIpAdress_complicated,
    sampleIpAdress_wrong,
    sampleIpBinaryAdress,
    sampleIpMask
} from '@/constant/samples.constant.js';

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
            '11000000',
            '10101000',
            '00000000',
            '00000001'
        ]);
    });
    it('Should return false because of minus value', () => {
        expect(() => ipToBinary(sampleIpAdress_wrong)).toThrow(ERROR_MESSAGES.utils.binary);
    });
});

describe('Testing calculateShorthand function', () => {
    it('Should convert to a short hand', () => {
        expect(calculateShorthand(sampleIpMask)).toBe(16);
    });
    it('Should return false because of minus value', () => {
        expect(() => calculateShorthand(sampleIpAdress_wrong)).toThrow(ERROR_MESSAGES.utils.binary);
    });
});

describe('Testing concatBinary function', () => {
    it('Should contate ip adress', () => {
        expect(concatBinary(sampleIpBinaryAdress)).toBe('11111111111111111111111100000000');
    });
});

describe('Testing whereZerosStart function', () => {
    it('Should return an index where zeros in ip address start', () => {
        expect(whereZerosStart(sampleIpMask)).toBe(2);
    });
    it('Should return an index where zeros in ip address start', () => {
        expect(whereZerosStart([255, 255, 255, 128])).toBe(3);
    });
    it('Should return an index where zeros in ip address start', () => {
        expect(whereZerosStart([255, 255, 255, 255])).toBe(3);
    });
    it('Should return an index where zeros in ip address start', () => {
        expect(whereZerosStart([0, 0, 0, 0])).toBe(0);
    });
});
