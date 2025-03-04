import { Router } from 'express';

import networkAddressController from '@/controllers/ipCalculations.controller.js';
import { ipAndMaskValidation, maskValidation } from '@/middlewares/validation.middlewares.js';

export default () => {
    const api = Router();
    api.get('/ip/networkAddress', ipAndMaskValidation, networkAddressController.getNetworkAddress);
    api.get(
        '/ip/broadcastAddress',
        ipAndMaskValidation,
        networkAddressController.getBroadcastAddress
    );
    api.get('/ip/hostQuantity', maskValidation, networkAddressController.getNumberOfHosts);
    return api;
};
