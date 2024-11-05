import { connectDB } from '@/config/database.config.js';
import { IpMask } from '@/models/ipMask.model.js';

const sampleIpMask = {
    firstOctet: 255,
    secondOctet: 255,
    thirdOctet: 255,
    fourthOctet: 0,
    shorthand: 24
};

describe('Testing ipmask model', () => {
    it('Should create api mask in database', async () => {
        await connectDB();

        try {
            const newIpMask = await IpMask.create(sampleIpMask);

            const { firstOctet, secondOctet, thirdOctet, fourthOctet, shorthand, _id } = newIpMask;

            expect(firstOctet).toBe(255);
            expect(secondOctet).toBe(255);
            expect(thirdOctet).toBe(255);
            expect(fourthOctet).toBe(0);
            expect(shorthand).toBe(24);

            await IpMask.deleteOne({ _id });
        } catch (e) {
            console.log(e);
        }
    });

    it('Should not create api mask in database and throw an error', async () => {
        await connectDB();

        try {
            sampleIpMask.shorthand = 33;
            await IpMask.create(sampleIpMask);
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    });
});
