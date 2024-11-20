import {
    getBroadcastAddress,
    getNetworkAddress,
    getNumberOfHosts,
    getSubnets,
    isIpInRange
} from '@/services/ipCalculations.service.js';
import {
    dataSets,
    dataSetType,
    ipsToGetSubnets,
    IpToGetSubnetsType,
    sampleIpAdress,
    sampleIpAdress_complicated,
    sampleIpMask,
    sampleIpMask_complicated,
    sampleIpRange,
    sampleIpRange_complicated,
    texts
} from '@/constant/samples.constant.js';
import { calculatePartial } from '@/utils/calculating.util.js';
import { ERROR_MESSAGES } from '@/constant/errors.constants.js';

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
});

describe('Testing calculatePartial function', () => {
    it('Should return calculated octet', () => {
        dataSets.forEach((dataSet: dataSetType) => {
            expect(calculatePartial(dataSet.ipBinary, dataSet.maskDecimal, dataSet.filler)).toBe(
                dataSet.expected
            );
        });
    });
});

describe('Testing getNumberOfHosts function', () => {
    it('Should return number of host', () => {
        expect(getNumberOfHosts(sampleIpMask)).toBe(65534);
    });

    it('Should return number of host', () => {
        expect(getNumberOfHosts(sampleIpMask_complicated)).toBe(32766);
    });

    it('Should return number of host', () => {
        expect(getNumberOfHosts([255, 255, 255, 255])).toBe(0);
    });

    it('Should return number of host', () => {
        expect(getNumberOfHosts([255, 255, 255, 254])).toBe(0);
    });
});

describe('Testing isIpInRange function', () => {
    it('Should check if ip is in range and return true', () => {
        expect(
            isIpInRange(sampleIpAdress, sampleIpMask, sampleIpRange.min, sampleIpRange.max)
        ).toBe(true);
    });
    it('Should check if ip is in range and return true', () => {
        expect(
            isIpInRange(
                sampleIpAdress_complicated,
                sampleIpMask_complicated,
                sampleIpRange_complicated.min,
                sampleIpRange_complicated.max
            )
        ).toBe(true);
    });
    it('Should check if ip is in range and return false', () => {
        expect(
            isIpInRange(
                [192, 168, 255, 127],
                sampleIpMask_complicated,
                sampleIpRange_complicated.min,
                sampleIpRange_complicated.max
            )
        ).toBe(false);
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
        expect(
            //@ts-ignore
            getSubnets([192, 168, 0, 1], [255, 255, 255, 0], { subnetsHostQuantity: 16384 })
        ).toEqual([]);
        //@ts-ignore
        expect(getSubnets([192, 168, 0, 1], [255, 255, 255, 0], { subnetsQuantity: 128 })).toEqual(
            []
        );
    });
});
