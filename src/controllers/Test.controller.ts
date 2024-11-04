import { Request, Response, NextFunction } from 'express';

export default {
    async testCallback(req: Request, res: Response, next: NextFunction) {
        // return res.send("Hello world").status(500);
    }
};
