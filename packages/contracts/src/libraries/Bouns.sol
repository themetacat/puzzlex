// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { IERC721Mintable } from "@latticexyz/world-modules/src/modules/erc721-puppet/IERC721Mintable.sol";
import { NFTInfo } from "./Struct.sol";
import { GameRecord, GameRecordData, RankRecord, RankRecordData } from "../codegen/index.sol";
import { Check } from "./Check.sol";
import { FiRST_TIER_COUNT } from "./Constant.sol";
import { AccessRequire } from "./AccessRequire.sol";

library Bouns {
  function getBonus(NFTInfo memory nftInfo, uint256 round, address player) internal view returns (uint256) {
    address tokenAddr = nftInfo.tokenAddr;
    uint256 tokenId = nftInfo.tokenId;

    GameRecordData memory gameRecordData = GameRecord.get(tokenAddr, tokenId, round);
    uint256 successPlayer = gameRecordData.successPlayer;

    RankRecordData memory rankRecordData = RankRecord.get(tokenAddr, tokenId, round);
    int256 userIndex = Check.findUserIndex(rankRecordData.players, player);
    if (userIndex < 0) {
      return 0;
    }

    uint256 index = uint256(userIndex);
    uint256 tier = getTier(successPlayer, index);
    if (tier == 0) {
      return 0;
    }
    uint256 bouns = getTierToBouns(gameRecordData.pool, successPlayer, tier, index);
    if(AccessRequire.requireNFTOwner(nftInfo, player)){
        bouns += getOwnerBonus(gameRecordData.pool);
    }
    return bouns;
  }

  function _round(uint256 _value) internal pure returns (uint256) {
    if (_value % 10 >= 5) {
      return _value / 10 + 1;
    } else {
      return _value / 10;
    }
  }

  function getTier(uint256 playerCount, uint256 index) internal pure returns (uint256 tier) {
    if (playerCount < 15) {
      tier = (index < FiRST_TIER_COUNT) ? 1 : 0;
    } else {
      uint256 roundedPercent = _round(playerCount);
      uint256 secondTierCount = 2 * roundedPercent - 3;
      uint256 thirdTierCount = roundedPercent;

      if (index < FiRST_TIER_COUNT) {
        tier = 1;
      } else if (index < FiRST_TIER_COUNT + secondTierCount) {
        tier = 2;
      } else if (index < FiRST_TIER_COUNT + secondTierCount + thirdTierCount) {
        tier = 3;
      }
    }
  }

  function getTierToBouns(
    uint256 pool,
    uint256 playerCount,
    uint256 tier,
    uint256 index
  ) internal pure returns (uint256 res) {
    if (playerCount == 1) {
      if (index == 0) {
        res = (pool * 55) / 100;
      }
    } else if (playerCount == 2) {
      if (index == 0) {
        res = (pool * 45) / 100;
      } else if (index == 1) {
        res = (pool * 10) / 100;
      }
    } else if (playerCount < 15) {
      if (index == 0) {
        res = (pool * 30) / 100;
      } else if (index == 1) {
        res = (pool * 15) / 100;
      } else if (index == 2) {
        res = (pool * 10) / 100;
      }
    } else if (playerCount > 14) {
      if (tier == 1) {
        res = 0;
      } else if (tier == 2) {
        res = ((15 * pool) / 100) / (_round(playerCount));
      } else if (tier == 3) {
        res = ((10 * pool) / 100) / (_round(playerCount));
      }
    }
  }

  function getOwnerBonus(uint256 pool) pure internal returns(uint256){
    return (15*pool)/100;
  }
}
