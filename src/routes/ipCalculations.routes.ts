import { Router } from 'express';

import networkAddressController from '@/controllers/ipCalculations.controller.js';
import { ipAndMaskValidation } from '@/middlewares/validation.middlewares.js';

export default () => {
    const api = Router();
    api.get('/ip/networkAddress', ipAndMaskValidation, networkAddressController.getNetworkAddress);
    return api;
};
