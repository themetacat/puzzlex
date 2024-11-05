// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { Script } from "forge-std/Script.sol";
import { console } from "forge-std/console.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { RESOURCE_SYSTEM } from "@latticexyz/world/src/worldResourceTypes.sol";
import { IWorld } from "../src/codegen/world/IWorld.sol";

contract PostDeploy is Script {
  function run(address worldAddress) external {
    // Specify a store so that you can use tables directly in PostDeploy
    StoreSwitch.setStoreAddress(worldAddress);

    // Load the private key from the `PRIVATE_KEY` environment variable (in .env)
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

    // Start broadcasting transactions from the deployer account
    vm.startBroadcast(deployerPrivateKey);

    // ------------------ EXAMPLES ------------------

    // ResourceId systemId = WorldResourceIdLib.encode(RESOURCE_SYSTEM, "", "ShuffleArraySystem");
    // world.registerRootFunctionSelector(systemId, "incrementMessage(string)", bytes4(0x80e40162));

    // Call increment on the world via the registered function selector
    // uint32 newValue = IWorld(worldAddress).app__increment();
    // console.log("Increment via IWorld:", newValue);

    vm.stopBroadcast();
  }
}
