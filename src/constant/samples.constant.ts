import { type IpAddressType } from '@/types/ip.types.js';
import { ERROR_MESSAGES } from './errors.constants';
import {
    CalculationTestsDataType,
    ConversionTestsDataType,
    dataSetType,
    HostQuantityTestsDataType,
    IpToCompareType,
    IpToFixType,
    IpToGetConversionsType,
    IpToGetInfoType,
    IpToGetSubnetsType,
    IpToGetSubnetsVLSMType,
    IpToMoveType,
    NetworkInfoTestsDataType,
    RecogniseClassTestsDataType,
    SubnetTestsDataType,
    SubnetVLSMTestsDataType
} from '@/types/samples.types.js';
import { ipClasses } from './supported.constants';

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

export const ipsToGetCompleteInfo: { success: IpToGetInfoType[]; fail: IpToGetInfoType[] } = {
    success: [
        {
            ip: [192, 168, 0, 1],
            ipMask: [255, 255, 255, 0],
            result: {
                networkAddress: {
                    ip: [192, 168, 0, 0],
                    decimal: 3232235520,
                    binary: ['11000000', '10101000', '00000000', '00000000'],
                    dotted: '192.168.0.0'
                },
                broadcastAddress: {
                    ip: [192, 168, 0, 255],
                    decimal: 3232235775,
                    binary: ['11000000', '10101000', '00000000', '11111111'],
                    dotted: '192.168.0.255'
                },
                ipMask: {
                    ip: [255, 255, 255, 0],
                    decimal: 4294967040,
                    binary: ['11111111', '11111111', '11111111', '00000000'],
                    dotted: '255.255.255.0'
                },
                hosts: {
                    first: {
                        ip: [192, 168, 0, 1],
                        decimal: 3232235521,
                        binary: ['11000000', '10101000', '00000000', '00000001'],
                        dotted: '192.168.0.1'
                    },
                    last: {
                        ip: [192, 168, 0, 254],
                        decimal: 3232235774,
                        binary: ['11000000', '10101000', '00000000', '11111110'],
                        dotted: '192.168.0.254'
                    },
                    quantity: 254
                }
            }
        }
    ],
    fail: [
        { ip: [300, 168, 0, 1], ipMask: [255, 255, 255, 0] },
        { ip: [192, 168, 0, 1], ipMask: [300, 255, 255, 0] },
        { ip: [-1, 168, 0, 1], ipMask: [255, 255, 255, 0] },
        { ip: [192, 168, 0, 1], ipMask: [-1, 255, 255, 0] }
    ]
};

export const ipsToGetSubnets: { success: IpToGetSubnetsType[]; fail: IpToGetSubnetsType[] } = {
    success: [
        {
            ip: [192, 168, 0, 1],
            ipMask: [255, 255, 255, 128],
            subnetsQuantity: 2,
            result: [
                {
                    networkAddress: {
                        ip: [192, 168, 0, 0],
                        decimal: 3232235520,
                        binary: ['11000000', '10101000', '00000000', '00000000'],
                        dotted: '192.168.0.0'
                    },
                    broadcastAddress: {
                        ip: [192, 168, 0, 127],
                        decimal: 3232235647,
                        binary: ['11000000', '10101000', '00000000', '01111111'],
                        dotted: '192.168.0.127'
                    },
                    ipMask: {
                        ip: [255, 255, 255, 128],
                        decimal: 4294967168,
                        binary: ['11111111', '11111111', '11111111', '10000000'],
                        dotted: '255.255.255.128'
                    },
                    hosts: {
                        first: {
                            ip: [192, 168, 0, 1],
                            decimal: 3232235521,
                            binary: ['11000000', '10101000', '00000000', '00000001'],
                            dotted: '192.168.0.1'
                        },
                        last: {
                            ip: [192, 168, 0, 126],
                            decimal: 3232235646,
                            binary: ['11000000', '10101000', '00000000', '01111110'],
                            dotted: '192.168.0.126'
                        },
                        quantity: 126
                    }
                },
                {
                    networkAddress: {
                        ip: [192, 168, 0, 128],
                        decimal: 3232235648,
                        binary: ['11000000', '10101000', '00000000', '10000000'],
                        dotted: '192.168.0.128'
                    },
                    broadcastAddress: {
                        ip: [192, 168, 0, 255],
                        decimal: 3232235775,
                        binary: ['11000000', '10101000', '00000000', '11111111'],
                        dotted: '192.168.0.255'
                    },
                    ipMask: {
                        ip: [255, 255, 255, 128],
                        decimal: 4294967168,
                        binary: ['11111111', '11111111', '11111111', '10000000'],
                        dotted: '255.255.255.128'
                    },
                    hosts: {
                        first: {
                            ip: [192, 168, 0, 129],
                            decimal: 3232235649,
                            binary: ['11000000', '10101000', '00000000', '10000001'],
                            dotted: '192.168.0.129'
                        },
                        last: {
                            ip: [192, 168, 0, 254],
                            decimal: 3232235774,
                            binary: ['11000000', '10101000', '00000000', '11111110'],
                            dotted: '192.168.0.254'
                        },
                        quantity: 126
                    }
                }
            ]
        }
    ],
    fail: [
        {
            ip: [300, 168, 0, 1],
            ipMask: [255, 255, 255, 0],
            subnetsQuantity: 2,
            error: ERROR_MESSAGES.validation.ipAddrress
        },
        {
            ip: [192, 168, 0, 1],
            ipMask: [300, 255, 255, 0],
            subnetsQuantity: 2,
            error: ERROR_MESSAGES.validation.ipAddrress
        },
        {
            ip: [-1, 168, 0, 1],
            ipMask: [255, 255, 255, 0],
            subnetsQuantity: 2,
            error: ERROR_MESSAGES.validation.ipAddrress
        },
        {
            ip: [192, 168, 0, 1],
            ipMask: [-1, 255, 255, 0],
            subnetsQuantity: 2,
            error: ERROR_MESSAGES.validation.ipAddrress
        }
    ]
};

export const ipsToGetConversions: {
    success: IpToGetConversionsType[];
    fail: IpToGetConversionsType[];
} = {
    success: [
        {
            ip: [192, 168, 0, 1],
            result: {
                ip: [192, 168, 0, 1],
                decimal: 3232235521,
                binary: ['11000000', '10101000', '00000000', '00000001'],
                dotted: '192.168.0.1'
            }
        },
        {
            ip: [0, 0, 0, 0],
            result: {
                ip: [0, 0, 0, 0],
                decimal: 0,
                binary: ['00000000', '00000000', '00000000', '00000000'],
                dotted: '0.0.0.0'
            }
        },
        {
            ip: [255, 255, 255, 255],
            result: {
                ip: [255, 255, 255, 255],
                decimal: 4294967295,
                binary: ['11111111', '11111111', '11111111', '11111111'],
                dotted: '255.255.255.255'
            }
        }
    ],
    fail: [{ ip: [192, 300, 255, 255] }, { ip: [192, -1, 255, 255] }]
};

