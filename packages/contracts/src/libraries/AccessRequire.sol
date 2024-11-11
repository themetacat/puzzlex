// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { IERC721Mintable } from "@latticexyz/world-modules/src/modules/erc721-puppet/IERC721Mintable.sol";
import { NFTInfo } from "./Struct.sol";
import { Puzzle, NFTSettings, NFTSettingsData, GameRound, GameRoundData } from "../codegen/index.sol";

library AccessRequire {
  function requireNFTOwner(NFTInfo memory nftInfo, address msgSender) internal view {
    address tokenAddr = nftInfo.tokenAddr;
    uint256 tokenId = nftInfo.tokenId;
    IERC721Mintable erc721 = IERC721Mintable(tokenAddr);
    require(msgSender == erc721.ownerOf(tokenId), "Not owner");
  }

  function roundInProgress(NFTInfo memory nftInfo) internal view returns (bool) {
    address tokenAddr = nftInfo.tokenAddr;
    uint256 tokenId = nftInfo.tokenId;

    // GameRoundData memory gameRoundData = GameRound.get(tokenAddr, tokenId);
    uint256 roundStartTime = GameRound.getStartTime(tokenAddr, tokenId);
    uint256 perRoundTime = NFTSettings.getPerRound(tokenAddr, tokenId);
    if (roundStartTime != 0 && roundStartTime + perRoundTime > block.timestamp) {
      // Round in progress
      return true;
      // require(gameRoundData.startTime + perRoundTime > block.timestamp, "Round in progress");
    } else {
      return false;
    }
  }

  function isSetup(NFTInfo memory nftInfo) internal view returns (bool) {
    address tokenAddr = nftInfo.tokenAddr;
    uint256 tokenId = nftInfo.tokenId;

    NFTSettingsData memory nftSettingsData = NFTSettings.get(tokenAddr, tokenId);
    if (nftSettingsData.numOfGames == 0 || nftSettingsData.pieces == 0 || nftSettingsData.perRound == 0) {
      return false;
    } else {
      return true;
    }
  }

  function gameInRound(NFTInfo memory nftInfo, address owner) internal view {
    address tokenAddr = nftInfo.tokenAddr;
    uint256 tokenId = nftInfo.tokenId;
    
    uint256 puzzleRound = Puzzle.getRound(tokenAddr, tokenId, owner);
    // NFT round
    uint256 gameRound = GameRound.getRound(tokenAddr, tokenId);

    require(puzzleRound == gameRound, "Round not in progress");
  }
}
