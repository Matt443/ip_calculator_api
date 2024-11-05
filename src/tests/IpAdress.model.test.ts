import { connectDB } from '@/config/database.config.js';
import { IpAddress } from '@/models/IpAdress.model.js';

describe('Checking ip adress model', () => {
    it('should create a ip adress in database', async () => {
        connectDB();
        try {
            const newIP = await IpAddress.create({
                firstOctet: 192,
                secondOctet: 168,
                thirdOctet: 0,
                fourthOctet: 0
            });

            const { firstOctet, secondOctet, thirdOctet, fourthOctet, _id } = newIP;

            expect(firstOctet).toBe(192);
            expect(secondOctet).toBe(168);
            expect(thirdOctet).toBe(0);
            expect(fourthOctet).toBe(0);

            await IpAddress.deleteOne({ _id });
        } catch (e) {
            console.log(e);
        }
    });
    it('should create a ip adress in database and throw an error', async () => {
        connectDB();
        try {
            await IpAddress.create({
                firstOctet: 255,
                secondOctet: 255,
                thirdOctet: 255
            });
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    });
});
