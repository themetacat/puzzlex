// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";
import { TotalSupply, GameRecord, NFTData } from "../codegen/index.sol";
import { MINT_FEE } from "../libraries/Constant.sol";
import { NamespaceOwner } from "@latticexyz/world/src/codegen/index.sol"; 
import { WorldResourceIdLib } from "@latticexyz/world/src/WorldResourceId.sol";
import { ERC721Registry } from "@latticexyz/world-modules/src/codegen/index.sol";
import { RESOURCE_TABLE } from "@latticexyz/store/src/storeResourceTypes.sol";
import { ResourceId } from "@latticexyz/store/src/ResourceId.sol";
import { IERC721Mintable } from "@latticexyz/world-modules/src/modules/erc721-puppet/IERC721Mintable.sol";
import { AccessControl } from "@latticexyz/world/src/AccessControl.sol";
import { IWorld } from "../codegen/world/IWorld.sol";
import { IPuzzleXNFTSettingSystem } from "../codegen/world/IPuzzleXNFTSettingSystem.sol";
import { NFTInfo } from "../libraries/Struct.sol";
import {SystemSwitch} from "@latticexyz/world-modules/src/utils/SystemSwitch.sol";
import { WorldContextConsumerLib } from "@latticexyz/world/src/WorldContext.sol";
import { IBaseWorld } from "@latticexyz/world/src/codegen/interfaces/IBaseWorld.sol";
import { RESOURCE_SYSTEM } from "@latticexyz/world/src/worldResourceTypes.sol";

contract PuzzleXNFTSystem is System {

//   function mintNFT(string memory name, address to, uint256 ticket, uint256 numOfGames, uint256 preRound, uint256 pieces) public payable {
  function mintNFT(string memory name, address to) public payable {

    require(_msgValue() == MINT_FEE, "Insufficient funds sent");

    (address tokenAddr, uint256 tokenId) = _mintNFT(name, to);
    GameRecord.setPool(tokenAddr, tokenId, 1, MINT_FEE);
    NFTInfo memory nftInfo = NFTInfo(tokenAddr, tokenId);

    // IWorld(_world()).setup(nftInfo, ticket, numOfGames, preRound, pieces);
    // SystemSwitch.call(abi.encodeCall(IWorld(_world()).setup, (nftInfo, ticket, numOfGames, preRound, pieces)));
    // address worldAddress = WorldContextConsumerLib._world();
    // bytes memory callData = abi.encodeCall(IPuzzleXNFTSettingSystem.setup, (nftInfo, ticket, numOfGames, preRound, pieces));
    // ResourceId systemResource = WorldResourceIdLib.encode(RESOURCE_SYSTEM, "", "settingSystem");
    // (bool success, ) = worldAddress.delegatecall(abi.encodeCall(IBaseWorld(worldAddress).call, (systemResource, callData)));
    // (bool success, ) = worldAddress.delegatecall(abi.encodeWithSignature("setup(NFTInfo, uint256, uint256, uint256, uint256)", nftInfo, ticket, numOfGames, preRound, pieces));
  }

  function _mintNFT(string memory name, address to) private returns(address, uint256) {
    ResourceId namespaceResource = WorldResourceIdLib.encodeNamespace(bytes14("PuzzleX"));
    ResourceId erc721RegistryResource = WorldResourceIdLib.encode(RESOURCE_TABLE, "erc721-puppet", "ERC721Registry");
    address tokenAddress = ERC721Registry.getTokenAddress(erc721RegistryResource, namespaceResource);
    IERC721Mintable erc721 = IERC721Mintable(tokenAddress);
    
    uint256 newTotalSupply = TotalSupply.get(tokenAddress) + 1;

    erc721.mint(to, newTotalSupply);
    TotalSupply.set(tokenAddress, newTotalSupply);
    NFTData.set(tokenAddress, newTotalSupply, bytes32(bytes(name)));
    return (tokenAddress, newTotalSupply);
  }

  function setOwner(address addr) public {
    // !!!require world owner
    ResourceId namespaceResource = WorldResourceIdLib.encodeNamespace(bytes14(""));
    AccessControl._requireAccess(namespaceResource, _msgSender());
    ResourceId puzzleXnamespaceResource = WorldResourceIdLib.encodeNamespace(bytes14("PuzzleX"));
    NamespaceOwner.set(puzzleXnamespaceResource, addr);
  }

}