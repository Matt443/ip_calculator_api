import { ERROR_MESSAGES } from '@/constant/errors.constants.js';
import {
    calculateFromShorthand,
    calculateShorthand,
    calculateSubnetsQuantity,
    concatBinary,
    ipToDecimal,
    ipBalancer,
    ipToBinary,
    isIpEqual,
    moveInAddress,
    toBinary,
    whereZerosStart,
    getMaxSubnets,
    newMaskForSubnet,
    getAllSubnets,
    createAddressConversions,
    ipBinaryToDefault,
    ipDottedToDefault,
    ipToDotted,
    binaryMergedToUnmerged,
    binaryMergedToDefault,
    calculatePartial,
    findNextHostQuantity,
    getAllSubnetsVLSM,
    getMasksVLSM,
    calculateNumberOfHostsVLSM,
    ipDecimalToDefault,
    shorthandToDefault,
    calculateProperHostQuantity,
    getSubnetsQuantity
} from '@/utils/calculating.util.js';
import {
    ipsToFix,
    ipsToGetCompleteInfo,
    ipsToGetConversions,
    ipsToGetSubnets,
    ipsToGetSubnetsVLSM,
    ipsToMove,
    ipToCompare,
    sampleIpAdress,
    sampleIpAdress_wrong,
    sampleIpBinaryAdress,
    sampleIpMask,
    sampleIpMask_complicated
} from '@/constant/samples.constant.js';
import { IpAddressType } from '@/types/ip.types';
import { getSingleNetwork } from '@/services/ipCalculations.service.js';
import {
    IpToFixType,
    IpToMoveType,
    IpToCompareType,
    IpToGetInfoType,
    IpToGetSubnetsType,
    IpToGetConversionsType,
    IpToGetSubnetsVLSMType
} from '@/types/samples.types.js';
import { getSubnetSetup } from '@/utils/api.util';

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
        expect(calculateSubnetsQuantity(63, [255, 255, 255, 0])).toBe(2);
    });
    it('Should return -1 because with this submask we can not create subnets', () => {
        expect(calculateSubnetsQuantity(2, [255, 255, 255, 254])).toBe(-1);
        expect(calculateSubnetsQuantity(2, [255, 255, 255, 255])).toBe(-1);
        expect(() => {
            calculateSubnetsQuantity(2, [255, 255, 255, 256]);
        }).toThrow(ERROR_MESSAGES.validation.ipAddrress);
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

describe('Testing ipToDecimal function', () => {
    it('Should convert ip to decimal form', () => {
        expect(ipToDecimal([192, 168, 1, 1])).toBe(3232235777);
        expect(ipToDecimal([0, 0, 0, 0])).toBe(0);
        expect(ipToDecimal([255, 255, 255, 255])).toBe(4294967295);
    });
    it('Should not convert ip to decimal form because provided adress is not correct', () => {
        expect(ipToDecimal([-1, 168, 1, 1])).toBe(-1);
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

describe('Testing getMaxSubnets function', () => {
    it('Should return maximal amount of subnets for a certain mask', () => {
        expect(getMaxSubnets([255, 255, 255, 0])).toBe(64);
        expect(getMaxSubnets([255, 255, 255, 128])).toBe(32);
        expect(getMaxSubnets([0, 0, 0, 0])).toBe(1073741824);
        expect(getMaxSubnets([255, 0, 0, 0])).toBe(4194304);
    });
    it('Should return -1 because with this mask subnets cannot be created', () => {
        expect(getMaxSubnets([300, 255, 255, 255])).toBe(-1);
        expect(getMaxSubnets([255, 255, 255, 255])).toBe(-1);
        expect(getMaxSubnets([255, 255, 255, 252])).toBe(-1);
    });
});

describe('Testing newMaskForSubnet function', () => {
    it('Create new submask for given amount of hosts in every subnet', () => {
        expect(newMaskForSubnet([255, 255, 255, 0], 64, 24)).toEqual([
            '11111111',
            '11111111',
            '11111111',
            '11111100'
        ]); // 255.255.255.252
        expect(newMaskForSubnet([0, 0, 0, 0], 64, 24)).toEqual([
            '00000000',
            '00000000',
            '00000000',
            '11111100'
        ]); // 0.0.0.252
        expect(newMaskForSubnet([255, 255, 255, 0], 2, 24)).toEqual([
            '11111111',
            '11111111',
            '11111111',
            '10000000'
        ]); // 255.255.255.128
    });
    it('Should return empty array because with this mask new mask cannot be calculated', () => {
        expect(newMaskForSubnet([300, 300, 300, 0], 64, 30)).toEqual([]); //Bad ip
        expect(newMaskForSubnet([-1, -300, -30, 0], 64, 30)).toEqual([]); //Bad ip
        expect(newMaskForSubnet([255, 255, 255, 0], 62, 30)).toEqual([]); //Number of hosts must be power of 2
        expect(newMaskForSubnet([255, 255, 255, 0], 64, 34)).toEqual([]); //Bad shorthand number
        expect(newMaskForSubnet([255, 255, 255, 0], 128, 32)).toEqual([]); //Too many subnets for ths mask
    });
});

describe('Testing getSingleNetworkFunction', () => {
    it('Should return complete information about network base on ipAdress and ipMask', () => {
        ipsToGetCompleteInfo.success.forEach((testSet: IpToGetInfoType) => {
            expect(getSingleNetwork(testSet.ip, testSet.ipMask)).toEqual(testSet.result);
        });
    });
    it('Should throw error because ips are not correct', () => {
        ipsToGetCompleteInfo.fail.forEach((testSet: IpToGetInfoType) => {
            expect(() => {
                getSingleNetwork(testSet.ip, testSet.ipMask);
            }).toThrow(ERROR_MESSAGES.validation.ipAddrress);
        });
    });
});

describe('Testing getAllSubnets function', () => {
    it('Should return all subnets for given params', () => {
        ipsToGetSubnets.success.forEach((testSet: IpToGetSubnetsType) => {
            expect(getAllSubnets(testSet.ip, testSet.ipMask, testSet.subnetsQuantity)).toEqual(
                testSet.result
            );
        });
    });
    it('Should return empty array because arguments are not valid', () => {
        ipsToGetSubnets.fail.forEach((testSet: IpToGetSubnetsType) => {
            expect(() => {
                getAllSubnets(testSet.ip, testSet.ipMask, testSet.subnetsQuantity);
            }).toThrow(ERROR_MESSAGES.validation.ipAddrress);
        });
    });
    it('Should return empty array because expected amount of array is >1024', () => {
        expect(getAllSubnets([192, 168, 0, 1], [255, 255, 255, 128], 4096));
    });
});

describe('Testing createAddressConversions function', () => {
    it('Should return complete convertions of ipAdress', () => {
        ipsToGetConversions.success.forEach((testSet: IpToGetConversionsType) => {
            expect(createAddressConversions(testSet.ip)).toEqual(testSet.result);
        });
    });
    it('Should throw an error because ip is not valid', () => {
        ipsToGetConversions.fail.forEach((testSet: IpToGetConversionsType) => {
            expect(() => {
                createAddressConversions(testSet.ip);
            }).toThrow(ERROR_MESSAGES.validation.ipAddrress);
        });
    });
});

describe('Testing ipBinaryToDefualt function', () => {
    it('Should convert ipBinaryType to ipAddressType', () => {
        expect(ipBinaryToDefault(['11111111', '11111111', '11111111', '11111111'])).toEqual([
            255, 255, 255, 255
        ]);
        expect(ipBinaryToDefault(['00000000', '00000000', '00000000', '00000000'])).toEqual([
            0, 0, 0, 0
        ]);
        expect(ipBinaryToDefault(['11000000', '10101000', '00000000', '00000001'])).toEqual([
            192, 168, 0, 1
        ]);
    });
});

describe('Testing ipDottedToDefault function', () => {
    it('Should convert dotted ipAdress to ipAdressType', () => {
        expect(ipDottedToDefault('192.168.0.1')).toEqual(sampleIpAdress);
        expect(ipDottedToDefault('255.255.255.255')).toEqual([255, 255, 255, 255]);
        expect(ipDottedToDefault('0.0.0.0')).toEqual([0, 0, 0, 0]);
    });
    it('Should not throw an error with bad arg', () => {
        expect(ipDottedToDefault('255')).toEqual([255]);
        expect(ipDottedToDefault('')).toEqual([NaN]);
    });
});

describe('Testing ipToDotted', () => {
    it('Should create dotted ip string from ip array', () => {
        expect(ipToDotted(sampleIpAdress)).toEqual('192.168.0.1');
        expect(ipToDotted([255, 255, 255, 255])).toEqual('255.255.255.255');
        expect(ipToDotted([0, 0, 0, 0])).toEqual('0.0.0.0');
    });
    it('Should not throw an error with bad arg', () => {
        expect(ipToDotted([])).toEqual('');
    });
});

describe('Testing binaryMergedToUnmerged function', () => {
    it('Should convert binary ip adress to array with 4 octets binary', () => {
        expect(binaryMergedToUnmerged('11111111111111111111111111111111')).toEqual([
            '11111111',
            '11111111',
            '11111111',
            '11111111'
        ]);
        expect(binaryMergedToUnmerged('00000000000000000000000000000000')).toEqual([
            '00000000',
            '00000000',
            '00000000',
            '00000000'
        ]);
        expect(binaryMergedToUnmerged('11000000101010000000000000000001')).toEqual([
            '11000000',
            '10101000',
            '00000000',
            '00000001'
        ]); //192.168.0.1
    });
    it('Should cut binary string every 8 char', () => {
        expect(binaryMergedToUnmerged('00000001')).toEqual(['00000001']);
    });
    it('Should return empty array because binary string is not valid', () => {
        expect(binaryMergedToUnmerged('1111111')).toEqual([]); //Arg length 7
        expect(binaryMergedToUnmerged('111111111111111111111111111111111')).toEqual([]); //Arg length 33
    });
});

describe('Testing binaryMergedToDefualt function', () => {
    it('Should convert binary string to the array with four octets', () => {
        expect(binaryMergedToDefault('11111111111111111111111111111111')).toEqual([
            255, 255, 255, 255
        ]);
        expect(binaryMergedToDefault('00000000000000000000000000000000')).toEqual([0, 0, 0, 0]);
        expect(binaryMergedToDefault('11000000101010000000000000000001')).toEqual([192, 168, 0, 1]);
    });
    it('Should cut binary string every 8 char', () => {
        expect(binaryMergedToDefault('00000001')).toEqual([1]);
    });
    it('Should return empty array because binary string is not valid', () => {
        expect(binaryMergedToDefault('1111111')).toEqual([]); //Arg length 7
        expect(binaryMergedToDefault('111111111111111111111111111111111')).toEqual([]); //Arg length 33
    });
});

describe('Testing calculate partial function', () => {
    it('Should calculate one octet with mask and given filler', () => {
        expect(calculatePartial('11000000', 0, '1')).toEqual(255);
        expect(calculatePartial('00000000', 192, '1')).toEqual(63);
        expect(calculatePartial('11111111', 255, '1')).toEqual(255);
        expect(calculatePartial('11111111', 255, '0')).toEqual(255);
        expect(calculatePartial('00000000', 255, '0')).toEqual(0);
    });
    it('Should return -1 because params are not corret', () => {
        expect(calculatePartial('111111111', 255, '1')).toBe(-1);
        expect(calculatePartial('11111111', -1, '1')).toBe(-1);
        expect(calculatePartial('11111111', 256, '1')).toBe(-1);
    });
});

describe('Testing findNextHostQuantity function', () => {
    it('Should return first power of given number wchich is equal or greater of given number', () => {
        expect(findNextHostQuantity(2, 3)).toEqual({ hostQuantity: 4, power: 2 });
        expect(findNextHostQuantity(2, 100)).toEqual({ hostQuantity: 128, power: 7 });
        expect(findNextHostQuantity(2, 1000)).toEqual({ hostQuantity: 1024, power: 10 });
        expect(findNextHostQuantity(4, 16, 1, 1024)).toEqual({ hostQuantity: 16, power: 2 });
        expect(findNextHostQuantity(2)).toEqual({ hostQuantity: 2, power: 1 });
    });

    it('Should return object with both values -1 because given parameters are not correct', () => {
        expect(() => {
            findNextHostQuantity(2, -3);
        }).toThrow();
        expect(() => {
            findNextHostQuantity(4, 2);
        }).toThrow();
    });
});

describe('Testing getAllSubnetsVLSM function', () => {
    it('Should return an array with subnets informations', () => {
        ipsToGetSubnetsVLSM.success.map((ipToGetSubnetsVLSM: IpToGetSubnetsVLSMType) => {
            expect(getAllSubnetsVLSM(ipToGetSubnetsVLSM.ip, ipToGetSubnetsVLSM.masks)).toEqual(
                ipToGetSubnetsVLSM.results
            );
        });
    });
    it('Should throw an error because ip is not correct', () => {
        ipsToGetSubnetsVLSM.fail.map((ipToGetSubnetsVLSM: IpToGetSubnetsVLSMType) => {
            expect(() => {
                getAllSubnetsVLSM(ipToGetSubnetsVLSM.ip, ipToGetSubnetsVLSM.masks);
            }).toThrow();
        });
    });
});

describe('Testing getMasksVLSM function', () => {
    it('Should return a mask for given number of hosts', () => {
        expect(
            getMasksVLSM([
                { hostQuantity: 64, power: 6 },
                { hostQuantity: 128, power: 7 }
            ])
        ).toEqual([
            [255, 255, 255, 192],
            [255, 255, 255, 128]
        ]);
        expect(
            getMasksVLSM([
                { hostQuantity: 2, power: 1 },
                { hostQuantity: 4, power: 2 },
                { hostQuantity: 1, power: 0 }
            ])
        ).toEqual([
            [255, 255, 255, 252],
            [255, 255, 255, 248],
            [255, 255, 255, 254]
        ]);
    });
});

describe('Testing calculateNumberOfHostsVLSM function', () => {
    it('Should calculate nearest possible number of hosts from given number', () => {
        expect(calculateNumberOfHostsVLSM([1, 2, 3, 4, 5, 6])).toEqual([
            { hostQuantity: 4, power: 2 },
            { hostQuantity: 4, power: 2 },
            { hostQuantity: 8, power: 3 },
            { hostQuantity: 8, power: 3 },
            { hostQuantity: 8, power: 3 },
            { hostQuantity: 8, power: 3 }
        ]);
        expect(calculateNumberOfHostsVLSM([100, 50, 64, 1000])).toEqual([
            { hostQuantity: 128, power: 7 },
            { hostQuantity: 64, power: 6 },
            { hostQuantity: 128, power: 7 },
            { hostQuantity: 1024, power: 10 }
        ]);
    });
    it('Should throw an error because given number is not correct', () => {
        expect(() => {
            calculateNumberOfHostsVLSM([0]);
        }).toThrow();
        expect(() => {
            calculateNumberOfHostsVLSM([1025]);
        }).toThrow();
    });
});

describe('Testing ipDecimalToDefault function', () => {
    it('Should convert decimal ip to default format', () => {
        expect(ipDecimalToDefault(0)).toEqual([0, 0, 0, 0]);
        expect(ipDecimalToDefault(4294967295)).toEqual([255, 255, 255, 255]);
        expect(ipDecimalToDefault(3232235521)).toEqual([192, 168, 0, 1]);
    });
    it('Should return empty array because given ip is not correct', () => {
        expect(ipDecimalToDefault(-1)).toEqual([]);
        expect(ipDecimalToDefault(4294967295 + 1)).toEqual([]);
    });
});

describe('Testing shorthandToDefault function', () => {
    it('Should convert shorthand to default format', () => {
        expect(shorthandToDefault(0)).toEqual([0, 0, 0, 0]);
        expect(shorthandToDefault(8)).toEqual([255, 0, 0, 0]);
        expect(shorthandToDefault(16)).toEqual([255, 255, 0, 0]);
        expect(shorthandToDefault(24)).toEqual([255, 255, 255, 0]);
        expect(shorthandToDefault(32)).toEqual([255, 255, 255, 255]);
        expect(shorthandToDefault(25)).toEqual([255, 255, 255, 128]);
        expect(shorthandToDefault(2)).toEqual([192, 0, 0, 0]);
    });
    it('Should return empty array because shorthand is not correct', () => {
        expect(shorthandToDefault(-1)).toEqual([]);
        expect(shorthandToDefault(35)).toEqual([]);
        expect(shorthandToDefault(200)).toEqual([]);
    });
});

describe('Testing getSubnetsQuantity function', () => {
    it('Should calculateSubnetsQuantity based on subnetSettingType object', () => {
        expect(
            getSubnetsQuantity(
                { subnetsHostQuantity: 126, subnetsQuantity: undefined },
                [255, 255, 255, 0]
            )
        ).toBe(2);
        expect(
            getSubnetsQuantity(
                { subnetsHostQuantity: 62, subnetsQuantity: undefined },
                [255, 255, 255, 0]
            )
        ).toBe(4);
        expect(
            getSubnetsQuantity(
                { subnetsHostQuantity: undefined, subnetsQuantity: 4 },
                [255, 255, 255, 0]
            )
        ).toBe(4);
        expect(
            getSubnetsQuantity(
                { subnetsHostQuantity: undefined, subnetsQuantity: 3 },
                [255, 255, 255, 0]
            )
        ).toBe(4);
    });
    it('Should return -1 because setting object is incorrect', () => {
        expect(
            getSubnetsQuantity(
                { subnetsHostQuantity: undefined, subnetsQuantity: undefined },
                [255, 255, 255, 0]
            )
        ).toBe(-1);
        expect(
            getSubnetsQuantity(
                { subnetsHostQuantity: 0, subnetsQuantity: undefined },
                [255, 255, 255, 0]
            )
        ).toBe(-1);
    });
    it('Should throw because mask is not correct', () => {
        expect(() => {
            getSubnetsQuantity(
                { subnetsHostQuantity: 62, subnetsQuantity: undefined },
                [255, 255, -1, 0]
            );
        }).toThrow();
        expect(() => {
            getSubnetsQuantity(
                { subnetsHostQuantity: 126, subnetsQuantity: undefined },
                [255, 255, 256, 0]
            );
        }).toThrow();
        expect(() => {
            getSubnetsQuantity(
                { subnetsHostQuantity: undefined, subnetsQuantity: 2 },
                [255, 255, 256, 0]
            );
        }).toThrow();
    });
    it('Should throw because subnetQuantity is incorrect', () => {});
});

describe('Testing calculateProperHostQuantity function', () => {
    it('Should return proper host quantity', () => {
        expect(calculateProperHostQuantity([100, 100], [255, 255, 255, 0])).toEqual({
            requestedHostQuantity: 256,
            maxHosts: 254,
            subnetsSettingsVLSM: [
                { hostQuantity: 128, power: 7 },
                { hostQuantity: 128, power: 7 }
            ]
        });
        expect(calculateProperHostQuantity([60, 62, 32, 31], [255, 255, 255, 0])).toEqual({
            requestedHostQuantity: 256,
            maxHosts: 254,
            subnetsSettingsVLSM: [
                { hostQuantity: 64, power: 6 },
                { hostQuantity: 64, power: 6 },
                { hostQuantity: 64, power: 6 },
                { hostQuantity: 64, power: 6 }
            ]
        });
    });
    it('Should throw because host quantity cannot be calculate', () => {
        expect(() => {
            calculateProperHostQuantity([0], [255, 255, 255, 0]);
        }).toThrow();
        expect(() => {
            calculateProperHostQuantity([0], [255, 255, -1, 0]);
        }).toThrow();
        expect(() => {
            calculateProperHostQuantity([0], [255, 255, 255, 256]);
        }).toThrow();
        expect(() => {
            calculateProperHostQuantity([100, 0], [255, 255, 255, 256]);
        }).toThrow();
        expect(() => {
            calculateProperHostQuantity([100, -1], [255, 255, 255, 256]);
        }).toThrow();
    });
});
