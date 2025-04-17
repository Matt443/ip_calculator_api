import { server } from '@/index.js';
import {
    calculatingUrlBilder,
    EndpointGetTest,
    EndpointPostTest,
    onlyIpUrlBilder,
    onlyMaskUrlBilder
} from '@/tests/utils/endpoints.util.js';
import {
    ipsToGetBroadcastAddress,
    ipsToGetHostQuantity,
    ipsToGetNetworkAddress,
    ipsToGetNetworkInfo,
    ipsToGetSubnetsResponse,
    ipsToGetSubnetsVLSMResponse,
    ipsToRecognizeClass
} from '@/constant/samples.constant.js';

describe('GET /api/ip/networkAddress', () => {
    afterEach(async () => {
        await server.close();
    });
    EndpointGetTest.successFailTests(
        ['Should get a network address', 'Should return 400 because data is not correct'],
        '/api/ip/networkAddress',
        ipsToGetNetworkAddress,
        calculatingUrlBilder
    );
    EndpointGetTest.resultCodeTest('/api/ip/networkAddress?type=default', 400);
});

describe('GET /api/ip/broadcastAddress', () => {
    afterEach(async () => {
        await server.close();
    });
    EndpointGetTest.successFailTests(
        ['Should get a broadcast address', 'Should return 400 because data is not correct'],
        '/api/ip/broadcastAddress',
        ipsToGetBroadcastAddress,
        calculatingUrlBilder
    );
    EndpointGetTest.resultCodeTest('/api/ip/broadcastAddress?type=default', 400);
});

describe('GET /api/ip/hostQuantity', () => {
    afterEach(async () => {
        await server.close();
    });
    EndpointGetTest.successFailTests(
        ['Should get a host quantity', 'Should return 400 because data is not correct'],
        '/api/ip/hostQuantity',
        ipsToGetHostQuantity,
        onlyMaskUrlBilder
    );
    EndpointGetTest.resultCodeTest('/api/ip/broadcastAddress?type=default&ip=255.255.0.0', 400);
    EndpointGetTest.resultCodeTest('/api/ip/broadcastAddress', 400);
});

describe('GET /api/ip/networkInfo', () => {
    () => {
        afterEach(async () => {
            await server.close();
        });
    };
    EndpointGetTest.successFailTests(
        ['Should get a network info', 'Should return 400 because data is not correct'],
        '/api/ip/networkInfo',
        ipsToGetNetworkInfo,
        calculatingUrlBilder
    );
    EndpointGetTest.resultCodeTest('/api/ip/networkInfo?type=default&ip=255.255.0.0', 400);
    EndpointGetTest.resultCodeTest('/api/ip/networkInfo', 400);
});

describe('POST /api/ip/subnets', () => {
    afterEach(async () => {
        server.close();
    });
    EndpointPostTest.successFailTests(
        ['Should get a subnets', 'Should return 400 because data is not correct'],
        '/api/ip/subnets',
        ipsToGetSubnetsResponse
    );
    EndpointPostTest.codeTest('/api/ip/subnets', { ip: '255.255.0.0', type: 'default' }, 400);
    EndpointPostTest.codeTest('/api/ip/subnets', {}, 400);
});

describe('POST /api/ip/subnetsVLSM', () => {
    afterEach(async () => {
        server.close();
    });
    EndpointPostTest.successFailTests(
        ['Should get subnets with VLSM method', 'Should return 400 because data is not correct'],
        '/api/ip/subnetsVLSM',
        ipsToGetSubnetsVLSMResponse
    );
});

describe('POST /api/ip/class', () => {
    afterEach(async () => {
        server.close();
    });
    EndpointGetTest.successFailTests(
        ['Should get subnets with VLSM method', 'Should return 400 because data is not correct'],
        '/api/ip/class',
        ipsToRecognizeClass,
        onlyIpUrlBilder
    );
});
