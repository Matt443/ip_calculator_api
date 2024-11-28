import { ipsToBinary, ipsToDecimal, ipsToDefault } from '@/constant/samples.constant.js';
import { server } from '@/index.js';
import { EndpointTest, StandardTest } from '@/tests/utils/endpoints.util.js';
describe('GET /api/ip/conversions/binary', () => {
    afterEach(async () => {
        await server.close();
    });
    EndpointTest.successFailTests('/api/ip/conversions/binary', ipsToBinary);
    EndpointTest.dataParamValidationTests('/api/ip/conversions/binary', {
        given: '192.168.0.1',
        result: {
            joined: '11000000.10101000.00000000.00000001',
            separated: ['11000000', '10101000', '00000000', '00000001']
        }
    });
});

describe('GET /api/ip/conversions/decimal', () => {
    EndpointTest.successFailTests('/api/ip/conversions/decimal', ipsToDecimal);
    EndpointTest.dataParamValidationTests('/api/ip/conversions/decimal', {
        given: '192.168.0.1',
        result: {
            decimal: 3232235521
        }
    });
});

describe('GET /api/ip/conversions/default', () => {
    EndpointTest.successFailTests('/api/ip/conversions/default', ipsToDefault);
    EndpointTest.dataParamValidationTests('/api/ip/conversions/default', {
        given: '192.168.0.1',
        result: {
            joined: '192.168.0.1',
            separated: [192, 168, 0, 1]
        }
    });
});
