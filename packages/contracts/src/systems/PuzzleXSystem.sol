// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";
import { Puzzle, PuzzleData } from "../codegen/index.sol";
import { SystemSwitch } from "@latticexyz/world-modules/src/utils/SystemSwitch.sol";
import { IWorld } from "../codegen/world/IWorld.sol";

contract PuzzleXSystem is System {
  function createGame(uint256 grid) public {
    require(grid >= 4, "Too few grids");
    address owner = _msgSender();

    uint256[] memory shuffleArray = abi.decode(
      SystemSwitch.call(abi.encodeCall(IWorld(_world()).shuffleArray, (grid))),
      (uint256[])
    );
    // uint256[] memory shuffleArray = IWorld(_world()).shuffleArray(grid);
    Puzzle.set(owner, block.timestamp, false, shuffleArray);
  }

  function move(uint256[] memory indexX, uint256[] memory indexY) public {
    address owner = _msgSender();
    PuzzleData memory puzzleData = Puzzle.get(owner);
    require(!puzzleData.gameFinished, "game finished");

    // require: does game time exceed NFT-session time
    require(indexX.length == indexY.length, "Different lengths");
  }
}
