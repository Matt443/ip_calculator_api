import { server } from '@/index.js';
import {
    calculatingUrlBilder,
    EndpointConversionsTest,
    EndpointTest,
    onlyMaskUrlBilder
} from '@/tests/utils/endpoints.util.js';
import {
    ipsToGetBroadcastAddress,
    ipsToGetHostQuantity,
    ipsToGetNetworkAddress
} from '@/constant/samples.constant.js';

describe('GET /api/ip/networkAddress', () => {
    afterEach(async () => {
        await server.close();
    });
    EndpointConversionsTest.successFailTests(
        ['Should get a network address', 'Should return 400 because data is not correct'],
        '/api/ip/networkAddress',
        ipsToGetNetworkAddress,
        calculatingUrlBilder
    );
    EndpointTest.resultCodeTest('/api/ip/networkAddress?type=default', 400);
});

describe('GET /api/ip/broadcastAddress', () => {
    afterEach(async () => {
        await server.close();
    });
    EndpointConversionsTest.successFailTests(
        ['Should get a broadcast address', 'Should return 400 because data is not correct'],
        '/api/ip/broadcastAddress',
        ipsToGetBroadcastAddress,
        calculatingUrlBilder
    );
    EndpointTest.resultCodeTest('/api/ip/broadcastAddress?type=default', 400);
});

describe('GET /api/ip/hostQuantity', () => {
    afterEach(async () => {
        await server.close();
    });
    EndpointConversionsTest.successFailTests(
        ['Should get a broadcast address', 'Should return 400 because data is not correct'],
        '/api/ip/hostQuantity',
        ipsToGetHostQuantity,
        onlyMaskUrlBilder
    );
    EndpointTest.resultCodeTest('/api/ip/broadcastAddress?type=default&ip=255.255.0.0', 400);
    EndpointTest.resultCodeTest('/api/ip/broadcastAddress', 400);
});
