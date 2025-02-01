import { getNetworkAddress } from '@/services/ipCalculations.service.js';
import { anyIp } from '@/strategies/anyIp.strategies.js';
import { givenDataAll } from '@/types/api.types.js';
import { IpFormatType } from '@/types/ip.types.js';
import { createApiResponse, getQueryParam } from '@/utils/api.util.js';
import { createAddressConversions } from '@/utils/calculating.util.js';
import { sendError } from '@/utils/error.util.js';

import { Request, Response, NextFunction } from 'express';

export default {
    async getNetworkAddress(req: Request, res: Response, next: NextFunction) {
        const type = getQueryParam(
            req.query as unknown as givenDataAll,
            'type',
            'default'
        ) as IpFormatType;
        const ip = getQueryParam(req.query as unknown as givenDataAll, 'ip') as string;
        const ipMask = getQueryParam(req.query as unknown as givenDataAll, 'mask') as string;
        const maskType = getQueryParam(
            req.query as unknown as givenDataAll,
            'maskType',
            'shorthand'
        ) as IpFormatType;

        const convertedMask = anyIp[maskType].toDefault(ipMask);
        const convertedIp = anyIp[type].toDefault(ip);
        const networkAddress = getNetworkAddress(convertedIp, convertedMask);
        const response = createApiResponse(
            { ip, mask: ipMask },
            createAddressConversions(networkAddress)
        );

        res.send(response);
    }
};
