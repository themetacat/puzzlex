// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";
import { GameRecord, PlayerClaim, PlayerWithdrawn, GameRound } from "../codegen/index.sol";
import { IERC721Mintable } from "@latticexyz/world-modules/src/modules/erc721-puppet/IERC721Mintable.sol";
import { NFTInfo, BonusSingle, BonusBatchRank, BonusBatchResProfile, BonusBatchResRank } from "../libraries/Struct.sol";
import { AccessRequire } from "../libraries/AccessRequire.sol";
import { Bouns } from "../libraries/Bouns.sol";
import { WorldResourceIdLib } from "@latticexyz/world/src/WorldResourceId.sol";
import { IWorld } from "../codegen/world/IWorld.sol";
import { Balances } from "@latticexyz/world/src/codegen/index.sol";
import { ResourceId } from "@latticexyz/store/src/ResourceId.sol";
import { revertWithBytes } from "@latticexyz/world/src/revertWithBytes.sol";
import { IWorldErrors } from "@latticexyz/world/src/IWorldErrors.sol";
import { AccessRequire } from "../libraries/AccessRequire.sol";
import { Check } from "../libraries/Check.sol";

contract BonusSystem is System, IWorldErrors {
  /*
   * get single game (all round or single round) bouns
   * claimCheck: false - earned bonus;
   *             true - (unclaimed and claimable) bonus
   *                    (in game round unclaimable)
   */
  function getBonusSingle(BonusSingle memory bonusSingle, bool claimCheck) public view returns (uint256) {
    uint256 res;
    address tokenAddr = bonusSingle.nftInfo.tokenAddr;
    uint256 tokenId = bonusSingle.nftInfo.tokenId;

    NFTInfo memory nftInfo = NFTInfo(tokenAddr, tokenId);
    address player = bonusSingle.player;
    if (claimCheck) {
      uint256 round;
      for (uint256 i = 0; i < bonusSingle.round.length; i++) {
        round = bonusSingle.round[i];
        bool claimable = AccessRequire.claimableThisRound(nftInfo, round);
        bool claimed = PlayerClaim.get(tokenAddr, tokenId, bonusSingle.player, round);
        if (!claimed && claimable) {
          res += Bouns.getBonus(nftInfo, round, player);
        }
      }
    } else {
      for (uint256 i = 0; i < bonusSingle.round.length; i++) {
        res += Bouns.getBonus(nftInfo, bonusSingle.round[i], player);
      }
    }
    return res;
  }

  function getBonusBatchProfile(BonusSingle[] memory bonusMuti) public view returns (BonusBatchResProfile[] memory) {
    BonusBatchResProfile[] memory res = new BonusBatchResProfile[](bonusMuti.length);

    for (uint256 i = 0; i < bonusMuti.length; i++) {
      res[i] = BonusBatchResProfile(bonusMuti[i].nftInfo, getBonusSingle(bonusMuti[i], false));
    }
    return res;
  }

  function getBonusBatchRank(BonusBatchRank memory bonusBatchRank) public view returns (BonusBatchResRank[] memory) {
    BonusBatchResRank[] memory res = new BonusBatchResRank[](bonusBatchRank.player.length);
    uint256[] memory round = new uint256[](1);
    round[1] = bonusBatchRank.round;
    for (uint256 i = 0; i < bonusBatchRank.player.length; i++) {
      BonusSingle memory bonusSingle = BonusSingle(bonusBatchRank.nftInfo, round, bonusBatchRank.player[i]);

      res[i] = BonusBatchResRank(bonusBatchRank.player[i], getBonusSingle(bonusSingle, false));
    }
    return res;
  }

  /*
   * !!!require round over
   */
  function claimBonusSingle(BonusSingle memory bonusSingle) public {
    address player = bonusSingle.player;
    require(_msgSender() == bonusSingle.player, "Not owner");
    require(!Check.hasSameElements(bonusSingle.round), "Same Round");

    uint256 unclaimedBonus = getBonusSingle(bonusSingle, true);

    address tokenAddr = bonusSingle.nftInfo.tokenAddr;
    uint256 tokenId = bonusSingle.nftInfo.tokenId;

    uint256 round;
    for (uint256 i = 0; i < bonusSingle.round.length; i++) {
      // bool claimed = PlayerClaim.get(tokenAddr, tokenId, player, bonusSingle.round[i]);
      // require(!claimed, "claimed");
      round = bonusSingle.round[i];
      bool claimable = AccessRequire.claimableThisRound(bonusSingle.nftInfo, round);
      if(claimable){
        PlayerClaim.set(tokenAddr, tokenId, player, round, true);
      }
    }
    PlayerWithdrawn.set(tokenAddr, tokenId, player, unclaimedBonus + PlayerWithdrawn.get(tokenAddr, tokenId, player));
    //   IWorld(_world()).transferBalanceToAddress(WorldResourceIdLib.encodeNamespace(""), player, unclaimedBonus);
    _transferBalance(unclaimedBonus, player);
  }

  function _transferBalance(uint256 bonus, address player) private {
    ResourceId fromNamespaceId = WorldResourceIdLib.encodeNamespace("");
    uint256 balance = Balances._get(fromNamespaceId);

    // Require the balance to be greater or equal to the amount to transfer
    if (bonus > balance) revert World_InsufficientBalance(balance, bonus);

    // Update the balances
    Balances._set(fromNamespaceId, balance - bonus);

    // Transfer the balance to the given address, revert on failure
    (bool success, bytes memory data) = payable(player).call{ value: bonus }("");
    if (!success) revertWithBytes(data);
  }
}
