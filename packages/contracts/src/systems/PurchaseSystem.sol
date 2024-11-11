// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";
import { NFTSettings, NFTSettingsData, PlayableGames } from "../codegen/index.sol";
import { NFTInfo } from "../libraries/Struct.sol";

contract PurchaseSystem is System {
  function purchase(NFTInfo memory nftInfo) public payable {
    address tokenAddr = nftInfo.tokenAddr;
    uint256 tokenId = nftInfo.tokenId;

    NFTSettingsData memory settingData = NFTSettings.get(tokenAddr, tokenId);

    // or require other, ensure settingData exist
    require(settingData.ticket != 0, "NFT not setup");

    require(settingData.ticket == _msgValue(), "Insufficient funds sent");

    uint256 playableGames = PlayableGames.get(tokenAddr, tokenId, _msgSender());
    PlayableGames.set(tokenAddr, tokenId, _msgSender(), settingData.numOfGames + playableGames);
  }
}
