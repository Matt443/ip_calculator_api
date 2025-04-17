import {
    getBroadcastAddress,
    getNetworkAddress,
    getNumberOfHosts,
    getSubnets,
    getSubnetsVLSM,
    recogniseClass
} from '@/services/ipCalculations.service.js';
import {
    dataSets,
    ipsToGetSubnets,
    ipsToGetSubnetsVLSM,
    sampleIpAdress,
    sampleIpAdress_complicated,
    sampleIpMask,
    sampleIpMask_complicated,
    sampleIpRange,
    sampleIpRange_complicated,
    texts
} from '@/constant/samples.constant.js';
import { ERROR_MESSAGES } from '@/constant/errors.constants.js';
import { dataSetType, IpToGetSubnetsType } from '@/types/samples.types.js';
import { ipClasses } from '@/constant/supported.constants.js';

describe('Testing getNetworkAdress function', () => {
    it(texts.pass, () => {
        expect(getNetworkAddress(sampleIpAdress, sampleIpMask)).toEqual([192, 168, 0, 0]);
    });
    it(texts.pass, () => {
        expect(getNetworkAddress(sampleIpAdress_complicated, sampleIpMask_complicated)).toEqual([
            192, 168, 128, 0
        ]);
    });
});

describe('Testing getBroadcastAdress function', () => {
    it(texts.pass, () => {
        expect(getBroadcastAddress(sampleIpAdress, sampleIpMask)).toEqual([192, 168, 255, 255]);
    });
    it(texts.pass, () => {
        expect(getBroadcastAddress(sampleIpAdress_complicated, sampleIpMask_complicated)).toEqual([
            192, 168, 255, 255
        ]);
    });
    it('Should throw an error beacuse ip is not correct', () => {
        expect(() => getBroadcastAddress([192, 168, 300, 1], [255, 255, 300, 0])).toThrow();
        expect(() => getBroadcastAddress([192, 168, 0, 1], [255, 255, 300, 0])).toThrow();
        expect(() => getBroadcastAddress([192, 168, 300, 1], [255, 255, 255, 0])).toThrow();
    });
});

describe('Testing getNumberOfHosts function', () => {
    it('Should return number of host', () => {
        expect(getNumberOfHosts(sampleIpMask)).toBe(65534);
        expect(getNumberOfHosts([255, 255, 255, 254])).toBe(0);
        expect(getNumberOfHosts(sampleIpMask_complicated)).toBe(32766);
        expect(getNumberOfHosts([255, 255, 255, 255])).toBe(0);
    });

    it('Should throw an errow because ip adress is not correct', () => {
        expect(() => getNumberOfHosts([255, -1, 255, 255])).toThrow();
        expect(() => getNumberOfHosts([255, 300, 255, 255])).toThrow();
    });
});

describe('Testing getSubnets function', () => {
    it('Shoudld return all subnets for given number of them or number of hosts in every subnet', () => {
        ipsToGetSubnets.success.forEach((testSet: IpToGetSubnetsType) => {
            expect(
                //@ts-ignore
                getSubnets(testSet.ip, [255, 255, 255, 0], { subnetsHostQuantity: 126 })
            ).toEqual(testSet.result);
        });
    });
    it('Shoudld return throw because ip numbers are wrong', () => {
        ipsToGetSubnets.fail.forEach((testSet: IpToGetSubnetsType) => {
            expect(() => {
                //@ts-ignore
                getSubnets(testSet.ip, testSet.ipMask, {
                    subnetsHostQuantity: testSet.subnetsQuantity
                });
            }).toThrow(testSet.error);
        });
    });
    it('Should return empty array because number of subnets is too large', () => {
        expect(() => {
            //@ts-ignore
            getSubnets([192, 168, 0, 1], [255, 255, 255, 0], { subnetsHostQuantity: 16384 });
        }).toThrow(ERROR_MESSAGES.utils.outofrange);
        //@ts-ignore
        expect(getSubnets([192, 168, 0, 1], [255, 255, 255, 0], { subnetsQuantity: 128 })).toEqual(
            []
        );
    });
    it('Should throw an error beacuse ip is not correct', () => {
        expect(() =>
            //@ts-ignore
            getSubnets([192, 168, 300, 1], [255, 255, 255, 0], { subnetsQuantity: 128 })
        ).toThrow();
        expect(() =>
            //@ts-ignore
            getSubnets([192, 168, 0, -1], [255, 255, 255, 0], { subnetsQuantity: 128 })
        ).toThrow();
        expect(() =>
            //@ts-ignore
            getSubnets([192, 168, 300, 1], [255, 255, 255, 0], { subnetsQuantity: 128 })
        ).toThrow();
    });
});

describe('Testing getSubnetsVLSM function', () => {
    it('Should return a complete information about subnets for given ip, mask, and host quantitities using VLSM', () => {
        expect(getSubnetsVLSM([192, 168, 0, 1], [255, 255, 255, 0], [100, 50, 50])).toEqual(
            ipsToGetSubnetsVLSM.success[0].results
        );
        expect(getSubnetsVLSM([192, 168, 10, 1], [255, 255, 0, 0], [1000, 999, 513])).toEqual(
            ipsToGetSubnetsVLSM.success[1].results
        );
    }),
        it('Should throw an error because given arguments are not correct', () => {
            expect(getSubnetsVLSM([192, 168, 0, 1], [255, 255, 255, 0], [1000, 999, 513])).toEqual(
                []
            ); //More requested hosts than possible to adress
            expect(() => {
                getSubnetsVLSM([192, 168, 300, 1], [255, 255, 0, 0], [1000, 999, 513]);
            }).toThrow(); //Bad ip
            expect(() => {
                getSubnetsVLSM([192, 168, -1, 1], [255, 255, 0, 0], [1000, 999, 513]);
            }).toThrow(); //Bad ip
            expect(() => {
                getSubnetsVLSM([192, 168, 0, 1], [255, 255, 300, 0], [1000, 999, 513]);
            }).toThrow(); //Bad Mask
            expect(() => {
                getSubnetsVLSM([192, 168, 0, 1], [255, 255, -1, 0], [1000, 999, 513]);
            }).toThrow(); //Bad Mask
            expect(() => {
                getSubnetsVLSM([192, 168, 0, 1], [255, 255, 255, 0], [100, 50, 0]);
            }).toThrow(); //Bad Host quantity
        });
});

describe('Testing recogniseClass function', () => {
    it('Should return recognised class', () => {
        expect(recogniseClass([10, 0, 0, 1])).toEqual(ipClasses[0]);
        expect(recogniseClass([128, 24, 53, 1])).toEqual(ipClasses[1]);
        expect(recogniseClass([192, 168, 0, 1])).toEqual(ipClasses[2]);
        expect(recogniseClass([224, 168, 0, 1])).toEqual(ipClasses[3]);
        expect(recogniseClass([254, 168, 0, 1])).toEqual(ipClasses[4]);
    });
    it('Should return false because class cannot be regognised', () => {
        expect(recogniseClass([127, 0, 0, 1])).toBe(false);
        expect(recogniseClass([127, 156, 0, 1])).toBe(false);
        expect(recogniseClass([255, 0, 0, 1])).toBe(false);
        expect(recogniseClass([255, 255, 255, 255])).toBe(false);
    });
});
