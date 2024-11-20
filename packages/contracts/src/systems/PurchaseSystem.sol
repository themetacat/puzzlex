// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";
import { NFTSettings, NFTSettingsData, PlayableGames, PlayableGamesData, TotalSupply } from "../codegen/index.sol";
import { NFTInfo } from "../libraries/Struct.sol";

contract PurchaseSystem is System {
  function purchaseGame(NFTInfo memory nftInfo) public payable {

    address tokenAddr = nftInfo.tokenAddr;
    uint256 tokenId = nftInfo.tokenId;
    uint256 totalSupply = TotalSupply.get(tokenAddr);
    require(totalSupply >= tokenId, "No such NFT");

    NFTSettingsData memory settingData = NFTSettings.get(tokenAddr, tokenId);
    uint256 ticket = settingData.ticket;
    uint256 numOfGames = settingData.numOfGames;
    // !!!or require other, ensure settingData exist
    require(ticket != 0, "NFT not setup");

    require(ticket == _msgValue(), "Insufficient funds sent");

    PlayableGamesData memory playableGames = PlayableGames.get(tokenAddr, tokenId, _msgSender());
    uint256 timesOwned = playableGames.times;

    uint256 aveTicket = (ticket / numOfGames);
    if(timesOwned != 0){
      aveTicket = (timesOwned * playableGames.ticket + ticket) / (numOfGames+timesOwned);
    }
    PlayableGames.set(tokenAddr, tokenId, _msgSender(), numOfGames + timesOwned, aveTicket);
  }

}
