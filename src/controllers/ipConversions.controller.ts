import { anyIp } from '@/strategies/anyIp.strategies.js';
import { ResponseIpConversion } from '@/types/api.types.js';
import { IpAddresBinaryType, IpAddressType, IpFormatType } from '@/types/ip.types.js';
import { ipQueryExtractor } from '@/utils/api.util.js';
import { Request, Response, NextFunction } from 'express';

export default {
    async getBinary(req: Request, res: Response, next: NextFunction) {
        const { ip, type } = ipQueryExtractor(req.query as { ip: string; type: IpFormatType });
        const ipBinary: IpAddresBinaryType = anyIp[type].toBinary(ip);

        const response: ResponseIpConversion = anyIp['binary'].responseForApi(ip, ipBinary);

        res.send(response).status(200);
    },
    async getDecimal(req: Request, res: Response, next: NextFunction) {
        const { ip, type } = ipQueryExtractor(req.query as { ip: string; type: IpFormatType });
        const ipDecimal: number = anyIp[type].toDecimal(ip);

        const response: ResponseIpConversion = anyIp['decimal'].responseForApi(ip, ipDecimal);

        res.send(response).status(200);
    },
    async getDefault(req: Request, res: Response, next: NextFunction) {
        const { ip, type } = ipQueryExtractor(req.query as { ip: string; type: IpFormatType });
        const ipDefault: IpAddressType = anyIp[type].toDefault(ip);

        const response: ResponseIpConversion = anyIp['default'].responseForApi(ip, ipDefault);

        res.send(response).status(200);
    }
};
