import { ERROR_MESSAGES } from '@/constant/errors.constants.js';
import { ipClasses } from '@/constant/supported.constants.js';
import { IpAddressType, NetworkInfoType, subnetSettingType } from '@/types/ip.types';
import { IpClassType } from '@/types/ip.types.js';
import {
    calculateAddress,
    calculateProperHostQuantity,
    calculateShorthand,
    createAddressConversions,
    getAllSubnets,
    getAllSubnetsVLSM,
    getMasksVLSM,
    getSubnetsQuantity,
    ipBinaryToDefault,
    isIpInRange,
    moveInAddress,
    newMaskForSubnet
} from '@/utils/calculating.util.js';
import {
    ipAddressValidation,
    subnetsPossibleValidation,
    VLSMSubnetsPossibleValidation
} from '@/utils/validation.util.js';

/**
 *
 * @param {IpAddressType} ipAddress
 * @param {IpAddressType} ipMask
 * @returns {IpAddressType} - network address for given ip and mask
 */
export function getNetworkAddress(ipAddress: IpAddressType, ipMask: IpAddressType): IpAddressType {
    if (!ipAddressValidation(ipAddress) || !ipAddressValidation(ipMask))
        throw Error(ERROR_MESSAGES.validation.ipAddrress);

    return calculateAddress(ipAddress, ipMask, '0', 0);
}

/**
 *
 * @param {IpAddressType} ipAddress
 * @param {IpAddressType} ipMask
 * @returns {IpAddressType} - broadcast address for given ip and mask
 */
export function getBroadcastAddress(
    ipAddress: IpAddressType,
    ipMask: IpAddressType
): IpAddressType {
    if (!ipAddressValidation(ipAddress) || !ipAddressValidation(ipMask))
        throw Error(ERROR_MESSAGES.validation.ipAddrress);

    return calculateAddress(ipAddress, ipMask, '1', 255);
}

/**
 *
 * @param {IpAddressType} ipMask
 * @returns number of hosts
 */
export function getNumberOfHosts(ipMask: IpAddressType): number {
    if (!ipAddressValidation(ipMask)) throw Error(ERROR_MESSAGES.validation.ipAddrress);

    const quantityOfZeros: number = 32 - calculateShorthand(ipMask);

    if (quantityOfZeros === 0 || quantityOfZeros === 1) return 0;

    return Math.pow(2, quantityOfZeros) - 2;
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
    if (!ipAddressValidation(ipAddress) || !ipAddressValidation(ipMask))
        throw Error(ERROR_MESSAGES.validation.ipAddrress);
    const maskShorthand = calculateShorthand(ipMask);
    subnetsQuantity = getSubnetsQuantity({ subnetsHostQuantity, subnetsQuantity }, ipMask);

    if (subnetsQuantity === -1 || !subnetsPossibleValidation(ipMask, subnetsQuantity)) return [];

    const newMaskBinary = newMaskForSubnet(ipMask, subnetsQuantity, maskShorthand);

    const newMask: IpAddressType = ipBinaryToDefault(newMaskBinary);

    ipAddress = getNetworkAddress(ipAddress, ipMask);
    return getAllSubnets(ipAddress, newMask, subnetsQuantity);
}

/**
 *
 * @param {IpAddressType} ipAddress
 * @param {IpAddressType} ipMask
 * @param {number[]} hostQuantities
 * @returns {NetworkInfoType[]} an object with complete information of subnets
 */
export function getSubnetsVLSM(
    ipAddress: IpAddressType,
    ipMask: IpAddressType,
    hostQuantities: number[]
): NetworkInfoType[] {
    if (!ipAddressValidation(ipAddress) || !ipAddressValidation(ipMask))
        throw Error(ERROR_MESSAGES.validation.ipAddrress);

    const { requestedHostQuantity, maxHosts, subnetsSettingsVLSM } = calculateProperHostQuantity(
        hostQuantities,
        ipMask
    );

    if (!VLSMSubnetsPossibleValidation(requestedHostQuantity, maxHosts)) return [];
    const masks: IpAddressType[] = getMasksVLSM(subnetsSettingsVLSM, true);

    return getAllSubnetsVLSM(ipAddress, masks);
}

/**
 *
 * @param {IpAddressType} ipAddress
 * @param {IpAddressType} ipMask
 * @returns {NetworkInfoType} complete info about a network
 */
export function getSingleNetwork(ipAddress: IpAddressType, ipMask: IpAddressType): NetworkInfoType {
    if (!ipAddressValidation(ipAddress) || !ipAddressValidation(ipMask))
        throw Error(ERROR_MESSAGES.validation.ipAddrress);

    const networkAddress: IpAddressType = getNetworkAddress(ipAddress, ipMask);
    const broadcastAddress: IpAddressType = getBroadcastAddress(ipAddress, ipMask);
    const hostQuantity: number = getNumberOfHosts(ipMask);
    const hosts = {
        first: moveInAddress(true, networkAddress),
        last: moveInAddress(false, broadcastAddress)
    };
    const networkInfo: NetworkInfoType = {
        networkAddress: createAddressConversions(networkAddress),
        broadcastAddress: createAddressConversions(broadcastAddress),
        ipMask: createAddressConversions(ipMask),
        hosts: {
            quantity: hostQuantity
        }
    };

    if (hostQuantity > 0) {
        networkInfo.hosts.first = createAddressConversions(hosts.first);
        networkInfo.hosts.last = createAddressConversions(hosts.last);
    }

    return networkInfo;
}

/**
 *
 * @param {IpAddressType} ipAddress
 * @returns {IpAddressType | false} about details about recognised class, if class not recognised returns false
 */
export function recogniseClass(ipAddress: IpAddressType): IpClassType | false {
    if (!ipAddressValidation(ipAddress)) throw Error(ERROR_MESSAGES.validation.ipAddrress);

    let found = false;
    let index = 0;

    while (!found && index < ipClasses.length) {
        found = isIpInRange(ipAddress, ipClasses[index].min, ipClasses[index].max);
        index++;
    }

    if (!found) return false;

    return ipClasses[index - 1];
}
