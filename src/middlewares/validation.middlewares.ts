import type { NextFunction, Request, Response } from 'express';
import { IpFormatType } from '@/types/ip.types.js';
import {
    ipAddressTypeValidation,
    isInRange,
    possibleShorthandValidation,
    subnetsPossibleValidation,
    validationWithRegex,
    VLSMSubnetsPossibleValidation
} from '@/utils/validation.util.js';
import { sendError } from '@/utils/error.util.js';
import { anyIp } from '@/strategies/anyIp.strategies.js';
import { getIpAndMask, getQueryParam, getSubnetSetup } from '@/utils/api.util.js';
import { calculateProperHostQuantity, getSubnetsQuantity } from '@/utils/calculating.util.js';
import { AllParamsType } from '@/types/api.types.js';

export async function ipValidation(req: Request, res: Response, next: NextFunction) {
    const type = getQueryParam(
        req.query as unknown as AllParamsType,
        'type',
        'default'
    ) as IpFormatType;
    const ip = getQueryParam(req.query as unknown as AllParamsType, 'ip') as string;

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
        req.query as unknown as AllParamsType,
        'type',
        'shorthand'
    ) as IpFormatType;
    const ipMask = getQueryParam(req.query as unknown as AllParamsType, 'mask') as string;

    if (!type || !ipMask) return sendError(res, 400, 'Bad Request');
    if (!ipAddressTypeValidation(type) || !anyIp[type].validate(ipMask)) {
        return sendError(res, 400, 'Bad Request');
    }

    const maskMerged: string = anyIp[type].toBinary(ipMask).join('');

    if (!possibleShorthandValidation(maskMerged)) return sendError(res, 400, 'Bad Request');
    next();
}

export async function subnetParamsValidation(req: Request, res: Response, next: NextFunction) {
    let { subnetsHostQuantity, subnetsQuantity } = getSubnetSetup(
        req.query as unknown as AllParamsType
    );
    const { mask, maskType } = getIpAndMask(req.query as unknown as AllParamsType);

    //Checking if minimal one of both is defined
    if (!subnetsQuantity && !subnetsHostQuantity) return sendError(res, 400, 'Bad Request');
    if (
        subnetsQuantity &&
        (!validationWithRegex(String(subnetsQuantity), new RegExp('^[0-9]+$')) ||
            subnetsQuantity < 2)
    )
        return sendError(res, 400, 'Bad Request');
    if (
        subnetsHostQuantity &&
        (!validationWithRegex(String(subnetsHostQuantity), new RegExp('^[0-9]+$')) ||
            subnetsHostQuantity < 1)
    )
        return sendError(res, 400, 'Bad Request');
    const ipMaskConverted = anyIp[maskType].toDefault(mask);
    subnetsQuantity = getSubnetsQuantity({ subnetsHostQuantity, subnetsQuantity }, ipMaskConverted);
    if (
        !subnetsPossibleValidation(ipMaskConverted, Number(subnetsQuantity)) ||
        subnetsQuantity <= 1
    )
        return sendError(res, 400, 'Bad Request');

    next();
}

export async function hostQuantitiesValidation(req: Request, res: Response, next: NextFunction) {
    const hostQuantities = getQueryParam(
        req.body as unknown as AllParamsType,
        'hostQuantities'
    ) as number[];
    const { mask, maskType } = getIpAndMask(req.body);

    if (!hostQuantities || !Array.isArray(hostQuantities) || hostQuantities.length < 2)
        return sendError(res, 400, 'Bad Request');

    const everyIsCorrect = hostQuantities.every((hostQuantity: number) => {
        if (
            validationWithRegex(String(hostQuantity), new RegExp('^[0-9]+$')) &&
            isInRange(hostQuantity, 1, 2147483646)
        )
            return true;
        return false;
    });

    if (!everyIsCorrect) return sendError(res, 400, 'Bad Request');

    const convertedMask = anyIp[maskType].toDefault(mask);
    const { maxHosts, requestedHostQuantity } = calculateProperHostQuantity(
        hostQuantities,
        convertedMask
    );

    if (!VLSMSubnetsPossibleValidation(requestedHostQuantity, maxHosts))
        return sendError(res, 400, 'Bad Request');

    next();
}
