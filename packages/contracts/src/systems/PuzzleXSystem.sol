// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";
import { Puzzle, PuzzleData, PlayableGames, NFTSettings, NFTSettingsData, GameRecord, PlayerGameRecord, PlayerGameRecordData, GameRound } from "../codegen/index.sol";
import { SystemSwitch } from "@latticexyz/world-modules/src/utils/SystemSwitch.sol";
import { IWorld } from "../codegen/world/IWorld.sol";
import { Random } from "../libraries/Random.sol";
import { CheckStatus } from "../libraries/CheckStatus.sol";
import { NFTInfo } from "../libraries/Struct.sol";
import { AccessRequire } from "../libraries/AccessRequire.sol";
import { ERC721System } from "@latticexyz/world-modules/src/modules/erc721-puppet/ERC721System.sol";

contract PuzzleXSystem is System {
  function createGame(NFTInfo memory nftInfo) public {
    require(AccessRequire.roundInProgress(nftInfo), "Round not in progress");
    address owner = _msgSender();
    address tokenAddr = nftInfo.tokenAddr;
    uint256 tokenId = nftInfo.tokenId;

    uint256 playableGames = PlayableGames.get(tokenAddr, tokenId, owner);
    require(playableGames > 0, "No play times");

    uint256 gamePieces = NFTSettings.getPieces(tokenAddr, tokenId);

    uint256[] memory shuffleArray = Random.shuffleArray(gamePieces);
    uint256 round = GameRound.getRound(tokenAddr, tokenId);

    PlayerGameRecordData memory playerGameRecordData = PlayerGameRecord.get(tokenAddr, tokenId, owner, round);

    Puzzle.set(tokenAddr, tokenId, owner, block.timestamp, round, false, shuffleArray);
    PlayableGames.set(tokenAddr, tokenId, owner, playableGames - 1);
    GameRecord.setPlayTimes(tokenAddr, tokenId, round, GameRecord.getPlayTimes(tokenAddr, tokenId, round) + 1);
    PlayerGameRecord.set(
      tokenAddr,
      tokenId,
      owner,
      round,
      0,
      playerGameRecordData.totalStep,
      playerGameRecordData.minStep,
      playerGameRecordData.playTimes + 1,
      playerGameRecordData.successTimes
    );
  }

  function move(NFTInfo memory nftInfo, uint256[] memory indexX, uint256[] memory indexY) public {
    address owner = _msgSender();
    address tokenAddr = nftInfo.tokenAddr;
    uint256 tokenId = nftInfo.tokenId;

    PuzzleData memory puzzleData = Puzzle.get(tokenAddr, tokenId, owner);
    uint256[] memory picSeq = puzzleData.picSeq;
    require(picSeq.length > 0, "no game");

    require(!puzzleData.gameFinished, "game finished");

    AccessRequire.gameInRound(nftInfo, owner);
    bool roundInProgress = AccessRequire.roundInProgress(nftInfo);
    if (!roundInProgress) {
      Puzzle.setGameFinished(tokenAddr, tokenId, owner, true);
    } else {
      uint256 xLength = indexX.length;
      require(xLength == indexY.length, "Different lengths");

      for (uint256 i; i < xLength; i++) {
        (picSeq[indexX[i]], picSeq[indexY[i]]) = (picSeq[indexY[i]], picSeq[indexX[i]]);
      }

      Puzzle.setPicSeq(tokenAddr, tokenId, owner, picSeq);

      bool gameSuccess = CheckStatus.checkGameSuccess(picSeq);
      if (gameSuccess) {
        Puzzle.setGameFinished(tokenAddr, tokenId, owner, gameSuccess);
      }
      _updatePlayerRecord(nftInfo, gameSuccess);
    }
  }

  function _updatePlayerRecord(NFTInfo memory nftInfo, bool gameSuccess) private {
    address player = _msgSender();
    address tokenAddr = nftInfo.tokenAddr;
    uint256 tokenId = nftInfo.tokenId;
    uint256 round = Puzzle.getRound(tokenAddr, tokenId, player);

    PlayerGameRecordData memory playerGameRecordData = PlayerGameRecord.get(tokenAddr, tokenId, player, round);
    if (gameSuccess) {
      uint256 minSteps = playerGameRecordData.minStep;
      uint256 newSteps = playerGameRecordData.step + 1;
      if (minSteps == 0 || newSteps < minSteps) {
        PlayerGameRecord.set(
          tokenAddr,
          tokenId,
          player,
          round,
          newSteps,
          playerGameRecordData.totalStep + 1,
          newSteps,
          playerGameRecordData.playTimes,
          playerGameRecordData.successTimes + 1
        );
      } else {
        PlayerGameRecord.set(
          tokenAddr,
          tokenId,
          player,
          round,
          newSteps,
          playerGameRecordData.totalStep + 1,
          minSteps,
          playerGameRecordData.playTimes,
          playerGameRecordData.successTimes + 1
        );
      }
      GameRecord.setSuccessTimes(tokenAddr, tokenId, round, GameRecord.getSuccessTimes(tokenAddr, tokenId, round) + 1);
    } else {
      PlayerGameRecord.set(
        tokenAddr,
        tokenId,
        player,
        round,
        playerGameRecordData.step + 1,
        playerGameRecordData.totalStep + 1,
        playerGameRecordData.minStep,
        playerGameRecordData.playTimes,
        playerGameRecordData.successTimes
      );
    }
  }
}