export const ipsToGetSubnetsVLSM: {
    success: IpToGetSubnetsVLSMType[];
    fail: IpToGetSubnetsVLSMType[];
} = {
    success: [
        {
            ip: [192, 168, 0, 1],
            masks: [
                [255, 255, 255, 128],
                [255, 255, 255, 192],
                [255, 255, 255, 192]
            ],
            results: [
                {
                    networkAddress: {
                        ip: [192, 168, 0, 0],
                        decimal: 3232235520,
                        binary: ['11000000', '10101000', '00000000', '00000000'],
                        dotted: '192.168.0.0'
                    },
                    broadcastAddress: {
                        ip: [192, 168, 0, 127],
                        decimal: 3232235647,
                        binary: ['11000000', '10101000', '00000000', '01111111'],
                        dotted: '192.168.0.127'
                    },
                    ipMask: {
                        ip: [255, 255, 255, 128],
                        decimal: 4294967168,
                        binary: ['11111111', '11111111', '11111111', '10000000'],
                        dotted: '255.255.255.128'
                    },
                    hosts: {
                        first: {
                            ip: [192, 168, 0, 1],
                            decimal: 3232235521,
                            binary: ['11000000', '10101000', '00000000', '00000001'],
                            dotted: '192.168.0.1'
                        },
                        last: {
                            ip: [192, 168, 0, 126],
                            decimal: 3232235646,
                            binary: ['11000000', '10101000', '00000000', '01111110'],
                            dotted: '192.168.0.126'
                        },
                        quantity: 126
                    }
                },
                {
                    networkAddress: {
                        ip: [192, 168, 0, 128],
                        decimal: 3232235648,
                        binary: ['11000000', '10101000', '00000000', '10000000'],
                        dotted: '192.168.0.128'
                    },
                    broadcastAddress: {
                        ip: [192, 168, 0, 191],
                        decimal: 3232235711,
                        binary: ['11000000', '10101000', '00000000', '10111111'],
                        dotted: '192.168.0.191'
                    },
                    ipMask: {
                        ip: [255, 255, 255, 192],
                        decimal: 4294967232,
                        binary: ['11111111', '11111111', '11111111', '11000000'],
                        dotted: '255.255.255.192'
                    },
                    hosts: {
                        first: {
                            ip: [192, 168, 0, 129],
                            decimal: 3232235649,
                            binary: ['11000000', '10101000', '00000000', '10000001'],
                            dotted: '192.168.0.129'
                        },
                        last: {
                            ip: [192, 168, 0, 190],
                            decimal: 3232235710,
                            binary: ['11000000', '10101000', '00000000', '10111110'],
                            dotted: '192.168.0.190'
                        },
                        quantity: 62
                    }
                },
                {
                    networkAddress: {
                        ip: [192, 168, 0, 192],
                        decimal: 3232235712,
                        binary: ['11000000', '10101000', '00000000', '11000000'],
                        dotted: '192.168.0.192'
                    },
                    broadcastAddress: {
                        ip: [192, 168, 0, 255],
                        decimal: 3232235775,
                        binary: ['11000000', '10101000', '00000000', '11111111'],
                        dotted: '192.168.0.255'
                    },
                    ipMask: {
                        ip: [255, 255, 255, 192],
                        decimal: 4294967232,
                        binary: ['11111111', '11111111', '11111111', '11000000'],
                        dotted: '255.255.255.192'
                    },
                    hosts: {
                        first: {
                            ip: [192, 168, 0, 193],
                            decimal: 3232235713,
                            binary: ['11000000', '10101000', '00000000', '11000001'],
                            dotted: '192.168.0.193'
                        },
                        last: {
                            ip: [192, 168, 0, 254],
                            decimal: 3232235774,
                            binary: ['11000000', '10101000', '00000000', '11111110'],
                            dotted: '192.168.0.254'
                        },
                        quantity: 62
                    }
                }
            ]
        },
        {
            ip: [192, 168, 10, 1],
            masks: [
                [255, 255, 252, 0],
                [255, 255, 252, 0],
                [255, 255, 252, 0]
            ],
            results: [
                {
                    networkAddress: {
                        ip: [192, 168, 8, 0],
                        decimal: 3232237568,
                        binary: ['11000000', '10101000', '00001000', '00000000'],
                        dotted: '192.168.8.0'
                    },
                    broadcastAddress: {
                        ip: [192, 168, 11, 255],
                        decimal: 3232238591,
                        binary: ['11000000', '10101000', '00001011', '11111111'],
                        dotted: '192.168.11.255'
                    },
                    ipMask: {
                        ip: [255, 255, 252, 0],
                        decimal: 4294966272,
                        binary: ['11111111', '11111111', '11111100', '00000000'],
                        dotted: '255.255.252.0'
                    },
                    hosts: {
                        first: {
                            ip: [192, 168, 8, 1],
                            decimal: 3232237569,
                            binary: ['11000000', '10101000', '00001000', '00000001'],
                            dotted: '192.168.8.1'
                        },
                        last: {
                            ip: [192, 168, 11, 254],
                            decimal: 3232238590,
                            binary: ['11000000', '10101000', '00001011', '11111110'],
                            dotted: '192.168.11.254'
                        },
                        quantity: 1022
                    }
                },
                {
                    networkAddress: {
                        ip: [192, 168, 12, 0],
                        decimal: 3232238592,
                        binary: ['11000000', '10101000', '00001100', '00000000'],
                        dotted: '192.168.12.0'
                    },
                    broadcastAddress: {
                        ip: [192, 168, 15, 255],
                        decimal: 3232239615,
                        binary: ['11000000', '10101000', '00001111', '11111111'],
                        dotted: '192.168.15.255'
                    },
                    ipMask: {
                        ip: [255, 255, 252, 0],
                        decimal: 4294966272,
                        binary: ['11111111', '11111111', '11111100', '00000000'],
                        dotted: '255.255.252.0'
                    },
                    hosts: {
                        first: {
                            ip: [192, 168, 12, 1],
                            decimal: 3232238593,
                            binary: ['11000000', '10101000', '00001100', '00000001'],
                            dotted: '192.168.12.1'
                        },
                        last: {
                            ip: [192, 168, 15, 254],
                            decimal: 3232239614,
                            binary: ['11000000', '10101000', '00001111', '11111110'],
                            dotted: '192.168.15.254'
                        },
                        quantity: 1022
                    }
                },
                {
                    networkAddress: {
                        ip: [192, 168, 16, 0],
                        decimal: 3232239616,
                        binary: ['11000000', '10101000', '00010000', '00000000'],
                        dotted: '192.168.16.0'
                    },
                    broadcastAddress: {
                        ip: [192, 168, 19, 255],
                        decimal: 3232240639,
                        binary: ['11000000', '10101000', '00010011', '11111111'],
                        dotted: '192.168.19.255'
                    },
                    ipMask: {
                        ip: [255, 255, 252, 0],
                        decimal: 4294966272,
                        binary: ['11111111', '11111111', '11111100', '00000000'],
                        dotted: '255.255.252.0'
                    },
                    hosts: {
                        first: {
                            ip: [192, 168, 16, 1],
                            decimal: 3232239617,
                            binary: ['11000000', '10101000', '00010000', '00000001'],
                            dotted: '192.168.16.1'
                        },
                        last: {
                            ip: [192, 168, 19, 254],
                            decimal: 3232240638,
                            binary: ['11000000', '10101000', '00010011', '11111110'],
                            dotted: '192.168.19.254'
                        },
                        quantity: 1022
                    }
                }
            ]
        }
    ],
    fail: [
        { ip: [192, 168, 300, 1], masks: [[255, 255, 0, 0]] },
        { ip: [192, 168, 0, 1], masks: [[255, 255, 300, 0]] },
        { ip: [192, 168, 0, 1], masks: [[255, 255, -1, 0]] },
        { ip: [192, 168, -1, 1], masks: [[255, 255, 0, 0]] }
    ]
};

