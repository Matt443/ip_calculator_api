import {
    ConversionTestsDataType,
    IpToCalculateType,
    IpToConvertType,
    IpToGetHostQuantityType,
    TestDataSetFieldType,
    TestDataSetType
} from '@/constant/samples.constant';
import app from '@/index.js';
import { ResponseIpConversion } from '@/types/api.types.js';
import request from 'supertest';

export class StandardTest {
    /**
     *
     * @param {string} url
     * @param {string} paramName
     * @param {string} paramValue
     * @param {Object|string} result
     * @returns {Promise<void>}
     */
    static async dataParamValidationTest(
        url: string,
        paramName: string,
        paramValue: string,
        result: Object | string
    ) {
        const response = await request(app).get(`${url}?${paramName}=${paramValue}`);
        expect(JSON.parse(response.text)).toEqual(result);
    }
}

export class EndpointTest extends StandardTest {
    /**
     *
     * @param {string} url
     * @param {number | ResponseIpConversion}result expected result
     * @param checkStatus @default true if true numeric values will be check as a status
     * @returns {Promise<void|boolean>}
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
}

export class EndpointConversionsTest extends EndpointTest {
    /**
     *
     * @param {string} testMessage
     * @param {string} url
     * @param {TestDataSetType[]} testData
     * @returns {Promise<void>}
     */
    static async dataParamValidationTests(
        testMessage: string,
        url: string,
        testData: TestDataSetFieldType[],
        urlBilder: Function
    ): Promise<void> {
        it(testMessage, async () => {
            await Promise.all(
                testData.map(async (ipToTest: TestDataSetFieldType) => {
                    const response = await request(app).get(urlBilder(url, ipToTest));
                    expect(JSON.parse(response.text)).toEqual(ipToTest.result);
                })
            );
        });
    }
    /**
     *
     * @param {string} url
     * @param {TestDataSetType[]} testData
     * @returns {Promise<void>}
     */
    static async successFailTests(
        messages: string[],
        url: string,
        testData: TestDataSetType,
        urlBilder: Function
    ): Promise<void> {
        this.dataParamValidationTests(messages[0], url, testData.success, urlBilder);
        it(messages[1], async () => {
            await Promise.all(
                testData.fail.map(async (ipToTest: TestDataSetFieldType) => {
                    this.resultCodeTest(urlBilder(url, ipToTest), 400);
                })
            );
        });
    }
}

export function conversionUrlBilder(url: string, ipToTest: IpToConvertType): string {
    return `${url}?ip=${ipToTest.ip}&type=${ipToTest.type}`;
}

export function calculatingUrlBilder(url: string, ipToTest: IpToCalculateType): string {
    return `${url}?ip=${ipToTest.ip}&type=${ipToTest.type || 'default'}&mask=${ipToTest.mask}&maskType=${ipToTest.maskType || 'shorthand'}`;
}

export function onlyMaskUrlBilder(url: string, mask: IpToGetHostQuantityType): string {
    return `${url}?mask=${mask.mask}&type=${mask.type || 'shorthand'}`;
}
