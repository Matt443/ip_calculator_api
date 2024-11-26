import { anyIp } from '@/strategies/anyIp.strategies.js';
import { ResponseIpConversion } from '@/types/api.types.js';
import { IpAddresBinaryType, IpFormatType } from '@/types/ip.types.js';
import { Request, Response, NextFunction } from 'express';

export default {
    async getBinary(req: Request, res: Response, next: NextFunction) {
        let type: IpFormatType = 'default';
        if (req.query.type !== undefined) type = req.query.type as IpFormatType;
        const ip = req.query.ip as string;
        const ipBinary: IpAddresBinaryType = anyIp[type].toBinary(ip);

        const response: ResponseIpConversion = {
            given: String(ip),
            result: {
                joined: ipBinary.join('.'),
                separated: ipBinary
            }
        };

        res.send(response).status(200);
    },
    async getDecimal(req: Request, res: Response, next: NextFunction) {
        if (req.query.ip === undefined) return next();
        res.send('Hello decimal world').status(200);
    },
    async getDefault(req: Request, res: Response, next: NextFunction) {
        if (req.query.ip === undefined) return next();
        res.send('Hello default world').status(200);
    }
};
