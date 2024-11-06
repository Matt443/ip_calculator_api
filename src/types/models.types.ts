export type IpAddressType = {
    firstOctet: number;
    secondOctet: number;
    thirdOctet: number;
    fourthOctet: number;
};

export type IpMaskType = {
    firstOctet: number;
    secondOctet: number;
    thirdOctet: number;
    fourthOctet: number;
    shorthand: number;
};

export type IpClassType = {
    ipMin: IpAddressType;
    ipMax: IpAddressType;
    className: string;
};
