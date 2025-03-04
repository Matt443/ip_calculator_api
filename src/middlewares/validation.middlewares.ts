import type { NextFunction, Request, Response } from 'express';
import { IpFormatType } from '@/types/ip.types.js';
import { ipAddressTypeValidation, possibleShorthandValidation } from '@/utils/validation.util.js';
import { sendError } from '@/utils/error.util.js';
import { anyIp } from '@/strategies/anyIp.strategies.js';
import { getIpAndMask, getQueryParam } from '@/utils/api.util.js';
import { givenDataAll } from '@/types/api.types.js';

export async function ipToConvertValidation(req: Request, res: Response, next: NextFunction) {
    const type = getQueryParam(
        req.query as unknown as givenDataAll,
        'type',
        'default'
    ) as IpFormatType;
    const ip = getQueryParam(req.query as unknown as givenDataAll, 'ip');

    if (!type || !ip) return sendError(res, 400, 'Bad Request');
    // //Checking if given type and ip is correct
    if (!ipAddressTypeValidation(type) || !anyIp[type].validate(ip))
        return sendError(res, 400, 'Bad Request');
    next();
}

export async function ipAndMaskValidation(req: Request, res: Response, next: NextFunction) {
    const { type, ip, ipMask, maskType } = getIpAndMask(req.query);

    if (!type || !ip || !ipMask || !maskType) return sendError(res, 400, 'Bad Request');
    // //Checking if given type and ip is correct
    if (
        !ipAddressTypeValidation(maskType) ||
        !ipAddressTypeValidation(type) ||
        !anyIp[type].validate(ip) ||
        !anyIp[maskType].validate(ipMask)
    )
        return sendError(res, 400, 'Bad Request');
    next();
}

export async function maskValidation(req: Request, res: Response, next: NextFunction) {
    const type = getQueryParam(
        req.query as unknown as givenDataAll,
        'type',
        'shorthand'
    ) as IpFormatType;
    const ipMask = getQueryParam(req.query as unknown as givenDataAll, 'mask');

    if (!type || !ipMask) return sendError(res, 400, 'Bad Request');
    console.log(!ipAddressTypeValidation(type) || !anyIp[type].validate(ipMask));
    if (!ipAddressTypeValidation(type) || !anyIp[type].validate(ipMask)) {
        return sendError(res, 400, 'Bad Request');
    }

    const maskMerged: string = anyIp[type].toBinary(ipMask).join('');

    if (!possibleShorthandValidation(maskMerged)) return sendError(res, 400, 'Bad Request');
    next();
}
