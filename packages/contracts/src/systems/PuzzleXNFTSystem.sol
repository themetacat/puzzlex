// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";
import { TotalSupply, GameRecord } from "../codegen/index.sol";
import { MINT_FEE } from "../libraries/Constant.sol";
import { NamespaceOwner } from "@latticexyz/world/src/codegen/index.sol"; 
import { WorldResourceIdLib } from "@latticexyz/world/src/WorldResourceId.sol";
import { ERC721Registry } from "@latticexyz/world-modules/src/codegen/index.sol";
import { RESOURCE_TABLE } from "@latticexyz/store/src/storeResourceTypes.sol";
import { ResourceId } from "@latticexyz/store/src/ResourceId.sol";
import { IERC721Mintable } from "@latticexyz/world-modules/src/modules/erc721-puppet/IERC721Mintable.sol";

contract PuzzleXNFTSystem is System {
  function mintNFT() public payable {
    require(_msgValue() == MINT_FEE);
    ResourceId namespaceResource = WorldResourceIdLib.encodeNamespace(bytes14("PuzzleX"));
    ResourceId erc721RegistryResource = WorldResourceIdLib.encode(RESOURCE_TABLE, "erc721-puppet", "ERC721Registry");
    address tokenAddress = ERC721Registry.getTokenAddress(erc721RegistryResource, namespaceResource);
    IERC721Mintable erc721 = IERC721Mintable(tokenAddress);
    
    uint256 newTotalSupply = TotalSupply.get(tokenAddress) + 1;

    erc721.mint(_msgSender(), newTotalSupply);
    TotalSupply.set(tokenAddress, newTotalSupply);

    GameRecord.setPool(tokenAddress, newTotalSupply, 1, MINT_FEE);
  }

  function setOwner(address addr) public {
    // !!!require world owner
    ResourceId namespaceResource = WorldResourceIdLib.encodeNamespace(bytes14("PuzzleX"));
    NamespaceOwner.set(namespaceResource, addr);
  }

}