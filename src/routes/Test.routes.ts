import { Router } from 'express';

import TestController from '../controllers/Test.controller.js';

export default () => {
    const api = Router();
    api.get('/test', TestController.testCallback);
};
