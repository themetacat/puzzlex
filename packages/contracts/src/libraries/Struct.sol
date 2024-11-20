// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

struct NFTInfo {
    address tokenAddr;
    uint256 tokenId;
}

struct BonusSingle {
    NFTInfo nftInfo;
    uint256[] round;
    address player;
}

struct BonusBatchResProfile {
    NFTInfo nftInfo;
    uint256 bonus;
}

struct BonusBatchResRank {
    address player;
    uint256 bonus;
}

struct BonusBatchRank {
    NFTInfo nftInfo;
    uint256 round;
    address[] player;
}