export const ipsToBinary: ConversionTestsDataType = {
    success: [
        {
            ip: '0',
            type: 'decimal',
            result: {
                given: '0',
                result: {
                    joined: '00000000.00000000.00000000.00000000',
                    separated: ['00000000', '00000000', '00000000', '00000000']
                }
            }
        },
        {
            ip: '192.168.0.1',
            type: 'default',
            result: {
                given: '192.168.0.1',
                result: {
                    joined: '11000000.10101000.00000000.00000001',
                    separated: ['11000000', '10101000', '00000000', '00000001']
                }
            }
        },
        {
            ip: '11000000101010000000000000000001',
            type: 'binary',
            result: {
                given: '11000000101010000000000000000001',
                result: {
                    joined: '11000000.10101000.00000000.00000001',
                    separated: ['11000000', '10101000', '00000000', '00000001']
                }
            }
        },
        {
            ip: '24',
            type: 'shorthand',
            result: {
                given: '24',
                result: {
                    joined: '11111111.11111111.11111111.00000000',
                    separated: ['11111111', '11111111', '11111111', '00000000']
                }
            }
        }
    ],
    fail: [
        { ip: '0', type: '', result: 400 },
        { ip: '0', type: 'defaults', result: 400 },
        { ip: '0', type: '1', result: 400 },
        { ip: 'Hello', type: 'decimal', result: 400 },
        { ip: '-1', type: 'decimal', result: 400 },
        { ip: '11111111', type: 'binary', result: 400 },
        { ip: 'Hello', type: 'decimals', result: 400 },
        { ip: '192.168.0.300', type: 'default', result: 400 },
        { ip: '192.168.0', type: 'default', result: 400 }
    ]
};

export const ipsToDecimal: ConversionTestsDataType = {
    success: [
        {
            ip: '192.168.0.1',
            type: 'default',
            result: {
                given: '192.168.0.1',
                result: {
                    decimal: 3232235521
                }
            }
        },
        {
            ip: '11000000101010000000000000000001',
            type: 'binary',
            result: {
                given: '11000000101010000000000000000001',
                result: {
                    decimal: 3232235521
                }
            }
        },
        {
            ip: '11111111111111111111111111111111',
            type: 'binary',
            result: {
                given: '11111111111111111111111111111111',
                result: {
                    decimal: 4294967295
                }
            }
        },
        {
            ip: '255',
            type: 'decimal',
            result: {
                given: '255',
                result: { decimal: 255 }
            }
        },
        {
            ip: '25',
            type: 'shorthand',
            result: {
                given: '25',
                result: { decimal: 4294967168 }
            }
        }
    ],
    fail: [...ipsToBinary.fail]
};

export const ipsToDefault: ConversionTestsDataType = {
    success: [
        {
            ip: '192.168.0.1',
            type: 'default',
            result: {
                given: '192.168.0.1',
                result: {
                    joined: '192.168.0.1',
                    separated: [192, 168, 0, 1]
                }
            }
        },
        {
            ip: '11000000101010000000000000000001',
            type: 'binary',
            result: {
                given: '11000000101010000000000000000001',
                result: {
                    joined: '192.168.0.1',
                    separated: [192, 168, 0, 1]
                }
            }
        },
        {
            ip: '11111111111111111111111111111111',
            type: 'binary',
            result: {
                given: '11111111111111111111111111111111',
                result: {
                    joined: '255.255.255.255',
                    separated: [255, 255, 255, 255]
                }
            }
        },
        {
            ip: '255',
            type: 'decimal',
            result: {
                given: '255',
                result: {
                    joined: '0.0.0.255',
                    separated: [0, 0, 0, 255]
                }
            }
        }
    ],
    fail: [...ipsToBinary.fail]
};

export const ipsToShorthand: ConversionTestsDataType = {
    success: [
        {
            ip: '255.255.255.255',
            type: 'default',
            result: {
                given: '255.255.255.255',
                result: {
                    shorthand: 32
                }
            }
        },
        {
            ip: '0.0.0.0',
            type: 'default',
            result: {
                given: '0.0.0.0',
                result: {
                    shorthand: 0
                }
            }
        },
        {
            ip: '255.192.0.0',
            type: 'default',
            result: {
                given: '255.192.0.0',
                result: {
                    shorthand: 10
                }
            }
        },
        {
            ip: '255.255.255.254',
            type: 'default',
            result: {
                given: '255.255.255.254',
                result: {
                    shorthand: 31
                }
            }
        },
        {
            ip: '4294967040',
            type: 'decimal',
            result: {
                given: '4294967040',
                result: {
                    shorthand: 24
                }
            }
        },
        {
            ip: '11111111111111110000000000000000',
            type: 'binary',
            result: {
                given: '11111111111111110000000000000000',
                result: {
                    shorthand: 16
                }
            }
        },
        {
            ip: '25',
            type: 'shorthand',
            result: {
                given: '25',
                result: {
                    shorthand: 25
                }
            }
        },
        {
            ip: '4278255488',
            type: 'decimal',
            result: {
                given: '4278255488',
                result: {
                    shorthand: -1
                }
            }
        },
        {
            ip: '11000000101010000000000000000001',
            type: 'binary',
            result: {
                given: '11000000101010000000000000000001',
                result: {
                    shorthand: -1
                }
            }
        },
        {
            ip: '25',
            type: 'shorthand',
            result: {
                given: '25',
                result: {
                    shorthand: 25
                }
            }
        }
    ],
    fail: [...ipsToBinary.fail]
};

