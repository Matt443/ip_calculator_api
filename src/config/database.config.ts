import mongoose from 'mongoose';
import 'dotenv/config';
/**
 * Function to connect to a database.
 * @requires DB_URL in .env file;
 */
export const connectDB = async (): Promise<void> => {
    console.log(process.env.DB_URL)
    if (!process.env.DB_URL || process.env.DB_URL === undefined || process.env.DB_URL === '') process.exit(1)
    try {
        mongoose.connect(process.env.DB_URL);
    } catch (e) {
        console.log('Cannot connect to the database', e);
        process.exitCode = 1
    }
};
