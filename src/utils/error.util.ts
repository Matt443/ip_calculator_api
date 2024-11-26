import type { Request, Response, NextFunction } from 'express';
export function sendError(res: Response, code: number, message: string) {
    const err: Error = new Error('404 page not found');
    res.status(code).send(message);
    return;
}