export const ipsToGetNetworkAddress: CalculationTestsDataType = {
    success: [
        {
            ip: '192.168.0.1',
            mask: '255.255.255.0',
            maskType: 'default',
            result: {
                given: {
                    ip: '192.168.0.1',
                    mask: '255.255.255.0'
                },
                result: {
                    ip: [192, 168, 0, 0],
                    decimal: 3232235520,
                    binary: ['11000000', '10101000', '00000000', '00000000'],
                    dotted: '192.168.0.0'
                }
            }
        },
        {
            ip: '255.255.255.255',
            mask: '32',
            result: {
                given: {
                    ip: '255.255.255.255',
                    mask: '32'
                },
                result: {
                    ip: [255, 255, 255, 255],
                    decimal: 4294967295,
                    binary: ['11111111', '11111111', '11111111', '11111111'],
                    dotted: '255.255.255.255'
                }
            }
        },
        {
            ip: '0.0.0.0',
            mask: '0',
            result: {
                given: {
                    ip: '0.0.0.0',
                    mask: '0'
                },
                result: {
                    ip: [0, 0, 0, 0],
                    decimal: 0,
                    binary: ['00000000', '00000000', '00000000', '00000000'],
                    dotted: '0.0.0.0'
                }
            }
        }
    ],
    fail: [
        { ip: '300.168.0.1', mask: '24', result: 400 },
        { ip: '-1.168.0.1', mask: '1', result: 400 },
        { ip: '192.168.0.1', mask: '-1', result: 400 },
        { ip: '192.168.0.1', mask: '33', result: 400 },
        { ip: '192.168.0.1', type: 'decimal', mask: '33', result: 400 },
        { ip: '192.168.0.1', type: 'shorthand', mask: '33', result: 400 },
        { ip: '192.168.0.1', type: 'binary', mask: '32', result: 400 },
        { ip: '192.168.0.1', type: 'binaryy', mask: '32', result: 400 },
        { ip: '192.168.0.1', type: 'default', mask: '32', maskType: 'numbers', result: 400 },
        { ip: '192.168.0.1', type: 'default', mask: '33', maskType: 'default', result: 400 },
        { ip: '192.168.0.1', type: 'default', mask: '33', maskType: 'shorthand', result: 400 },
        { ip: '192.168.0.1', type: 'default', mask: '33', maskType: 'binary', result: 400 },
        { ip: '110000001010100Hi00000000000000001', type: 'binary', mask: '32', result: 400 },
        { ip: '-1', type: 'decimal', mask: '32', result: 400 },
        { ip: '-1', type: 'shorthand', mask: '32', result: 400 }
    ]
};

export const ipsToGetBroadcastAddress: CalculationTestsDataType = {
    success: [
        {
            ip: '192.168.0.1',
            mask: '255.255.255.0',
            maskType: 'default',
            result: {
                given: {
                    ip: '192.168.0.1',
                    mask: '255.255.255.0'
                },
                result: {
                    ip: [192, 168, 0, 255],
                    decimal: 3232235775,
                    binary: ['11000000', '10101000', '00000000', '11111111'],
                    dotted: '192.168.0.255'
                }
            }
        },
        {
            ip: '255.255.255.255',
            mask: '32',
            result: {
                given: {
                    ip: '255.255.255.255',
                    mask: '32'
                },
                result: {
                    ip: [255, 255, 255, 255],
                    decimal: 4294967295,
                    binary: ['11111111', '11111111', '11111111', '11111111'],
                    dotted: '255.255.255.255'
                }
            }
        },
        {
            ip: '0.0.0.0',
            mask: '0',
            result: {
                given: {
                    ip: '0.0.0.0',
                    mask: '0'
                },
                result: {
                    ip: [255, 255, 255, 255],
                    decimal: 4294967295,
                    binary: ['11111111', '11111111', '11111111', '11111111'],
                    dotted: '255.255.255.255'
                }
            }
        }
    ],
    fail: [...ipsToGetNetworkAddress.fail]
};

export const ipsToGetHostQuantity: HostQuantityTestsDataType = {
    success: [
        {
            mask: '24',
            result: { given: { mask: '24', maskType: 'shorthand' }, result: { hostQuantity: 254 } }
        },
        {
            mask: '0',
            result: {
                given: { mask: '0', maskType: 'shorthand' },
                result: { hostQuantity: 4294967294 }
            }
        },
        {
            mask: '32',
            result: { given: { mask: '32', maskType: 'shorthand' }, result: { hostQuantity: 0 } }
        },
        {
            mask: '255.255.0.0',
            maskType: 'default',
            result: {
                given: { mask: '255.255.0.0', maskType: 'default' },
                result: { hostQuantity: 65534 }
            }
        },
        {
            mask: '4294836224',
            maskType: 'decimal',
            result: {
                given: { mask: '4294836224', maskType: 'decimal' },
                result: { hostQuantity: 131070 }
            }
        }
    ],
    fail: [
        { mask: '33', result: 400 },
        { mask: '255.255.0.0', maskType: 'deffault', result: 400 },
        { mask: '-1', maskType: 'shorthand', result: 400 },
        { mask: '32', maskType: 'default', result: 400 },
        { mask: '300.168.0.1', maskType: 'default', result: 400 },
        { mask: '-1.168.0.1', maskType: 'default', result: 400 },
        { mask: '4294967296', maskType: 'decimal', result: 400 },
        { mask: '192.168.0.1', maskType: 'default', result: 400 },
        { mask: '-1', maskType: 'decimal', result: 400 },
        { mask: '-100', maskType: 'decimal', result: 400 },
        { mask: '1111111', maskType: 'binary', result: 400 }
    ]
};

