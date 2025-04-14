import {
    ipsToBinary,
    ipsToDecimal,
    ipsToDefault,
    ipsToShorthand
} from '@/constant/samples.constant.js';
import { server } from '@/index.js';
import { conversionUrlBilder, EndpointGetTest } from '@/tests/utils/endpoints.util.js';

describe('GET /api/ip/conversions/binary', () => {
    afterEach(async () => {
        await server.close();
    });
    EndpointGetTest.successFailTests(
        ['Should convert ips to binary', 'Should return 400 because data is not correct'],
        '/api/ip/conversions/binary',
        ipsToBinary,
        conversionUrlBilder
    );
    EndpointGetTest.dataParamValidationTest('/api/ip/conversions/binary', 'ip', '192.168.0.1', {
        given: '192.168.0.1',
        result: {
            joined: '11000000.10101000.00000000.00000001',
            separated: ['11000000', '10101000', '00000000', '00000001']
        }
    });
});

describe('GET /api/ip/conversions/decimal', () => {
    afterEach(async () => {
        await server.close();
    });
    EndpointGetTest.successFailTests(
        ['Should convert ips to decimal', 'Should return 400 because data is not correct'],
        '/api/ip/conversions/decimal',
        ipsToDecimal,
        conversionUrlBilder
    );
    EndpointGetTest.dataParamValidationTest('/api/ip/conversions/decimal', 'ip', '192.168.0.1', {
        given: '192.168.0.1',
        result: {
            decimal: 3232235521
        }
    });
});

describe('GET /api/ip/conversions/default', () => {
    afterEach(async () => {
        await server.close();
    });
    EndpointGetTest.successFailTests(
        ['Should convert ips to default', 'Should return 400 because data is not correct'],
        '/api/ip/conversions/default',
        ipsToDefault,
        conversionUrlBilder
    );
    EndpointGetTest.dataParamValidationTest('/api/ip/conversions/default', 'ip', '192.168.0.1', {
        given: '192.168.0.1',
        result: {
            joined: '192.168.0.1',
            separated: [192, 168, 0, 1]
        }
    });
});

describe('GET /api/ip/conversions/shorthand', () => {
    afterEach(async () => {
        await server.close();
    });
    EndpointGetTest.successFailTests(
        ['Should convert ips to shorthand', 'Should return 400 because data is not correct'],
        '/api/ip/conversions/shorthand',
        ipsToShorthand,
        conversionUrlBilder
    );
    EndpointGetTest.dataParamValidationTest(
        '/api/ip/conversions/shorthand',
        'ip',
        '255.255.255.0',
        {
            given: '255.255.255.0',
            result: {
                shorthand: 24
            }
        }
    );
    EndpointGetTest.dataParamValidationTest('/api/ip/conversions/shorthand', 'ip', '192.168.0.1', {
        given: '192.168.0.1',
        result: {
            shorthand: -1
        }
    });
});
