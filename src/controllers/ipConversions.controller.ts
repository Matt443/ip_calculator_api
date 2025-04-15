import { anyIp } from '@/strategies/anyIp.strategies.js';
import { AllParamsType, ResponseTypes } from '@/types/api.types.js';
import { IpAddresBinaryType, IpAddressType, IpFormatType } from '@/types/ip.types.js';
import { getQueryParam } from '@/utils/api.util.js';
import { Request, Response, NextFunction } from 'express';

export default {
    async getBinary(req: Request, res: Response, next: NextFunction) {
        const ip = getQueryParam(req.query as unknown as AllParamsType, 'ip') as string;
        const type = getQueryParam(
            req.query as unknown as AllParamsType,
            'type',
            'default'
        ) as IpFormatType;

        const ipBinary: IpAddresBinaryType = anyIp[type].toBinary(ip);

        const response: ResponseTypes = anyIp['binary'].conversionResponseApi(ip, ipBinary);

        res.send(response).status(200);
    },
    async getDecimal(req: Request, res: Response, next: NextFunction) {
        const ip = getQueryParam(req.query as unknown as AllParamsType, 'ip') as string;
        const type = getQueryParam(
            req.query as unknown as AllParamsType,
            'type',
            'default'
        ) as IpFormatType;

        const ipDecimal: number = anyIp[type].toDecimal(ip);

        const response: ResponseTypes = anyIp['decimal'].conversionResponseApi(ip, ipDecimal);

        res.send(response).status(200);
    },
    async getDefault(req: Request, res: Response, next: NextFunction) {
        const ip = getQueryParam(req.query as unknown as AllParamsType, 'ip') as string;
        const type = getQueryParam(
            req.query as unknown as AllParamsType,
            'type',
            'default'
        ) as IpFormatType;

        const ipDefault: IpAddressType = anyIp[type].toDefault(ip);

        const response: ResponseTypes = anyIp['default'].conversionResponseApi(ip, ipDefault);

        res.send(response).status(200);
    },
    async getShorthand(req: Request, res: Response, next: NextFunction) {
        const ip = getQueryParam(req.query as unknown as AllParamsType, 'ip') as string;
        const type = getQueryParam(
            req.query as unknown as AllParamsType,
            'type',
            'default'
        ) as IpFormatType;

        const ipShorthand: number = anyIp[type].toShorthand(ip);

        const response: ResponseTypes = anyIp['shorthand'].conversionResponseApi(ip, ipShorthand);

        res.send(response).status(200);
    }
};
