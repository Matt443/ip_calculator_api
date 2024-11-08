import { ERROR_MESSAGES } from '@/constant/errors.constants.js';
import {
    calculateFromShorthand,
    calculateShorthand,
    calculateSubnetsQuantity,
    concatBinary,
    converIpToDecimal,
    ipBalancer,
    ipToBinary,
    isIpEqual,
    moveInAddress,
    toBinary,
    whereZerosStart
} from '@/utils/calculating.util.js';
import {
    ipsToFix,
    ipsToMove,
    ipToCompare,
    IpToCompareType,
    IpToFixType,
    IpToMoveType,
    sampleIpAdress,
    sampleIpAdress_complicated,
    sampleIpAdress_wrong,
    sampleIpBinaryAdress,
    sampleIpMask,
    sampleIpMask_complicated
} from '@/constant/samples.constant.js';
import { IpAddressType } from '@/types/ip.types';

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
        expect(whereZerosStart([255, 255, 255, 128])).toBe(3);
        expect(whereZerosStart([255, 255, 255, 255])).toBe(3);
        expect(whereZerosStart([0, 0, 0, 0])).toBe(0);
    });
    it('Should return -1 because provided ip is not valid', () => {
        expect(whereZerosStart([-1, 0, 0, 0])).toBe(-1);
    });
});

describe('Testing calculatineSubnetsQuantity function', () => {
    it('Should return how many subnets with certain submask with certain amount of hosts in every of them', () => {
        expect(calculateSubnetsQuantity(32766, sampleIpMask)).toBe(2);
        expect(calculateSubnetsQuantity(126, sampleIpMask_complicated)).toBe(256);
        expect(calculateSubnetsQuantity(4294967294, [0, 0, 0, 0])).toBe(1);
        expect(calculateSubnetsQuantity(2, [255, 255, 255, 252])).toBe(1);
    });
    it('Should return "-1" because number is not power of 2', () => {
        expect(calculateSubnetsQuantity(128, sampleIpMask_complicated)).toBe(-1);
    });
    it('Should return -1 because with this submask we can not create subnets', () => {
        expect(calculateSubnetsQuantity(2, [255, 255, 255, 254])).toBe(-1);
        expect(calculateSubnetsQuantity(2, [255, 255, 255, 255])).toBe(-1);
        expect(calculateSubnetsQuantity(2, [255, 255, 255, 256])).toBe(-1);
    });
});

describe('Testing ipBalanser function', () => {
    it('Should fix ip address', () => {
        const ips = ipsToFix.fixable.map((ipData: IpToFixType) => ipData.ip);
        const fixed = ipsToFix.fixable.map((ipData: IpToFixType) => ipData.fixed);
        const fixResult = ips.map((ip: IpAddressType) => ipBalancer(ip));

        expect(fixResult).toEqual(fixed);
    });
    it('Should fix ip address', () => {
        const ips = ipsToFix.notFixable.map((ipData: IpToFixType) => ipData.ip);
        const fixed = ipsToFix.notFixable.map((ipData: IpToFixType) => ipData.fixed);
        const fixResult = ips.map((ip: IpAddressType) => ipBalancer(ip));

        expect(fixResult).toEqual(fixed);
    });
});

describe('Testing moveInAdress function', () => {
    type data = { ip: IpAddressType; forwards: boolean };
    it('Should go "forwards" in ipAddress', () => {
        const ips = ipsToMove.possible.map((ipData: IpToMoveType) => {
            const { forwards, ip } = ipData;
            return { forwards, ip };
        });

        const moved = ipsToMove.possible.map((ipData: IpToMoveType) => ipData.moved);
        const moveResult = ips.map((ipConfig: data) =>
            moveInAddress(ipConfig.forwards, ipConfig.ip)
        );

        expect(moveResult).toEqual(moved);
    });
    it('Should go "forwards" in ipAddress', () => {
        const ips = ipsToMove.notPossible.map((ipData: IpToMoveType) => {
            const { forwards, ip } = ipData;
            return { forwards, ip };
        });

        const moved = ipsToMove.notPossible.map((ipData: IpToMoveType) => ipData.moved);
        const moveResult = ips.map((ipConfig: data) =>
            moveInAddress(ipConfig.forwards, ipConfig.ip)
        );

        expect(moveResult).toEqual(moved);
    });
});

describe('Testing isIpEqual function', () => {
    it('Should check if two ip addresses are equal', () => {
        const expectedResult: Array<boolean> = [];
        const testResult = ipToCompare.yes.map((ips: IpToCompareType) => {
            expectedResult.push(true);
            return isIpEqual(ips.ip, ips.secondIp);
        });

        expect(testResult).toEqual(expectedResult);
    });
    it('Should check if two ip addresses are equal', () => {
        const expectedResult: Array<boolean> = [];
        const testResult = ipToCompare.no.map((ips: IpToCompareType) => {
            expectedResult.push(false);
            return isIpEqual(ips.ip, ips.secondIp);
        });

        expect(testResult).toEqual(expectedResult);
    });
});

describe('Testing convertIpToDecimal function', () => {
    it('Should convert ip to decimal form', () => {
        expect(converIpToDecimal([192, 168, 1, 1])).toBe(3232235777);
        expect(converIpToDecimal([0, 0, 0, 0])).toBe(0);
        expect(converIpToDecimal([255, 255, 255, 255])).toBe(4294967295);
    });
    it('Should not convert ip to decimal form because provided adress is not correct', () => {
        expect(converIpToDecimal([-1, 168, 1, 1])).toBe(-1);
    });
});

describe('Testing calculateFromShorthand function', () => {
    it('Should return ip adress based on shorthand definition', () => {
        expect(calculateFromShorthand(24)).toEqual([255, 255, 255, 0]);
        expect(calculateFromShorthand(0)).toEqual([0, 0, 0, 0]);
        expect(calculateFromShorthand(32)).toEqual([255, 255, 255, 255]);
    });
    it('Should empty array because number is not correct shorthand definition', () => {
        expect(calculateFromShorthand(-32)).toEqual([]);
    });
});
