import { Router } from 'express';

import TestController from '@/controllers/ipConversions.controller.js';
import { ipToConvertValidation } from '@/middlewares/validation.middlewares.js';

export default () => {
    const api = Router();
    api.get('/ip/conversions/binary', ipToConvertValidation, TestController.getBinary);
    api.get('/ip/conversions/decimal', TestController.getDecimal);
    api.get('/ip/conversions/default', TestController.getDecimal);
    return api;
};
