import { Router } from 'express';

import IpConversionController from '@/controllers/ipConversions.controller.js';
import { ipToConvertValidation } from '@/middlewares/validation.middlewares.js';

export default () => {
    const api = Router();
    api.get('/ip/conversions/binary', ipToConvertValidation, IpConversionController.getBinary);
    api.get('/ip/conversions/decimal', ipToConvertValidation, IpConversionController.getDecimal);
    api.get('/ip/conversions/default', ipToConvertValidation, IpConversionController.getDefault);
    return api;
};
