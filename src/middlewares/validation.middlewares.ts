import type { NextFunction, Request, Response } from 'express';
import { IpAnyFormatType, IpFormatType } from '@/types/ip.types.js';
import { ipAddressTypeValidation } from '@/utils/validation.util.js';
import { sendError } from '@/utils/error.util.js';
import { anyIp } from '@/strategies/anyIp.strategies.js';

export async function ipToConvertValidation(req: Request, res: Response, next: NextFunction) {
    const ip = req.query.ip as IpAnyFormatType;
    let type: IpFormatType = 'default';
    //Checking if value has been given
    if (ip === undefined) return sendError(res, 400, 'Bad Request');

    //Checking if type is given
    if (req.query.type !== undefined) type = String(req.query.type) as IpFormatType;

    //Checking if given type and ip is correct
    if (!ipAddressTypeValidation(type) || !anyIp[type].validate(ip))
        return sendError(res, 400, 'Bad Request');
    next();
}
