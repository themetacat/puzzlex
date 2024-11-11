// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

library CheckStatus {
  function checkGameSuccess(uint256[] memory picSeq) internal pure returns (bool) {
    for (uint256 i; i < picSeq.length; i++) {
      if (picSeq[i] != i+1) {
        return false;
      }
    }
    return true;
  }
}
