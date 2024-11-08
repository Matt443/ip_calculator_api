import { type IpAddressType } from '@/types/ip.types.js';

//TODO Fix this unconsitency of naming
export const sampleIpAdress = [192, 168, 0, 1];
export const sampleIpAdress_complicated = [192, 168, 255, 1];

export const sampleIpMask = [255, 255, 0, 0];
export const sampleIpMask_complicated = [255, 255, 128, 0];

export const sampleIpAdress_wrong = [-1, 255, 256, 0];
export const sampleIpBinaryAdress = ['11111111', '11111111', '11111111', '00000000'];

export const emails = {
    complicated: 'example.example21.example@example.com',
    simple: 'example@example.com',
    super_complicated: 'example.example21.example@example.123.example.com',
    wrong: 'example@@example.com'
};

export const strings = {
    complicated: 'We gonna to give you $$$ @!!!...-  1000% of money?',
    simple: 'test',
    wrong: '<script>alert("Hello world")</script>'
};

export const validatorTester = (data: string, callback: Function, result: boolean): void => {
    expect(callback(data)).toBe(result);
};

export const texts = {
    pass: 'Should pass validation',
    fail: 'Should not pass validation'
};

export type dataSetType = {
    ipBinary: string;
    maskDecimal: number;
    filler: string;
    expected: number;
};

export const dataSets: Array<dataSetType> = [
    {
        ipBinary: '1000000',
        maskDecimal: 128,
        filler: '0',
        expected: 128
    },
    {
        ipBinary: '0000000',
        maskDecimal: 128,
        filler: '0',
        expected: 0
    },
    {
        ipBinary: '1010000',
        maskDecimal: 128,
        filler: '0',
        expected: 128
    },
    {
        ipBinary: '11111111',
        maskDecimal: 224,
        filler: '0',
        expected: 224
    },
    {
        ipBinary: '11111111',
        maskDecimal: 254,
        filler: '0',
        expected: 254
    },
    {
        ipBinary: '0000000',
        maskDecimal: 0,
        filler: '1',
        expected: 255
    },
    {
        ipBinary: '11111111',
        maskDecimal: 255,
        filler: '1',
        expected: 255
    },
    {
        ipBinary: '01011010',
        maskDecimal: 224,
        filler: '1',
        expected: 95
    }
];

export const sampleIpRange: { min: IpAddressType; max: IpAddressType } = {
    min: [192, 168, 0, 1],
    max: [192, 168, 0, 255]
};

export const sampleIpRange_complicated: { min: IpAddressType; max: IpAddressType } = {
    min: [192, 168, 255, 1],
    max: [192, 168, 255, 126]
};

interface IpsToEdit {
    ip: IpAddressType;
}

export type IpToFixType = IpsToEdit & { fixed: IpAddressType };

export type IpToMoveType = IpsToEdit & { moved: IpAddressType; forwards: boolean };

export type IpToCompareType = IpsToEdit & { secondIp: IpAddressType };

export const ipsToFix: { fixable: IpToFixType[]; notFixable: IpToFixType[] } = {
    fixable: [
        { ip: [255, 255, 255, 255], fixed: [255, 255, 255, 255] },
        { ip: [192, 168, 0, -1], fixed: [192, 167, 255, 255] },
        { ip: [192, 0, 0, -1], fixed: [191, 255, 255, 255] },
        { ip: [0, 2, 0, -1], fixed: [0, 1, 255, 255] },
        { ip: [0, 2, 0, 256], fixed: [0, 2, 1, 0] },
        { ip: [1, 0, 0, -1], fixed: [0, 255, 255, 255] }
    ],
    notFixable: [
        { ip: [-1, 0, 0, 0], fixed: [] },
        { ip: [0, 0, 0, -1], fixed: [] },
        { ip: [255, 255, 255, 256], fixed: [] }
    ]
};

export const ipsToMove: { possible: IpToMoveType[]; notPossible: IpToMoveType[] } = {
    possible: [
        { forwards: false, ip: [192, 168, 0, 0], moved: [192, 167, 255, 255] },
        { forwards: false, ip: [192, 0, 0, 0], moved: [191, 255, 255, 255] },
        { forwards: false, ip: [0, 2, 0, 0], moved: [0, 1, 255, 255] },
        { forwards: true, ip: [0, 0, 0, 0], moved: [0, 0, 0, 1] },
        { forwards: true, ip: [254, 255, 255, 255], moved: [255, 0, 0, 0] },
        { forwards: true, ip: [255, 255, 254, 255], moved: [255, 255, 255, 0] }
    ],
    notPossible: [
        { forwards: true, ip: [255, 255, 255, 255], moved: [] },
        { forwards: false, ip: [0, 0, 0, 0], moved: [] }
    ]
};

export const ipToCompare: { yes: IpToCompareType[]; no: IpToCompareType[] } = {
    yes: [
        { ip: [192, 168, 0, 1], secondIp: [192, 168, 0, 1] },
        { ip: [255, 255, 255, 255], secondIp: [255, 255, 255, 255] },
        { ip: [0, 0, 0, 0], secondIp: [0, 0, 0, 0] }
    ],
    no: [
        { ip: [0, 0, 0, 0], secondIp: [0, 0, 0, 1] },
        { ip: [255, 255, 255, 254], secondIp: [255, 255, 255, 255] },
        { ip: [192, 168, 0, 2], secondIp: [192, 168, 0, 1] }
    ]
};
