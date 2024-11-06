import { getBroadcastAddress, getNetworkAddress } from '@/services/ipCalculations.service.js';
import {
    dataSets,
    dataSetType,
    sampleIpAdress,
    sampleIpAdress_complicated,
    sampleIpMask,
    sampleIpMask_complicated,
    texts
} from '@/constant/samples.constant.js';
import { calculatePartial } from '@/utils/calculating.util.js';

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
