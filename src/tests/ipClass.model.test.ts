import { connectDB } from '@/config/database.config.js';
import { IpClass } from '@/models/ipClass.model.js';
import mongoose from 'mongoose';


const sampleIpClass = {
    ipMax: new mongoose.Types.ObjectId('672a17abaf5c260208c3dc6f'),
    ipMin :new mongoose.Types.ObjectId('672a17dae666fbfc46c7d386'),
    className: "C"
}

describe('Checking ip adress model', () => {
    it('should create a ip class in database', async () => {
        await connectDB();
        try {
            const newIpClass = await IpClass.create(sampleIpClass);

            const { ipMax, ipMin, className,_id } = newIpClass;

            expect(ipMax).toEqual(new mongoose.Types.ObjectId(sampleIpClass.ipMax));
            expect(ipMin).toEqual(new mongoose.Types.ObjectId(sampleIpClass.ipMin));
            expect(className).toBe('C')

            await IpClass.deleteOne({ _id });
        } catch (e) {
            console.log(e);
        }
    });

    it('should not create a ip class in database because of not unique required data', async () => {
        await connectDB();
        try {
            await IpClass.create({
                ipMax: new mongoose.Types.ObjectId('672a17abaf5c260208c3dc6f'),
                className: "C"
            });
        } catch (e) {
            await expect(e).toBeInstanceOf(Error);
        }
    });
});
