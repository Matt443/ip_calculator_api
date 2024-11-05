import { connectDB } from '@/config/database.config.js';
import mongoose from 'mongoose';

describe('connectDB Function', () => {
    let exitSpy: jest.SpyInstance;

    beforeAll(() => {
        exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
            throw new Error('process.exit called'); // Prevent actual exit
        });
    });

    afterAll(() => {
        exitSpy.mockRestore(); // Restore the original process.exit method
    });

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });
    it('should connect to the database when DB_URL is set', async () => {
        const mongooseConnectSpy = jest.spyOn(mongoose, 'connect').mockResolvedValueOnce(mongoose);

        await connectDB();
        expect(mongooseConnectSpy).toHaveBeenCalledWith(process.env.DB_URL);
        expect(exitSpy).not.toHaveBeenCalled(); // Ensure process.exit was not called
    });

    it('should call process.exit(1) if DB_URL is missing', async () => {
        delete process.env.DB_URL; // Ensure DB_URL is not set

        await expect(connectDB()).rejects.toThrow('process.exit called');

        expect(exitSpy).toHaveBeenCalledWith(1); // Check if process.exit(1) was called
    });

    it('should call process.exit(1) if DB_URL is empty', async () => {
        process.env.DB_URL = ''; // Set DB_URL to an empty string

        await expect(connectDB()).rejects.toThrow('process.exit called');

        expect(exitSpy).toHaveBeenCalledWith(1); // Check if process.exit(1) was called
    });
});
