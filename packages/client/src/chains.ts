import {
    mainnet,
    polygon
} from 'wagmi/chains';

export const chains = [
    {
        id: 31337, // Hardhat 默认链 ID
        name: "Hardhat Local",
        network: "localhost",
        nativeCurrency: {
            decimals: 18,
            name: "Ether",
            symbol: "ETH",
        },
        rpcUrls: {
            default: { http: ["http://127.0.0.1:8545"] }, // 本地 RPC URL
            public: { http: ["http://127.0.0.1:8545"] },
        },
    },
    mainnet,
    polygon
];