export const ipsToGetNetworkInfo: NetworkInfoTestsDataType = {
    success: [
        {
            ip: '192.168.0.1',
            mask: '24',
            result: {
                given: {
                    ip: '192.168.0.1',
                    mask: '24',
                    type: 'default',
                    maskType: 'shorthand'
                },
                result: {
                    networkAddress: {
                        ip: [192, 168, 0, 0],
                        decimal: 3232235520,
                        binary: ['11000000', '10101000', '00000000', '00000000'],
                        dotted: '192.168.0.0'
                    },
                    broadcastAddress: {
                        ip: [192, 168, 0, 255],
                        decimal: 3232235775,
                        binary: ['11000000', '10101000', '00000000', '11111111'],
                        dotted: '192.168.0.255'
                    },
                    ipMask: {
                        ip: [255, 255, 255, 0],
                        decimal: 4294967040,
                        binary: ['11111111', '11111111', '11111111', '00000000'],
                        dotted: '255.255.255.0'
                    },
                    hosts: {
                        first: {
                            ip: [192, 168, 0, 1],
                            decimal: 3232235521,
                            binary: ['11000000', '10101000', '00000000', '00000001'],
                            dotted: '192.168.0.1'
                        },
                        last: {
                            ip: [192, 168, 0, 254],
                            decimal: 3232235774,
                            binary: ['11000000', '10101000', '00000000', '11111110'],
                            dotted: '192.168.0.254'
                        },
                        quantity: 254
                    }
                }
            }
        },
        {
            ip: '24',
            type: 'shorthand',
            mask: '16',
            result: {
                given: {
                    ip: '24',
                    mask: '16',
                    type: 'shorthand',
                    maskType: 'shorthand'
                },
                result: {
                    networkAddress: {
                        ip: [255, 255, 0, 0],
                        decimal: 4294901760,
                        binary: ['11111111', '11111111', '00000000', '00000000'],
                        dotted: '255.255.0.0'
                    },
                    broadcastAddress: {
                        ip: [255, 255, 255, 255],
                        decimal: 4294967295,
                        binary: ['11111111', '11111111', '11111111', '11111111'],
                        dotted: '255.255.255.255'
                    },
                    ipMask: {
                        ip: [255, 255, 0, 0],
                        decimal: 4294901760,
                        binary: ['11111111', '11111111', '00000000', '00000000'],
                        dotted: '255.255.0.0'
                    },
                    hosts: {
                        first: {
                            ip: [255, 255, 0, 1],
                            decimal: 4294901761,
                            binary: ['11111111', '11111111', '00000000', '00000001'],
                            dotted: '255.255.0.1'
                        },
                        last: {
                            ip: [255, 255, 255, 254],
                            decimal: 4294967294,
                            binary: ['11111111', '11111111', '11111111', '11111110'],
                            dotted: '255.255.255.254'
                        },
                        quantity: 65534
                    }
                }
            }
        },
        {
            ip: '10.0.0.1',
            mask: '31',
            result: {
                given: {
                    type: 'default',
                    ip: '10.0.0.1',
                    mask: '31',
                    maskType: 'shorthand'
                },
                result: {
                    networkAddress: {
                        ip: [10, 0, 0, 0],
                        decimal: 167772160,
                        binary: ['00001010', '00000000', '00000000', '00000000'],
                        dotted: '10.0.0.0'
                    },
                    broadcastAddress: {
                        ip: [10, 0, 0, 1],
                        decimal: 167772161,
                        binary: ['00001010', '00000000', '00000000', '00000001'],
                        dotted: '10.0.0.1'
                    },
                    ipMask: {
                        ip: [255, 255, 255, 254],
                        decimal: 4294967294,
                        binary: ['11111111', '11111111', '11111111', '11111110'],
                        dotted: '255.255.255.254'
                    },
                    hosts: {
                        quantity: 0
                    }
                }
            }
        }
    ],
    fail: [
        { ip: '300.168.0.1', mask: '24', result: 400 },
        { ip: '-1.168.0.1', mask: '1', result: 400 },
        { ip: '192.168.0.1', mask: '-1', result: 400 },
        { ip: '192.168.0.1', mask: '33', result: 400 },
        { ip: '192.168.0.1', type: 'decimal', mask: '33', result: 400 },
        { ip: '192.168.0.1', type: 'shorthand', mask: '33', result: 400 },
        { ip: '192.168.0.1', type: 'binary', mask: '32', result: 400 },
        { ip: '192.168.0.1', type: 'binaryy', mask: '32', result: 400 },
        { ip: '192.168.0.1', type: 'default', mask: '32', maskType: 'numbers', result: 400 },
        { ip: '192.168.0.1', type: 'default', mask: '33', maskType: 'default', result: 400 },
        { ip: '192.168.0.1', type: 'default', mask: '33', maskType: 'shorthand', result: 400 },
        { ip: '192.168.0.1', type: 'default', mask: '33', maskType: 'binary', result: 400 },
        { ip: '110000001010100Hi00000000000000001', type: 'binary', mask: '32', result: 400 },
        { ip: '-1', type: 'decimal', mask: '32', result: 400 },
        { ip: '-1', type: 'shorthand', mask: '32', result: 400 }
    ]
};

