import { connectDB } from '@/config/database.config.js';
import { IpAddress } from '@/models/IpAdress.model.js';

describe('Checking ip adress model', () => {
    it('should create a ip adress in database', async () => {
        connectDB();
        try {
            const newIP = await IpAddress.create({
                firstOctet: 255,
                secondOctet: 255,
                thirdOctet: 255,
                fourthOctet: 255
            });

            const { firstOctet, secondOctet, thirdOctet, fourthOctet, _id } = newIP;

            expect(firstOctet).toBe(255);
            expect(secondOctet).toBe(255);
            expect(thirdOctet).toBe(255);
            expect(fourthOctet).toBe(255);
            // expect(_id).
            await IpAddress.deleteOne({ _id: newIP._id });
        } catch (e) {
            console.log(e);
        }
    });
});
