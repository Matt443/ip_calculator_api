import app from '@/index.js';
import { IpToConvertType, TestDataSetFieldType, TestDataSetType } from '@/types/samples.types.js';
import request from 'supertest';
import axios from 'axios';
import { IpParamType, MaskParamType } from '@/types/api.types';

export class StandardTest {}
export class EndpointGetTest extends StandardTest {
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
        result: object | string
    ) {
        const response = await request(app).get(`${url}?${paramName}=${paramValue}`);
        expect(JSON.parse(response.text)).toEqual(result);
    }
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
                    if (response.status === 400) console.log(ipToTest);
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
    /**
     *
     * @param {string} url
     * @param {number | ResponseIpConversion}result expected result
     * @param checkStatus @default true if true numeric values will be check as a status
     * @returns {Promise<void|boolean>}
     */
    static async resultCodeTest(url: string, result: number): Promise<void | boolean> {
        const response = await request(app).get(url);
        expect(response.status).toBe(result);
    }
}

export class EndpointPostTest extends StandardTest {
    /**
     *
     * @param {string} url
     * @param {Object} dataToSend
     * @param result
     */
    static async responseTest(url: string, dataToSend: object, result: any): Promise<void> {
        const response = await axios.post('http://localhost:3002' + url, dataToSend);
        expect(response.data).toEqual(result);
    }
    /**
     *
     * @param {string} url
     * @param {Object} dataToSend
     * @param {number} code
     */
    static async codeTest(url: string, dataToSend: object, code: number): Promise<void> {
        const response = await axios.post('http://localhost:3002' + url, dataToSend, {
            validateStatus: (status) => {
                return status >= 200 && status < 500;
            }
        });
        expect(response.status).toBe(code);
    }
    /**
     *
     * @param {string[]} messages
     * @param {string} url
     * @param {TestDataSetType} testData
     */
    static async successFailTests(
        messages: string[],
        url: string,
        testData: TestDataSetType
    ): Promise<void> {
        it(messages[0], async () => {
            await Promise.all(
                testData.success.map(async (element: TestDataSetFieldType) => {
                    const { result, ...toSend } = element;
                    this.responseTest(url, toSend, result);
                })
            );
        });
        it(messages[1], async () => {
            await Promise.all(
                testData.fail.map(async (element: TestDataSetFieldType) => {
                    const { result, ...toSend } = element;
                    this.codeTest(url, toSend, Number(result));
                })
            );
        });
    }
}

/**
 *
 * @param {string} url
 * @param {IpToConvertType} ipToTest
 * @returns {string}
 */
export function conversionUrlBilder(url: string, ipToTest: IpToConvertType): string {
    return `${url}?ip=${ipToTest.ip}&type=${ipToTest.type}`;
}

/**
 *
 * @param {string} url
 * @param {IpToCalculateType} ipToTest
 * @returns {string}
 */
export function calculatingUrlBilder(url: string, ipToTest: MaskParamType & IpParamType): string {
    return `${url}?ip=${ipToTest.ip}&type=${ipToTest.type || 'default'}&mask=${ipToTest.mask}&maskType=${ipToTest.maskType || 'shorthand'}`;
}

/**
 *
 * @param {string} url
 * @param {IpToGetHostQunatityType} ipToTest
 * @returns {string}
 */
export function onlyMaskUrlBilder(url: string, mask: MaskParamType): string {
    return `${url}?mask=${mask.mask}&type=${mask.maskType || 'shorthand'}`;
}

/**
 *
 * @param {string} url
 * @param {IpToGetHostQunatityType} ipToTest
 * @returns {string}
 */
export function onlyIpUrlBilder(url: string, ip: IpParamType): string {
    return `${url}?ip=${ip.ip}&type=${ip.type || 'default'}`;
}

/**
 *
 * @param {string} url
 * @param {MaskParamType & IpParamType & { subnetsQuantity: number; subnetsHostQuantity: number}} ipToTest
 * @returns {string}
 */
export function subnetsUrlBilder(
    url: string,
    ipToTest: MaskParamType & IpParamType & { subnetsQuantity: number; subnetsHostQuantity: number }
): string {
    let queryParams: string = calculatingUrlBilder(url, ipToTest);
    if (typeof ipToTest.subnetsHostQuantity !== 'undefined')
        queryParams += `&subnetsHostQuantity=${ipToTest.subnetsHostQuantity}`;
    if (typeof ipToTest.subnetsQuantity !== 'undefined')
        queryParams += `&subnetsQuantity=${ipToTest.subnetsQuantity}`;
    return queryParams;
}