export const ipsToGetSubnetsResponse: SubnetTestsDataType = {
    success: [
        {
            ip: '10.0.0.1',
            mask: '24',
            subnetsQuantity: 2,
            result: {
                given: {
                    type: 'default',
                    ip: '10.0.0.1',
                    mask: '24',
                    maskType: 'shorthand',
                    subnetsQuantity: 2
                },
                result: [
                    {
                        networkAddress: {
                            ip: [10, 0, 0, 0],
                            decimal: 167772160,
                            binary: ['00001010', '00000000', '00000000', '00000000'],
                            dotted: '10.0.0.0'
                        },
                        broadcastAddress: {
                            ip: [10, 0, 0, 127],
                            decimal: 167772287,
                            binary: ['00001010', '00000000', '00000000', '01111111'],
                            dotted: '10.0.0.127'
                        },
                        ipMask: {
                            ip: [255, 255, 255, 128],
                            decimal: 4294967168,
                            binary: ['11111111', '11111111', '11111111', '10000000'],
                            dotted: '255.255.255.128'
                        },
                        hosts: {
                            first: {
                                ip: [10, 0, 0, 1],
                                decimal: 167772161,
                                binary: ['00001010', '00000000', '00000000', '00000001'],
                                dotted: '10.0.0.1'
                            },
                            last: {
                                ip: [10, 0, 0, 126],
                                decimal: 167772286,
                                binary: ['00001010', '00000000', '00000000', '01111110'],
                                dotted: '10.0.0.126'
                            },
                            quantity: 126
                        }
                    },
                    {
                        networkAddress: {
                            ip: [10, 0, 0, 128],
                            decimal: 167772288,
                            binary: ['00001010', '00000000', '00000000', '10000000'],
                            dotted: '10.0.0.128'
                        },
                        broadcastAddress: {
                            ip: [10, 0, 0, 255],
                            decimal: 167772415,
                            binary: ['00001010', '00000000', '00000000', '11111111'],
                            dotted: '10.0.0.255'
                        },
                        ipMask: {
                            ip: [255, 255, 255, 128],
                            decimal: 4294967168,
                            binary: ['11111111', '11111111', '11111111', '10000000'],
                            dotted: '255.255.255.128'
                        },
                        hosts: {
                            first: {
                                ip: [10, 0, 0, 129],
                                decimal: 167772289,
                                binary: ['00001010', '00000000', '00000000', '10000001'],
                                dotted: '10.0.0.129'
                            },
                            last: {
                                ip: [10, 0, 0, 254],
                                decimal: 167772414,
                                binary: ['00001010', '00000000', '00000000', '11111110'],
                                dotted: '10.0.0.254'
                            },
                            quantity: 126
                        }
                    }
                ]
            }
        },
        {
            ip: '00001010000000000000000000000001',
            type: 'binary',
            maskType: 'binary',
            mask: '11111111111111111111111100000000',
            subnetsHostQuantity: 126,
            result: {
                given: {
                    ip: '00001010000000000000000000000001',
                    type: 'binary',
                    maskType: 'binary',
                    mask: '11111111111111111111111100000000',
                    subnetsHostQuantity: 126
                },
                result: [
                    {
                        networkAddress: {
                            ip: [10, 0, 0, 0],
                            decimal: 167772160,
                            binary: ['00001010', '00000000', '00000000', '00000000'],
                            dotted: '10.0.0.0'
                        },
                        broadcastAddress: {
                            ip: [10, 0, 0, 127],
                            decimal: 167772287,
                            binary: ['00001010', '00000000', '00000000', '01111111'],
                            dotted: '10.0.0.127'
                        },
                        ipMask: {
                            ip: [255, 255, 255, 128],
                            decimal: 4294967168,
                            binary: ['11111111', '11111111', '11111111', '10000000'],
                            dotted: '255.255.255.128'
                        },
                        hosts: {
                            first: {
                                ip: [10, 0, 0, 1],
                                decimal: 167772161,
                                binary: ['00001010', '00000000', '00000000', '00000001'],
                                dotted: '10.0.0.1'
                            },
                            last: {
                                ip: [10, 0, 0, 126],
                                decimal: 167772286,
                                binary: ['00001010', '00000000', '00000000', '01111110'],
                                dotted: '10.0.0.126'
                            },
                            quantity: 126
                        }
                    },
                    {
                        networkAddress: {
                            ip: [10, 0, 0, 128],
                            decimal: 167772288,
                            binary: ['00001010', '00000000', '00000000', '10000000'],
                            dotted: '10.0.0.128'
                        },
                        broadcastAddress: {
                            ip: [10, 0, 0, 255],
                            decimal: 167772415,
                            binary: ['00001010', '00000000', '00000000', '11111111'],
                            dotted: '10.0.0.255'
                        },
                        ipMask: {
                            ip: [255, 255, 255, 128],
                            decimal: 4294967168,
                            binary: ['11111111', '11111111', '11111111', '10000000'],
                            dotted: '255.255.255.128'
                        },
                        hosts: {
                            first: {
                                ip: [10, 0, 0, 129],
                                decimal: 167772289,
                                binary: ['00001010', '00000000', '00000000', '10000001'],
                                dotted: '10.0.0.129'
                            },
                            last: {
                                ip: [10, 0, 0, 254],
                                decimal: 167772414,
                                binary: ['00001010', '00000000', '00000000', '11111110'],
                                dotted: '10.0.0.254'
                            },
                            quantity: 126
                        }
                    }
                ]
            }
        },
        {
            ip: '167772161',
            type: 'decimal',
            mask: '4294967040',
            maskType: 'decimal',
            subnetsQuantity: 2,
            result: {
                given: {
                    ip: '167772161',
                    maskType: 'decimal',
                    type: 'decimal',
                    mask: '4294967040',
                    subnetsQuantity: 2
                },
                result: [
                    {
                        networkAddress: {
                            ip: [10, 0, 0, 0],
                            decimal: 167772160,
                            binary: ['00001010', '00000000', '00000000', '00000000'],
                            dotted: '10.0.0.0'
                        },
                        broadcastAddress: {
                            ip: [10, 0, 0, 127],
                            decimal: 167772287,
                            binary: ['00001010', '00000000', '00000000', '01111111'],
                            dotted: '10.0.0.127'
                        },
                        ipMask: {
                            ip: [255, 255, 255, 128],
                            decimal: 4294967168,
                            binary: ['11111111', '11111111', '11111111', '10000000'],
                            dotted: '255.255.255.128'
                        },
                        hosts: {
                            first: {
                                ip: [10, 0, 0, 1],
                                decimal: 167772161,
                                binary: ['00001010', '00000000', '00000000', '00000001'],
                                dotted: '10.0.0.1'
                            },
                            last: {
                                ip: [10, 0, 0, 126],
                                decimal: 167772286,
                                binary: ['00001010', '00000000', '00000000', '01111110'],
                                dotted: '10.0.0.126'
                            },
                            quantity: 126
                        }
                    },
                    {
                        networkAddress: {
                            ip: [10, 0, 0, 128],
                            decimal: 167772288,
                            binary: ['00001010', '00000000', '00000000', '10000000'],
                            dotted: '10.0.0.128'
                        },
                        broadcastAddress: {
                            ip: [10, 0, 0, 255],
                            decimal: 167772415,
                            binary: ['00001010', '00000000', '00000000', '11111111'],
                            dotted: '10.0.0.255'
                        },
                        ipMask: {
                            ip: [255, 255, 255, 128],
                            decimal: 4294967168,
                            binary: ['11111111', '11111111', '11111111', '10000000'],
                            dotted: '255.255.255.128'
                        },
                        hosts: {
                            first: {
                                ip: [10, 0, 0, 129],
                                decimal: 167772289,
                                binary: ['00001010', '00000000', '00000000', '10000001'],
                                dotted: '10.0.0.129'
                            },
                            last: {
                                ip: [10, 0, 0, 254],
                                decimal: 167772414,
                                binary: ['00001010', '00000000', '00000000', '11111110'],
                                dotted: '10.0.0.254'
                            },
                            quantity: 126
                        }
                    }
                ]
            }
        },
        {
            ip: '10.0.0.1',
            mask: '255.255.255.0',
            maskType: 'default',
            subnetsQuantity: 2,
            result: {
                given: {
                    type: 'default',
                    ip: '10.0.0.1',
                    mask: '255.255.255.0',
                    maskType: 'default',
                    subnetsQuantity: 2
                },
                result: [
                    {
                        networkAddress: {
                            ip: [10, 0, 0, 0],
                            decimal: 167772160,
                            binary: ['00001010', '00000000', '00000000', '00000000'],
                            dotted: '10.0.0.0'
                        },
                        broadcastAddress: {
                            ip: [10, 0, 0, 127],
                            decimal: 167772287,
                            binary: ['00001010', '00000000', '00000000', '01111111'],
                            dotted: '10.0.0.127'
                        },
                        ipMask: {
                            ip: [255, 255, 255, 128],
                            decimal: 4294967168,
                            binary: ['11111111', '11111111', '11111111', '10000000'],
                            dotted: '255.255.255.128'
                        },
                        hosts: {
                            first: {
                                ip: [10, 0, 0, 1],
                                decimal: 167772161,
                                binary: ['00001010', '00000000', '00000000', '00000001'],
                                dotted: '10.0.0.1'
                            },
                            last: {
                                ip: [10, 0, 0, 126],
                                decimal: 167772286,
                                binary: ['00001010', '00000000', '00000000', '01111110'],
                                dotted: '10.0.0.126'
                            },
                            quantity: 126
                        }
                    },
                    {
                        networkAddress: {
                            ip: [10, 0, 0, 128],
                            decimal: 167772288,
                            binary: ['00001010', '00000000', '00000000', '10000000'],
                            dotted: '10.0.0.128'
                        },
                        broadcastAddress: {
                            ip: [10, 0, 0, 255],
                            decimal: 167772415,
                            binary: ['00001010', '00000000', '00000000', '11111111'],
                            dotted: '10.0.0.255'
                        },
                        ipMask: {
                            ip: [255, 255, 255, 128],
                            decimal: 4294967168,
                            binary: ['11111111', '11111111', '11111111', '10000000'],
                            dotted: '255.255.255.128'
                        },
                        hosts: {
                            first: {
                                ip: [10, 0, 0, 129],
                                decimal: 167772289,
                                binary: ['00001010', '00000000', '00000000', '10000001'],
                                dotted: '10.0.0.129'
                            },
                            last: {
                                ip: [10, 0, 0, 254],
                                decimal: 167772414,
                                binary: ['00001010', '00000000', '00000000', '11111110'],
                                dotted: '10.0.0.254'
                            },
                            quantity: 126
                        }
                    }
                ]
            }
        }
    ],
    fail: [
        {
            ip: '10.0.0.1',
            mask: '24',
            result: 400
        },
        {
            ip: '10.0.0.1',
            subnetsHostQuantity: 'adadasfdfa',
            mask: '33',
            result: 400
        },
        {
            ip: '10.0.0.1',
            subnetsQuantity: 1,
            mask: '24',
            result: 400
        },
        {
            ip: '10.0.0.1',
            subnetsQuantity: 'adadasfdfa',
            mask: '24',
            result: 400
        },
        {
            ip: '10.0.0.1',
            subnetsQuantity: '129',
            mask: '24',
            result: 400
        },
        {
            ip: '10.0.0.1',
            mask: '24',
            subnetsHostQuantity: 126,
            type: 'shorthand',
            result: 400
        },
        {
            ip: '-1',
            mask: '24',
            type: 'decimal',
            subnetsHostQuantity: 126,
            result: 400
        },
        {
            ip: '-1',
            mask: '24',
            type: 'binary',
            subnetsHostQuantity: 126,
            result: 400
        },
        {
            ip: '10.0.0.1',
            mask: '33',
            maskType: 'decimal',
            result: 400
        },
        {
            ip: '10.0.0.1',
            mask: '24',
            subnetsQuantity: 1,
            maskType: 'decimal',
            result: 400
        },
        {
            mask: '32',
            maskType: 'decimal',
            result: 400
        }
    ]
};

