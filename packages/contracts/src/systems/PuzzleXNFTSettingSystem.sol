// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";
import { NFTSettings, NFTSettingsData, GameRound, GameRoundData, GameRecord } from "../codegen/index.sol";
import { IERC721Mintable } from "@latticexyz/world-modules/src/modules/erc721-puppet/IERC721Mintable.sol";
import { NFTInfo } from "../libraries/Struct.sol";
import { AccessRequire } from "../libraries/AccessRequire.sol";
import { WorldResourceIdLib } from "@latticexyz/world/src/WorldResourceId.sol";
import { ERC721Registry } from "@latticexyz/world-modules/src/codegen/index.sol";
import { RESOURCE_TABLE } from "@latticexyz/store/src/storeResourceTypes.sol";
import { ResourceId } from "@latticexyz/store/src/ResourceId.sol";

contract PuzzleXNFTSettingSystem is System {
  function setup(NFTInfo memory nftInfo, uint256 ticket, uint256 numOfGames, uint256 preRound, uint256 pieces) public {
    // !!!require owner
    require(AccessRequire.isNFTOwner(nftInfo, _msgSender()), "Not Owner");

    address tokenAddr = nftInfo.tokenAddr;
    uint256 tokenId = nftInfo.tokenId;

    ResourceId namespaceResource = WorldResourceIdLib.encodeNamespace(bytes14("PuzzleX"));
    ResourceId erc721RegistryResource = WorldResourceIdLib.encode(RESOURCE_TABLE, "erc721-puppet", "ERC721Registry");
    address tokenAddress = ERC721Registry.getTokenAddress(erc721RegistryResource, namespaceResource);
    require(tokenAddress == tokenAddr, "Token is not allowed to be set");

    // require all values is 0 ?
    require(numOfGames > 0, "The number of games cannot be 0");
    // require(pieces >= 4, "too low pieces");
    // require(preRound >= 12 hours && preRound <= 30 days, "round duration must be between 12 hours and 30 days");
    require(!AccessRequire.roundInProgress(nftInfo), "Round in progress");
    NFTSettings.set(tokenAddr, tokenId, ticket, numOfGames, preRound, pieces);

    _updatePool(nftInfo);
    _startRound(nftInfo);
  }

  function startRound(NFTInfo memory nftInfo) public {
    // !!!require owner
    require(AccessRequire.isNFTOwner(nftInfo, _msgSender()), "Not Owner");
    require(AccessRequire.isSetup(nftInfo), "Incomplete game setup");
    require(!AccessRequire.roundInProgress(nftInfo), "Round in progress");

    _updatePool(nftInfo);
    _startRound(nftInfo);
  }

  function _startRound(NFTInfo memory nftInfo) private {
    address tokenAddr = nftInfo.tokenAddr;
    uint256 tokenId = nftInfo.tokenId;
    uint256 gameRound = GameRound.getRound(tokenAddr, tokenId);
    GameRound.set(tokenAddr, tokenId, block.timestamp, gameRound + 1);
  }

  /*
  * before the <start round>
  */
  function _updatePool(NFTInfo memory nftInfo) private {
    address tokenAddr = nftInfo.tokenAddr;
    uint256 tokenId = nftInfo.tokenId;
   uint256 gameRound = GameRound.getRound(tokenAddr, tokenId);
    if (gameRound > 0) {
      uint256 pool = GameRecord.getPool(tokenAddr, tokenId, gameRound);
      GameRecord.setPool(tokenAddr, tokenId, gameRound+1, (10 * pool) / 100);
    }
  }
}
