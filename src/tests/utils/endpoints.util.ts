import { ConversionTestsDataType, IpsToConvertType } from '@/constant/samples.constant';
import app from '@/index.js';
import { IpConversionResultType, ResponseIpConversion } from '@/types/api.types.js';
import { IpAddresBinaryType } from '@/types/ip.types';
import request from 'supertest';

export class StandardTest {}

export class EndpointTest extends StandardTest {
    /**
     *
     * @param {string} url
     * @param {number | ResponseIpConversion}result expected result
     * @param checkStatus @default true if true numeric values will be check as a status
     * @returns {void}
     */
    static async resultCodeTest(
        url: string,
        result: number | ResponseIpConversion,
        checkStatus: boolean = true
    ): Promise<void | boolean> {
        const response = await request(app).get(url);
        if (typeof result !== 'number' && checkStatus) {
            expect(JSON.parse(response.text)).toEqual(result);
            return false;
        }
        expect(response.status).toBe(result);
    }
    /**
     * @param {string} url
     * @param {ResponseIpConversion} resultDefault result when endpoint called with default ip type
     * @returns {void}
     */
    static async dataParamValidationTests(
        url: string,
        resultDefault: ResponseIpConversion
    ): Promise<void> {
        it('Should convert only ip with default type even without defined type', async () => {
            await this.resultCodeTest(`${url}?ip=192.168.0.1`, resultDefault);
        });
        it('Should return 400 because only type defualt is allowed without defined type param', async () => {
            await this.resultCodeTest(`${url}?ip=3232235521`, 400);
            await this.resultCodeTest(`${url}?ip=11111111111111111111111111111111`, 400);
        });
        it('Should return 400 because ip params are undefined', async () => {
            await this.resultCodeTest(`${url}?`, 400);
        });
        it('Should return 400 because ip param is missing', async () => {
            await this.resultCodeTest(`${url}?type=decimal`, 400);
        });
    }
    /**
     *
     * @param {string} url
     * @param {ConversionTestsDataType} testData
     * @returns {void}
     */
    static async successFailTests(url: string, testData: ConversionTestsDataType): Promise<void> {
        it('Should convert ip to decimal', async () => {
            await Promise.all(
                testData.success.map(async (ipToConvert: IpsToConvertType) => {
                    await this.resultCodeTest(
                        `${url}?ip=${ipToConvert.ip}&type=${ipToConvert.type}`,
                        ipToConvert.result
                    );
                })
            );
        });
        it('Should return 400 because args are not correct', async () => {
            await Promise.all(
                testData.fail.map(async (ipToConvert: IpsToConvertType) => {
                    await this.resultCodeTest(
                        `${url}?ip=${ipToConvert.ip}&type=${ipToConvert.type}`,
                        ipToConvert.result
                    );
                })
            );
        });
    }
}
