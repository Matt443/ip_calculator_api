export type IpAddressType = {
    firstOctet: number;
    secondOctet: number;
    thirdOctet: number;
    fourthOctet: number;
};

export type IpAddresBinaryType = {
    firstOctet: string;
    secondOctet: string;
    thirdOctet: string;
    fourthOctet: string;
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
