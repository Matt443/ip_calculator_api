import { ERROR_MESSAGES } from '@/constant/errors.constants.js';
import {
    IpAddresBinaryType,
    IpAddressType,
    NetworkInfoType,
    subnetSettingType,
    subnetSettingVLSM_Type
} from '@/types/ip.types';
import {
    binaryMergedToUnmerged,
    calculateAdress,
    calculateNumberOfHostsVLSM,
    calculateShorthand,
    calculateSubnetsQuantity,
    concatBinary,
    findNextHostQuantity,
    getAllSubnets,
    getAllSubnetsVLSM,
    getMasksVLSM,
    getMaxSubnets,
    ipBinaryToDefault,
    ipToBinary,
    newMaskForSubnet,
    toBinary,
    whereZerosStart
} from '@/utils/calculating.util.js';
import { replaceInString } from '@/utils/common';
import { ipAddressValidation, isInRange, powerOf } from '@/utils/validation.util.js';

/**
 *
 * @param {IpAddressType} ipAdress
 * @param {IpAddressType} ipMask
 * @returns {IpAddressType} - network address for given ip and mask
 */
export function getNetworkAddress(ipAddress: IpAddressType, ipMask: IpAddressType): IpAddressType {
    if (!ipAddressValidation(ipAddress) || !ipAddressValidation(ipMask))
        throw Error(ERROR_MESSAGES.validation.ipAdrress);

    return calculateAdress(ipAddress, ipMask, '0', 0);
}

/**
 *
 * @param {IpAddressType} ipAdress
 * @param {IpAddressType} ipMask
 * @returns {IpAddressType} - broadcast address for given ip and mask
 */
export function getBroadcastAddress(
    ipAddress: IpAddressType,
    ipMask: IpAddressType
): IpAddressType {
    if (!ipAddressValidation(ipAddress) || !ipAddressValidation(ipMask))
        throw Error(ERROR_MESSAGES.validation.ipAdrress);

    return calculateAdress(ipAddress, ipMask, '1', 255);
}

/**
 *
 * @param {IpAddressType} ipMask
 * @returns number of hosts
 */
export function getNumberOfHosts(ipMask: IpAddressType): number {
    if (!ipAddressValidation(ipMask)) throw Error(ERROR_MESSAGES.validation.ipAdrress);

    const quantityOfZeros: number = 32 - calculateShorthand(ipMask);

    if (quantityOfZeros === 0 || quantityOfZeros === 1) return 0;

    return Math.pow(2, quantityOfZeros) - 2;
}

/**
 *
 * @param {IpAddressType} ipAddres
 * @param {IpAddressType} ipMask
 * @param {IpAddressType} rangeMin
 * @param {IpAddressType} rangeMax
 * @returns {boolean} true if is in range
 */
export function isIpInRange(
    ipAddres: IpAddressType,
    ipMask: IpAddressType,
    rangeMin: IpAddressType,
    rangeMax: IpAddressType
): boolean {
    const whereToStart: number = whereZerosStart(ipMask);

    let currentIndex = 0;
    return ipAddres.slice(whereToStart, 4).every((octet: number, index: number) => {
        currentIndex = whereToStart + index;
        return isInRange(octet, rangeMin[currentIndex], rangeMax[currentIndex]);
    });
}

/**
 *
 * @param {IpAddressType} ipAddress
 * @param {IpAddressType} ipMask
 * @param {subnetSettingType} subnetsSetting
 * @returns {NetworkInfoType[]} all subnets with certain amount of hosts or certain amount of subnets
 */
export function getSubnets(
    ipAddress: IpAddressType,
    ipMask: IpAddressType,
    { subnetsHostQuantity, subnetsQuantity }: subnetSettingType
): NetworkInfoType[] {
    const maxPossibleSubnets = getMaxSubnets(ipMask);
    const maskShorthand = calculateShorthand(ipMask);

    if (typeof subnetsQuantity === 'undefined') {
        subnetsQuantity = calculateSubnetsQuantity(subnetsHostQuantity, ipMask);
    }

    if (subnetsQuantity > maxPossibleSubnets) return [];

    const newMaskBinary = newMaskForSubnet(ipMask, subnetsQuantity, maskShorthand);

    const newMask: IpAddressType = ipBinaryToDefault(newMaskBinary);

    ipAddress = getNetworkAddress(ipAddress, ipMask);

    return getAllSubnets(ipAddress, newMask, subnetsQuantity);
}

/**
 *
 * @param {IpAddressType} ipAddres
 * @param {IpAddressType} ipMask
 * @param {number[]} hostQuantities
 * @returns {NetworkInfoType[]} an object with complete information of subnets
 */
export function getSubnetsVLSM(
    ipAddres: IpAddressType,
    ipMask: IpAddressType,
    hostQuantities: number[]
): NetworkInfoType[] {
    const maxHosts = getNumberOfHosts(ipMask);
    const subnetsSettingsVLSM = calculateNumberOfHostsVLSM(hostQuantities);

    subnetsSettingsVLSM.sort((a, b) => a.power - b.power).reverse();

    let initialValue = 0;
    const requestedHostQuantity = subnetsSettingsVLSM.reduce(
        (accumulator, currentValue) => accumulator + currentValue.hostQuantity,
        initialValue
    );

    if (requestedHostQuantity - 2 > maxHosts) return [];
    const masks: IpAddressType[] = getMasksVLSM(subnetsSettingsVLSM);

    return getAllSubnetsVLSM(ipAddres, masks);
}