export const ipsToGetSubnetsVLSMResponse: SubnetVLSMTestsDataType = {
    success: [
        {
            ip: '10.0.0.1',
            mask: 24,
            type: 'default',
            hostQuantities: [10, 10],
            result: {
                given: {
                    ip: '10.0.0.1',
                    mask: 24,
                    type: 'default',
                    maskType: 'shorthand',
                    hostQuantities: [10, 10]
                },
                result: [
                    {
                        networkAddress: {
                            ip: [10, 0, 0, 0],
                            decimal: 167772160,
                            binary: ['00001010', '00000000', '00000000', '00000000'],
                            dotted: '10.0.0.0'
                        },
                        broadcastAddress: {
                            ip: [10, 0, 0, 15],
                            decimal: 167772175,
                            binary: ['00001010', '00000000', '00000000', '00001111'],
                            dotted: '10.0.0.15'
                        },
                        ipMask: {
                            ip: [255, 255, 255, 240],
                            decimal: 4294967280,
                            binary: ['11111111', '11111111', '11111111', '11110000'],
                            dotted: '255.255.255.240'
                        },
                        hosts: {
                            first: {
                                ip: [10, 0, 0, 1],
                                decimal: 167772161,
                                binary: ['00001010', '00000000', '00000000', '00000001'],
                                dotted: '10.0.0.1'
                            },
                            last: {
                                ip: [10, 0, 0, 14],
                                decimal: 167772174,
                                binary: ['00001010', '00000000', '00000000', '00001110'],
                                dotted: '10.0.0.14'
                            },
                            quantity: 14
                        }
                    },
                    {
                        networkAddress: {
                            ip: [10, 0, 0, 16],
                            decimal: 167772176,
                            binary: ['00001010', '00000000', '00000000', '00010000'],
                            dotted: '10.0.0.16'
                        },
                        broadcastAddress: {
                            ip: [10, 0, 0, 31],
                            decimal: 167772191,
                            binary: ['00001010', '00000000', '00000000', '00011111'],
                            dotted: '10.0.0.31'
                        },
                        ipMask: {
                            ip: [255, 255, 255, 240],
                            decimal: 4294967280,
                            binary: ['11111111', '11111111', '11111111', '11110000'],
                            dotted: '255.255.255.240'
                        },
                        hosts: {
                            first: {
                                ip: [10, 0, 0, 17],
                                decimal: 167772177,
                                binary: ['00001010', '00000000', '00000000', '00010001'],
                                dotted: '10.0.0.17'
                            },
                            last: {
                                ip: [10, 0, 0, 30],
                                decimal: 167772190,
                                binary: ['00001010', '00000000', '00000000', '00011110'],
                                dotted: '10.0.0.30'
                            },
                            quantity: 14
                        }
                    }
                ]
            }
        },
        {
            ip: '10.0.0.1',
            mask: 24,
            type: 'default',
            hostQuantities: [126, 126],
            result: {
                given: {
                    ip: '10.0.0.1',
                    mask: 24,
                    type: 'default',
                    maskType: 'shorthand',
                    hostQuantities: [126, 126]
                },
                result: [
                    {
                        networkAddress: {
                            ip: [10, 0, 0, 0],
                            decimal: 167772160,
                            binary: ['00001010', '00000000', '00000000', '00000000'],
                            dotted: '10.0.0.0'
                        },
                        broadcastAddress: {
                            ip: [10, 0, 0, 127],
                            decimal: 167772287,
                            binary: ['00001010', '00000000', '00000000', '01111111'],
                            dotted: '10.0.0.127'
                        },
                        ipMask: {
                            ip: [255, 255, 255, 128],
                            decimal: 4294967168,
                            binary: ['11111111', '11111111', '11111111', '10000000'],
                            dotted: '255.255.255.128'
                        },
                        hosts: {
                            first: {
                                ip: [10, 0, 0, 1],
                                decimal: 167772161,
                                binary: ['00001010', '00000000', '00000000', '00000001'],
                                dotted: '10.0.0.1'
                            },
                            last: {
                                ip: [10, 0, 0, 126],
                                decimal: 167772286,
                                binary: ['00001010', '00000000', '00000000', '01111110'],
                                dotted: '10.0.0.126'
                            },
                            quantity: 126
                        }
                    },
                    {
                        networkAddress: {
                            ip: [10, 0, 0, 128],
                            decimal: 167772288,
                            binary: ['00001010', '00000000', '00000000', '10000000'],
                            dotted: '10.0.0.128'
                        },
                        broadcastAddress: {
                            ip: [10, 0, 0, 255],
                            decimal: 167772415,
                            binary: ['00001010', '00000000', '00000000', '11111111'],
                            dotted: '10.0.0.255'
                        },
                        ipMask: {
                            ip: [255, 255, 255, 128],
                            decimal: 4294967168,
                            binary: ['11111111', '11111111', '11111111', '10000000'],
                            dotted: '255.255.255.128'
                        },
                        hosts: {
                            first: {
                                ip: [10, 0, 0, 129],
                                decimal: 167772289,
                                binary: ['00001010', '00000000', '00000000', '10000001'],
                                dotted: '10.0.0.129'
                            },
                            last: {
                                ip: [10, 0, 0, 254],
                                decimal: 167772414,
                                binary: ['00001010', '00000000', '00000000', '11111110'],
                                dotted: '10.0.0.254'
                            },
                            quantity: 126
                        }
                    }
                ]
            }
        },
        {
            ip: '10.0.0.1',
            mask: 24,
            type: 'default',
            hostQuantities: [1, 1, 1],
            result: {
                given: {
                    ip: '10.0.0.1',
                    mask: 24,
                    type: 'default',
                    maskType: 'shorthand',
                    hostQuantities: [1, 1, 1]
                },
                result: [
                    {
                        networkAddress: {
                            ip: [10, 0, 0, 0],
                            decimal: 167772160,
                            binary: ['00001010', '00000000', '00000000', '00000000'],
                            dotted: '10.0.0.0'
                        },
                        broadcastAddress: {
                            ip: [10, 0, 0, 3],
                            decimal: 167772163,
                            binary: ['00001010', '00000000', '00000000', '00000011'],
                            dotted: '10.0.0.3'
                        },
                        ipMask: {
                            ip: [255, 255, 255, 252],
                            decimal: 4294967292,
                            binary: ['11111111', '11111111', '11111111', '11111100'],
                            dotted: '255.255.255.252'
                        },
                        hosts: {
                            first: {
                                ip: [10, 0, 0, 1],
                                decimal: 167772161,
                                binary: ['00001010', '00000000', '00000000', '00000001'],
                                dotted: '10.0.0.1'
                            },
                            last: {
                                ip: [10, 0, 0, 2],
                                decimal: 167772162,
                                binary: ['00001010', '00000000', '00000000', '00000010'],
                                dotted: '10.0.0.2'
                            },
                            quantity: 2
                        }
                    },
                    {
                        networkAddress: {
                            ip: [10, 0, 0, 4],
                            decimal: 167772164,
                            binary: ['00001010', '00000000', '00000000', '00000100'],
                            dotted: '10.0.0.4'
                        },
                        broadcastAddress: {
                            ip: [10, 0, 0, 7],
                            decimal: 167772167,
                            binary: ['00001010', '00000000', '00000000', '00000111'],
                            dotted: '10.0.0.7'
                        },
                        ipMask: {
                            ip: [255, 255, 255, 252],
                            decimal: 4294967292,
                            binary: ['11111111', '11111111', '11111111', '11111100'],
                            dotted: '255.255.255.252'
                        },
                        hosts: {
                            first: {
                                ip: [10, 0, 0, 5],
                                decimal: 167772165,
                                binary: ['00001010', '00000000', '00000000', '00000101'],
                                dotted: '10.0.0.5'
                            },
                            last: {
                                ip: [10, 0, 0, 6],
                                decimal: 167772166,
                                binary: ['00001010', '00000000', '00000000', '00000110'],
                                dotted: '10.0.0.6'
                            },
                            quantity: 2
                        }
                    },
                    {
                        networkAddress: {
                            ip: [10, 0, 0, 8],
                            decimal: 167772168,
                            binary: ['00001010', '00000000', '00000000', '00001000'],
                            dotted: '10.0.0.8'
                        },
                        broadcastAddress: {
                            ip: [10, 0, 0, 11],
                            decimal: 167772171,
                            binary: ['00001010', '00000000', '00000000', '00001011'],
                            dotted: '10.0.0.11'
                        },
                        ipMask: {
                            ip: [255, 255, 255, 252],
                            decimal: 4294967292,
                            binary: ['11111111', '11111111', '11111111', '11111100'],
                            dotted: '255.255.255.252'
                        },
                        hosts: {
                            first: {
                                ip: [10, 0, 0, 9],
                                decimal: 167772169,
                                binary: ['00001010', '00000000', '00000000', '00001001'],
                                dotted: '10.0.0.9'
                            },
                            last: {
                                ip: [10, 0, 0, 10],
                                decimal: 167772170,
                                binary: ['00001010', '00000000', '00000000', '00001010'],
                                dotted: '10.0.0.10'
                            },
                            quantity: 2
                        }
                    }
                ]
            }
        }
    ],
    fail: [
        {
            mask: '32',
            maskType: 'decimal',
            result: 400
        },
        {
            ip: '10.0.0.1',
            maskType: 'decimal',
            result: 400
        },
        {
            ip: '10.0.0.1',
            result: 400
        },
        {
            mask: '24',
            result: 400
        },
        {
            ip: '10.0.0.1',
            mask: '24',
            hostQuantities: [10, 'ab'],
            result: 400
        },
        {
            ip: '10.0.0.1',
            mask: '24',
            hostQuantities: [0, 10],
            result: 400
        },
        {
            ip: '10.0.0.1',
            mask: '24',
            hostQuantities: [128, 0],
            result: 400
        },
        {
            ip: '10.0.0.1',
            mask: '24',
            hostQuantities: [128, 126],
            result: 400
        },
        {
            ip: '10.0.0.1',
            mask: '24',
            hostQuantities: [10],
            result: 400
        },
        {
            ip: '10.0.0.1',
            mask: '24',
            hostQuantities: { success: true },
            result: 400
        }
    ]
};

