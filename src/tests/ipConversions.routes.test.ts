import { ipsToBinary, IpsToBinaryType } from '@/constant/samples.constant.js';
import app, { server } from '@/index.js';
import request from 'supertest';

describe('GET /api/ip/conversions/binary', () => {
    afterEach(async () => {
        await server.close();
    });
    it('Should validate if args in conversion request are correct and convert given ip to binary', async () => {
        await Promise.all(
            ipsToBinary.success.map(async (ipToConvert: IpsToBinaryType) => {
                const response = await request(app).get(
                    `/api/ip/conversions/binary?ip=${ipToConvert.ip}&type=${ipToConvert.type}`
                );
                expect(response.status).toBe(200);
                expect(JSON.parse(response.text)).toEqual(ipToConvert.result);
            })
        );
    });
    it('Should convert only ip with default type even without defined type', async () => {
        const response = await request(app).get(`/api/ip/conversions/binary?ip=192.168.0.1`);
        expect(JSON.parse(response.text)).toEqual({
            given: '192.168.0.1',
            result: {
                joined: '11000000.10101000.00000000.00000001',
                separated: ['11000000', '10101000', '00000000', '00000001']
            }
        });
    });
    it('Should return 400 because only type defualt is allowed without defined type param', async () => {
        const response = await request(app).get(`/api/ip/conversions/binary?ip=3232235521`);
        expect(response.status).toBe(400);

        const response2 = await request(app).get(
            `/api/ip/conversions/binary?ip=11111111111111111111111111111111`
        );
        expect(response2.status).toBe(400);
    });
    it('Should return 400 because parameters are not correct', async () => {
        await Promise.all(
            ipsToBinary.fail.map(async (ipToConvert: IpsToBinaryType) => {
                const response = await request(app).get(
                    `/api/ip/conversions/binary?ip=${ipToConvert.ip}&type=${ipToConvert.type}`
                );
                expect(response.status).toBe(400);
            })
        );
    });
    it('Should return 400 because ip params are undefined', async () => {
        const response = await request(app).get(`/api/ip/conversions/binary?`);
        expect(response.status).toBe(400);
    });
    it('Should return 400 because ip param is missing', async () => {
        const response = await request(app).get(`/api/ip/conversions/binary?type=decimal`);
        expect(response.status).toBe(400);
    });
});
