// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";
import { Puzzle } from "../codegen/index.sol";
import { Random } from "../libraries/Random.sol";

contract ShuffleArraySystem is System {
  function shuffleArray(uint256 grid) public view returns (uint256[] memory) {
    uint256 gridNum = grid * grid;
    uint256[] memory array = new uint256[](gridNum);

    // init array
    for (uint8 i = 0; i < gridNum; i++) {
      array[i] = i + 1;
    }

    for (uint256 i = gridNum - 1; i > 0; i--) {
      uint256 j = Random.getRandomNumber(i) % (i + 1);
      (array[i], array[j]) = (array[j], array[i]);
    }
    return array;
  }
}