export const ipsToRecognizeClass: RecogniseClassTestsDataType = {
    success: [
        {
            ip: '10.0.0.1',
            type: 'default',
            result: { given: { ip: '10.0.0.1', type: 'default' }, recognisedClass: ipClasses[0] }
        },
        {
            ip: '128.1.3.1',
            type: 'default',
            result: { given: { ip: '128.1.3.1', type: 'default' }, recognisedClass: ipClasses[1] }
        },
        {
            ip: '192.168.0.1',
            type: 'default',
            result: { given: { ip: '192.168.0.1', type: 'default' }, recognisedClass: ipClasses[2] }
        },
        {
            ip: '224.1.1.1',
            type: 'default',
            result: { given: { ip: '224.1.1.1', type: 'default' }, recognisedClass: ipClasses[3] }
        },
        {
            ip: '254.0.0.1',
            type: 'default',
            result: { given: { ip: '254.0.0.1', type: 'default' }, recognisedClass: ipClasses[4] }
        },
        {
            ip: '255.0.0.0',
            type: 'default',
            result: { given: { ip: '255.0.0.0', type: 'default' }, recognisedClass: false }
        },
        {
            ip: '127.0.0.1',
            type: 'default',
            result: { given: { ip: '127.0.0.1', type: 'default' }, recognisedClass: false }
        },

        {
            ip: '24',
            type: 'shorthand',
            result: { given: { ip: '24', type: 'shorthand' }, recognisedClass: false }
        },
        {
            ip: '167772161',
            type: 'decimal',
            result: {
                given: { ip: '167772161', type: 'decimal' },
                recognisedClass: ipClasses[0]
            }
        },
        {
            ip: '00001010000000000000000000000001',
            type: 'binary',
            result: {
                given: { ip: '00001010000000000000000000000001', type: 'binary' },
                recognisedClass: ipClasses[0]
            }
        }
    ],
    fail: [...ipsToBinary.fail]
};
