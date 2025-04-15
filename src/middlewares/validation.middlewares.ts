import type { NextFunction, Request, Response } from 'express';
import { IpFormatType } from '@/types/ip.types.js';
import {
    ipAddressTypeValidation,
    possibleShorthandValidation,
    subnetsPossibleValidation,
    validationWithRegex
} from '@/utils/validation.util.js';
import { sendError } from '@/utils/error.util.js';
import { anyIp } from '@/strategies/anyIp.strategies.js';
import { getIpAndMask, getQueryParam, getSubnetSetup } from '@/utils/api.util.js';
import { givenDataAll } from '@/types/api.types.js';
import { getSubnetsQuantity } from '@/utils/calculating.util.js';
import fs from 'fs';

export async function ipToConvertValidation(req: Request, res: Response, next: NextFunction) {
    const type = getQueryParam(
        req.query as unknown as givenDataAll,
        'type',
        'default'
    ) as IpFormatType;
    const ip = getQueryParam(req.query as unknown as givenDataAll, 'ip');

    if (!type || !ip) return sendError(res, 400, 'Bad Request');
    // Checking if given type and ip is correct
    if (!ipAddressTypeValidation(type) || !anyIp[type].validate(ip))
        return sendError(res, 400, 'Bad Request');
    next();
}

export async function ipAndMaskValidation(req: Request, res: Response, next: NextFunction) {
    const { type, ip, mask, maskType } = getIpAndMask(
        Object.keys(req.query).length === 0 ? req.body : req.query
    );
    if (!type || !ip || !mask || !maskType) return sendError(res, 400, 'Bad Request');
    // Checking if given type and ip is correct
    if (
        !ipAddressTypeValidation(maskType) ||
        !ipAddressTypeValidation(type) ||
        !anyIp[type].validate(ip) ||
        !anyIp[maskType].validate(mask)
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
    if (!ipAddressTypeValidation(type) || !anyIp[type].validate(ipMask)) {
        return sendError(res, 400, 'Bad Request');
    }

    const maskMerged: string = anyIp[type].toBinary(ipMask).join('');

    if (!possibleShorthandValidation(maskMerged)) return sendError(res, 400, 'Bad Request');
    next();
}

export async function subnetParamsValidation(req: Request, res: Response, next: NextFunction) {
    const subnetSetup = getSubnetSetup(req.body);
    const { mask, maskType } = getIpAndMask(req.body);

    //Checking if minimal one of both is defined
    if (!subnetSetup.subnetsQuantity && !subnetSetup.subnetsHostQuantity)
        return sendError(res, 400, 'Bad Request');
    if (
        subnetSetup.subnetsQuantity &&
        !validationWithRegex(String(subnetSetup.subnetsQuantity), new RegExp('^[0-9]+$'))
    )
        return sendError(res, 400, 'Bad Request');
    if (
        subnetSetup.subnetsHostQuantity &&
        (!validationWithRegex(String(subnetSetup.subnetsHostQuantity), new RegExp('^[0-9]+$')) ||
            subnetSetup.subnetsHostQuantity < 2)
    )
        return sendError(res, 400, 'Bad Request');
    const ipMaskConverted = anyIp[maskType].toDefault(mask);
    subnetSetup.subnetsQuantity = getSubnetsQuantity(subnetSetup, ipMaskConverted);
    if (
        !subnetsPossibleValidation(ipMaskConverted, Number(subnetSetup.subnetsQuantity)) ||
        subnetSetup.subnetsQuantity <= 1
    )
        return sendError(res, 400, 'Bad Request');

    next();
}
