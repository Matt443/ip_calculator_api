import { Router } from 'express';

import { ipAndMaskValidation, maskValidation } from '@/middlewares/validation.middlewares.js';
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
    return api;
};
