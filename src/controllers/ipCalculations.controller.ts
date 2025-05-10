import {
    getBroadcastAddress,
    getNetworkAddress,
    getNumberOfHosts,
    getSingleNetwork,
    getSubnets,
    getSubnetsVLSM,
    recogniseClass
} from '@/services/ipCalculations.service.js';
import { anyIp } from '@/strategies/anyIp.strategies.js';
import { AllParamsType } from '@/types/api.types';
import { IpAddressType, IpFormatType, NetworkInfoType } from '@/types/ip.types.js';
import { getIpAndMask, getQueryParam, getSubnetSetup } from '@/utils/api.util.js';
import { createAddressConversions } from '@/utils/calculating.util.js';

import { Request, Response } from 'express';

export default {
    async getNetworkAddress(req: Request, res: Response) {
        const { type, ip, mask, maskType } = getIpAndMask(req.query as unknown as AllParamsType);

        const convertedMask = anyIp[maskType].toDefault(mask);
        const convertedIp = anyIp[type].toDefault(ip);
        const networkAddress = getNetworkAddress(convertedIp, convertedMask);
        const response = {
            given: { ip, mask: mask },
            result: createAddressConversions(networkAddress)
        };

        res.send(response);
    },
    async getBroadcastAddress(req: Request, res: Response) {
        const { type, ip, mask, maskType } = getIpAndMask(req.query as unknown as AllParamsType);

        const convertedMask = anyIp[maskType].toDefault(mask);
        const convertedIp = anyIp[type].toDefault(ip);
        const broadcastAddress = getBroadcastAddress(convertedIp, convertedMask);
        const response = {
            given: { ip, mask: mask },
            result: createAddressConversions(broadcastAddress)
        };

        res.send(response);
    },
    async getNumberOfHosts(req: Request, res: Response) {
        const maskType = getQueryParam(
            req.query as unknown as AllParamsType,
            'type',
            'shorthand'
        ) as IpFormatType;
        const mask = getQueryParam(req.query as unknown as AllParamsType, 'mask') as string;

        const convertedMask = anyIp[maskType].toDefault(mask);
        const hostQuantity = getNumberOfHosts(convertedMask);

        res.send({ given: { maskType, mask }, result: { hostQuantity } });
    },
    async getNetworkInfo(req: Request, res: Response) {
        const { type, ip, mask, maskType } = getIpAndMask(req.query as unknown as AllParamsType);

        const maskDefault = anyIp[maskType].toDefault(mask);
        const ipDefault = anyIp[type].toDefault(ip);
        const response = {
            given: { type, ip, mask, maskType },
            result: getSingleNetwork(ipDefault, maskDefault)
        };
        res.send(response);
    },
    async getSubnets(req: Request, res: Response) {
        const { type, ip, mask, maskType } = getIpAndMask(req.query as unknown as AllParamsType);
        const subnetsSetup = getSubnetSetup(req.query as unknown as AllParamsType);

        const ipConverted = anyIp[type].toDefault(ip);
        const maskConverted = anyIp[maskType].toDefault(mask);
        const subnets = getSubnets(ipConverted, maskConverted, subnetsSetup);

        res.send({ given: { ip, mask, type, maskType, ...subnetsSetup }, result: subnets });
    },
    async getSubnetsVLSM(req: Request, res: Response) {
        const { ip, mask, type, maskType } = getIpAndMask(req.body);
        const hostQuantities = getQueryParam(req.body, 'hostQuantities') as number[];

        const ipConverted = anyIp[type].toDefault(ip);
        const maskConverted = anyIp[maskType].toDefault(mask);
        const subnets: NetworkInfoType[] = getSubnetsVLSM(
            ipConverted,
            maskConverted,
            hostQuantities
        );
        res.send({ given: { ip, mask, type, maskType, hostQuantities }, result: subnets });
    },
    async getIpClass(req: Request, res: Response) {
        const ip = getQueryParam(req.query as unknown as AllParamsType, 'ip') as string;
        const type = getQueryParam(
            req.query as unknown as AllParamsType,
            'type',
            'default'
        ) as IpFormatType;
        const ipConverted: IpAddressType = anyIp[type].toDefault(ip);

        const recognisedClass = recogniseClass(ipConverted);

        const response = { recognisedClass, given: { ip, type } };
        if (!recognisedClass) response.recognisedClass = false;

        res.send(response);
    }
};
