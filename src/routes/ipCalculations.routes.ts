import { Router } from 'express';

import {
    hostQuantitiesValidation,
    ipAndMaskValidation,
    ipValidation,
    maskValidation,
    subnetParamsValidation
} from '@/middlewares/validation.middlewares.js';
import ipCalculationsController from '@/controllers/ipCalculations.controller.js';

export default () => {
    const api = Router();
    api.get('/ip/networkAddress', ipAndMaskValidation, ipCalculationsController.getNetworkAddress);
    api.get(
        '/ip/broadcastAddress',
        ipAndMaskValidation,
        ipCalculationsController.getBroadcastAddress
    );
    api.get('/ip/hostQuantity', maskValidation, ipCalculationsController.getNumberOfHosts);
    api.get('/ip/networkInfo', ipAndMaskValidation, ipCalculationsController.getNetworkInfo);
    api.get('/ip/class', ipValidation, ipCalculationsController.getIpClass);
    api.get(
        '/ip/subnets',
        ipAndMaskValidation,
        subnetParamsValidation,
        ipCalculationsController.getSubnets
    );
    api.post(
        '/ip/subnetsVLSM',
        ipAndMaskValidation,
        hostQuantitiesValidation,
        ipCalculationsController.getSubnetsVLSM
    );
    return api;
};
