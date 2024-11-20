// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { Script } from "forge-std/Script.sol";
import { console } from "forge-std/console.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { RESOURCE_SYSTEM } from "@latticexyz/world/src/worldResourceTypes.sol";
import { IWorld } from "../src/codegen/world/IWorld.sol";
import { WorldResourceIdLib } from "@latticexyz/world/src/WorldResourceId.sol";
import { ERC721Registry } from "@latticexyz/world-modules/src/codegen/index.sol";
import { RESOURCE_TABLE } from "@latticexyz/store/src/storeResourceTypes.sol";
import { IERC721Mintable } from "@latticexyz/world-modules/src/modules/erc721-puppet/IERC721Mintable.sol";
import { ResourceId } from "@latticexyz/store/src/ResourceId.sol";

contract PostDeploy is Script {
  function run(address worldAddress) external {
    // Specify a store so that you can use tables directly in PostDeploy
    StoreSwitch.setStoreAddress(worldAddress);

    // Load the private key from the `PRIVATE_KEY` environment variable (in .env)
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    address myAddress = vm.addr(deployerPrivateKey);
    // Start broadcasting transactions from the deployer account
    vm.startBroadcast(deployerPrivateKey);

    // ------------------ EXAMPLES ------------------

    // ResourceId systemId = WorldResourceIdLib.encode(RESOURCE_SYSTEM, "", "ShuffleArraySystem");
    // world.registerRootFunctionSelector(systemId, "incrementMessage(string)", bytes4(0x80e40162));

    // ResourceId namespaceResource = WorldResourceIdLib.encodeNamespace(bytes14("PuzzleX"));
    // ResourceId erc721RegistryResource = WorldResourceIdLib.encode(RESOURCE_TABLE, "erc721-puppet", "ERC721Registry");
    // address tokenAddress = ERC721Registry.getTokenAddress(erc721RegistryResource, namespaceResource);
    // // Use the token
    // console.log("tokenAddress:", tokenAddress);
    // IERC721Mintable erc721 = IERC721Mintable(tokenAddress);
    // // Mint two tokens
    // // console.log("Owner of beef:", erc721.ownerOf(1));
    // erc721.mint(myAddress, 1);
    // console.log("Owner of beef:", erc721.ownerOf(1));
    vm.stopBroadcast();
  }
}
