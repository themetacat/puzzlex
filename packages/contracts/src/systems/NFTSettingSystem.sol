// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";
import { NFTSettings, NFTSettingsData, GameRound, GameRoundData } from "../codegen/index.sol";
import { IERC721Mintable } from "@latticexyz/world-modules/src/modules/erc721-puppet/IERC721Mintable.sol";
import { NFTInfo } from "../libraries/Struct.sol";
import { AccessRequire } from "../libraries/AccessRequire.sol";

contract NFTSettingSystem is System {
  function setup(NFTInfo memory nftInfo, uint256 ticket, uint256 numOfGames, uint256 preRound, uint256 pieces) public {
    address tokenAddr = nftInfo.tokenAddr;
    uint256 tokenId = nftInfo.tokenId;

    // require owner
    // AccessRequire.requireNFTOwner(nftInfo, _msgSender());

    // require all values is 0 ?
    require(numOfGames > 0, "The number of games cannot be 0");
    // require(pieces >= 4, "too low pieces");
    // require(preRound >= 12 hours && preRound <= 30 days, "round duration must be between 12 hours and 30 days");
    require(!AccessRequire.roundInProgress(nftInfo), "Round in progress");
    NFTSettings.set(tokenAddr, tokenId, ticket, numOfGames, preRound, pieces);
    _startRound(nftInfo);
  }

  function startRound(NFTInfo memory nftInfo) public {
    // AccessRequire.requireNFTOwner(nftInfo, _msgSender());
    require(AccessRequire.isSetup(nftInfo), "Incomplete game setup");
    require(!AccessRequire.roundInProgress(nftInfo), "Round in progress");
    _startRound(nftInfo);
  }

  function _startRound(NFTInfo memory nftInfo) private {
    address tokenAddr = nftInfo.tokenAddr;
    uint256 tokenId = nftInfo.tokenId;
    uint256 gameRound = GameRound.getRound(tokenAddr, tokenId);
    GameRound.set(tokenAddr, tokenId, block.timestamp, gameRound + 1);
  }
}
