import { IpClassType } from '@/types/ip.types.js';

export const supportedIpFormats: string[] = ['decimal', 'default', 'binary'];

export const ipClasses: IpClassType[] = [
    {
        name: 'A',
        min: [1, 0, 0, 0],
        max: [126, 255, 255, 255],
        defaultMask: [255, 0, 0, 0],
        hostQuantity: 16777214
    },
    {
        name: 'B',
        min: [128, 0, 0, 0],
        max: [191, 255, 255, 255],
        defaultMask: [255, 255, 0, 0],
        hostQuantity: 65534
    },
    {
        name: 'C',
        min: [192, 0, 0, 0],
        max: [223, 255, 255, 255],
        defaultMask: [255, 255, 255, 0],
        hostQuantity: 254
    },
    {
        name: 'D',
        min: [224, 0, 0, 0],
        max: [239, 255, 255, 255],
        defaultMask: [],
        hostQuantity: -1
    },
    {
        name: 'E',
        min: [240, 0, 0, 0],
        max: [254, 255, 255, 255],
        defaultMask: [],
        hostQuantity: -1
    }
];
