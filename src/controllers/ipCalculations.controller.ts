import {
    getBroadcastAddress,
    getNetworkAddress,
    getNumberOfHosts,
    getSingleNetwork
} from '@/services/ipCalculations.service.js';
import { anyIp } from '@/strategies/anyIp.strategies.js';
import { givenDataAll } from '@/types/api.types.js';
import { IpFormatType } from '@/types/ip.types.js';
import { getIpAndMask, getQueryParam } from '@/utils/api.util.js';
import {
    createAddressConversions,
    ipToBinary,
    shorthandToDefault
} from '@/utils/calculating.util.js';
import { sendError } from '@/utils/error.util.js';
import { possibleShorthandValidation } from '@/utils/validation.util';

import { Request, Response, NextFunction } from 'express';

export default {
    async getNetworkAddress(req: Request, res: Response, next: NextFunction) {
        const { type, ip, ipMask, maskType } = getIpAndMask(req.query);

        const convertedMask = anyIp[maskType].toDefault(ipMask);
        const convertedIp = anyIp[type].toDefault(ip);
        const networkAddress = getNetworkAddress(convertedIp, convertedMask);
        const response = {
            given: { ip, mask: ipMask },
            result: createAddressConversions(networkAddress)
        };

        res.send(response);
    },
    async getBroadcastAddress(req: Request, res: Response, next: NextFunction) {
        const { type, ip, ipMask, maskType } = getIpAndMask(req.query);

        const convertedMask = anyIp[maskType].toDefault(ipMask);
        const convertedIp = anyIp[type].toDefault(ip);
        const broadcastAddress = getBroadcastAddress(convertedIp, convertedMask);
        const response = {
            given: { ip, mask: ipMask },
            result: createAddressConversions(broadcastAddress)
        };

        res.send(response);
    },
    async getNumberOfHosts(req: Request, res: Response, next: NextFunction) {
        const type = getQueryParam(
            req.query as unknown as givenDataAll,
            'type',
            'shorthand'
        ) as IpFormatType;
        const mask = getQueryParam(req.query as unknown as givenDataAll, 'mask') as string;

        const convertedMask = anyIp[type].toDefault(mask);
        const hostQuantity = getNumberOfHosts(convertedMask);

        res.send({ given: { type, mask }, result: { hostQuantity } });
    },
    async getNetworkInfo(req: Request, res: Response, next: NextFunction) {
        const { type, ip, ipMask, maskType } = getIpAndMask(req.query);

        const maskDefault = anyIp[maskType].toDefault(ipMask);
        const ipDefault = anyIp[type].toDefault(ip);
        const response = {
            given: { type, ip, ipMask, maskType },
            result: getSingleNetwork(ipDefault, maskDefault)
        };
        res.send(response);
    }
};
