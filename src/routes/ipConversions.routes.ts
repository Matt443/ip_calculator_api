import { Router } from 'express';

import IpConversionController from '@/controllers/ipConversions.controller.js';
import { ipValidation } from '@/middlewares/validation.middlewares.js';

export default () => {
    const api = Router();
    api.get('/ip/conversions/binary', ipValidation, IpConversionController.getBinary);
    api.get('/ip/conversions/decimal', ipValidation, IpConversionController.getDecimal);
    api.get('/ip/conversions/default', ipValidation, IpConversionController.getDefault);
    api.get('/ip/conversions/shorthand', ipValidation, IpConversionController.getShorthand);
    return api;
};
