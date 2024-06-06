import { Request, Response, NextFunction } from 'express';

interface ErrorHandler extends Error {
    status?: number;
}

export const errorHandler = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    console.error(`[ERROR] ${message}`);

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};
