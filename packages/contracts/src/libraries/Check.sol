// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

library Check {
  function checkGameSuccess(uint256[] memory picSeq) internal pure returns (bool) {
    for (uint256 i; i < picSeq.length; i++) {
      if (picSeq[i] != i + 1) {
        return false;
      }
    }
    return true;
  }

  function findUserIndex(address[] memory playerArr, address player) internal pure returns (int256) {
    for (uint256 i = 0; i < playerArr.length; i++) {
      if (playerArr[i] == player) {
        return int256(i);
      }
    }
    return -1;
  }

  function binarySearch(uint256[] memory stepsArr, uint256 steps) internal pure returns (uint256) {
    uint256 left = 0;
    uint256 right = stepsArr.length;
    while (left < right) {
      uint256 mid = left + (right - left) / 2;
      if (stepsArr[mid] < steps) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return left;
  }

  function hasSameElements(uint256[] memory elements) public pure returns (bool) {
    for (uint256 i = 0; i < elements.length; i++) {
      for (uint256 j = i + 1; j < elements.length; j++) {
        if (elements[i] == elements[j]) {
          return true;
        }
      }
    }
    return false;
  }
}
