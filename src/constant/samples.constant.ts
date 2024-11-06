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
