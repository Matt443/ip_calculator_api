import { server } from '@/index.js';
import {
    calculatingUrlBilder,
    EndpointConversionsTest,
    EndpointTest,
    StandardTest
} from '@/tests/utils/endpoints.util.js';
import { ipsToGetNetworkAddress } from '@/constant/samples.constant.js';

describe('GET /api/ip/networkAddress', () => {
    afterEach(async () => {
        await server.close();
    });
    EndpointConversionsTest.successFailTests(
        ['Should convert ips to binary', 'Should return 400 because data is not correct'],
        '/api/ip/networkAddress',
        ipsToGetNetworkAddress,
        calculatingUrlBilder
    );
    EndpointTest.resultCodeTest('/api/ip/networkAddress?type=default', 400);
});
