// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

library Random {
  /*
   * not real random
   */
  function getRandomNumber(uint256 i) internal view returns (uint256) {
    return uint256(keccak256(abi.encode(block.timestamp, block.number, i)));
  }

  function shuffleArray(uint256 grid) internal view returns (uint256[] memory) {
    uint256 gridNum = grid * grid;
    uint256[] memory array = new uint256[](gridNum);

    // init array
    for (uint256 i = 0; i < gridNum; i++) {
      array[i] = i + 1;
    }

    for (uint256 i = gridNum - 1; i > 0; i--) {
      uint256 j = getRandomNumber(i) % (i + 1);
      (array[i], array[j]) = (array[j], array[i]);
    }
    return array;
  }
}
