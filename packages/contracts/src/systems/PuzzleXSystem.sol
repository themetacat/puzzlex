// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";
import { Puzzle, PuzzleData, PlayableGames, PlayableGamesData, NFTSettings, NFTSettingsData, GameRecord, GameRecordData, PlayerGameRecord, PlayerGameRecordData, GameRound, RankRecord, RankRecordData, GameActivityTimes } from "../codegen/index.sol";
import { SystemSwitch } from "@latticexyz/world-modules/src/utils/SystemSwitch.sol";
import { IWorld } from "../codegen/world/IWorld.sol";
import { Random } from "../libraries/Random.sol";
import { Check } from "../libraries/Check.sol";
import { NFTInfo } from "../libraries/Struct.sol";
import { AccessRequire } from "../libraries/AccessRequire.sol";
import { ERC721System } from "@latticexyz/world-modules/src/modules/erc721-puppet/ERC721System.sol";
import { GameStatus } from "../codegen/common.sol";

contract PuzzleXSystem is System {
  function createGame(NFTInfo memory nftInfo) public {
    require(AccessRequire.roundInProgress(nftInfo), "Round not in progress");
    address owner = _msgSender();
    address tokenAddr = nftInfo.tokenAddr;
    uint256 tokenId = nftInfo.tokenId;

    PlayableGamesData memory playableGamesData = PlayableGames.get(tokenAddr, tokenId, owner);
    require(playableGamesData.times > 0, "No play times");

    uint256 gamePieces = NFTSettings.getPieces(tokenAddr, tokenId);

    uint256[] memory shuffleArray = Random.shuffleArray(gamePieces);
    uint256 round = GameRound.getRound(tokenAddr, tokenId);

    PlayerGameRecordData memory playerGameRecordData = PlayerGameRecord.get(tokenAddr, tokenId, owner, round);
    GameRecordData memory gameRecordData = GameRecord.get(tokenAddr, tokenId, round);

    Puzzle.set(tokenAddr, tokenId, owner, block.timestamp, round, GameStatus.INGAME, shuffleArray);
    PlayableGames.setTimes(tokenAddr, tokenId, owner, playableGamesData.times - 1);
    _updateGameActivityInfo(nftInfo, round, playerGameRecordData.playTimes + 1);
    GameRecord.set(
      tokenAddr,
      tokenId,
      round,
      gameRecordData.playTimes + 1,
      gameRecordData.successTimes,
      gameRecordData.successPlayer,
      gameRecordData.pool + playableGamesData.ticket
    );
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
    // !!!check arr value continuous
    address owner = _msgSender();
    address tokenAddr = nftInfo.tokenAddr;
    uint256 tokenId = nftInfo.tokenId;

    PuzzleData memory puzzleData = Puzzle.get(tokenAddr, tokenId, owner);
    uint256[] memory picSeq = puzzleData.picSeq;
    require(picSeq.length > 0, "no game");

    require(puzzleData.gameStatus == GameStatus.INGAME, "not in game");

    AccessRequire.gameInRound(nftInfo, owner);
    bool roundInProgress = AccessRequire.roundInProgress(nftInfo);
    if (!roundInProgress) {
      Puzzle.setGameStatus(tokenAddr, tokenId, owner, GameStatus.FINISHED);
    } else {
      uint256 xLength = indexX.length;
      require(xLength == indexY.length, "Different lengths");

      for (uint256 i; i < xLength; i++) {
        (picSeq[indexX[i]], picSeq[indexY[i]]) = (picSeq[indexY[i]], picSeq[indexX[i]]);
      }

      Puzzle.setPicSeq(tokenAddr, tokenId, owner, picSeq);

      bool gameSuccess = Check.checkGameSuccess(picSeq);
      _updatePlayerRecord(nftInfo, gameSuccess);
      if (gameSuccess) {
        Puzzle.setGameStatus(tokenAddr, tokenId, owner, GameStatus.SUCCESS);
      }
    }
  }

  function _updatePlayerRecord(NFTInfo memory nftInfo, bool gameSuccess) private {
    address player = _msgSender();
    address tokenAddr = nftInfo.tokenAddr;
    uint256 tokenId = nftInfo.tokenId;
    uint256 round = Puzzle.getRound(tokenAddr, tokenId, player);

    PlayerGameRecordData memory playerGameRecordData = PlayerGameRecord.get(tokenAddr, tokenId, player, round);
    uint256 minSteps = playerGameRecordData.minStep;
    uint256 newSteps = playerGameRecordData.step + 1;
    uint256 totalSteps = playerGameRecordData.totalStep + 1;
    if (gameSuccess) {
      if (minSteps == 0 || newSteps < minSteps) {
        PlayerGameRecord.set(
          tokenAddr,
          tokenId,
          player,
          round,
          newSteps,
          totalSteps,
          newSteps,
          playerGameRecordData.playTimes,
          playerGameRecordData.successTimes + 1
        );
        if (minSteps == 0) {
          GameRecord.setSuccessPlayer(
            tokenAddr,
            tokenId,
            round,
            GameRecord.getSuccessPlayer(tokenAddr, tokenId, round) + 1
          );
        }
        _updateRankRecord(nftInfo);
      } else {
        PlayerGameRecord.set(
          tokenAddr,
          tokenId,
          player,
          round,
          newSteps,
          totalSteps,
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
        newSteps,
        totalSteps,
        minSteps,
        playerGameRecordData.playTimes,
        playerGameRecordData.successTimes
      );
    }
  }

  function _updateRankRecord(NFTInfo memory nftInfo) private {
    address tokenAddr = nftInfo.tokenAddr;
    uint256 tokenId = nftInfo.tokenId;
    address player = _msgSender();

    uint256 gameRound = GameRound.getRound(tokenAddr, tokenId);

    RankRecordData memory rankRecordData = RankRecord.get(tokenAddr, tokenId, gameRound);
    address[] memory rankPlayersArr = rankRecordData.players;
    uint256[] memory rankStepsArr = rankRecordData.steps;

    int256 userIndex = Check.findUserIndex(rankPlayersArr, player);
    uint256 minSteps = PlayerGameRecord.getMinStep(tokenAddr, tokenId, player, gameRound);

    if (userIndex == -1) {
      (rankPlayersArr, rankStepsArr) = newInsPlayerStepsArr(rankPlayersArr, rankStepsArr, minSteps, player);
    } else {
      (rankPlayersArr, rankStepsArr) = newChangePlayerStepsArr(
        rankPlayersArr,
        rankStepsArr,
        minSteps,
        uint256(userIndex)
      );
    }
    RankRecord.set(tokenAddr, tokenId, gameRound, rankPlayersArr, rankStepsArr);
  }

  function newInsPlayerStepsArr(
    address[] memory rankPlayersArr,
    uint256[] memory rankStepsArr,
    uint256 minSteps,
    address player
  ) internal pure returns (address[] memory, uint256[] memory) {
    address[] memory newRankPlayersArr = new address[](rankPlayersArr.length + 1);
    uint256[] memory newRankStepsArr = new uint256[](rankStepsArr.length + 1);
    uint256 insertIndex = Check.binarySearch(rankStepsArr, minSteps);
    for (uint256 i = 0; i < insertIndex; i++) {
      newRankPlayersArr[i] = rankPlayersArr[i];
      newRankStepsArr[i] = rankStepsArr[i];
    }

    newRankPlayersArr[insertIndex] = player;
    newRankStepsArr[insertIndex] = minSteps;

    for (uint256 i = insertIndex; i < rankPlayersArr.length; i++) {
      newRankPlayersArr[i + 1] = rankPlayersArr[i];
      newRankStepsArr[i + 1] = rankStepsArr[i];
    }
    return (newRankPlayersArr, newRankStepsArr);
  }

  function newChangePlayerStepsArr(
    address[] memory rankPlayersArr,
    uint256[] memory rankStepsArr,
    uint256 minSteps,
    uint256 index
  ) internal pure returns (address[] memory, uint256[] memory) {
    rankStepsArr[index] = minSteps;
    while (index > 0 && rankStepsArr[index] < rankStepsArr[index - 1]) {
      (rankPlayersArr[index], rankPlayersArr[index - 1]) = (rankPlayersArr[index - 1], rankPlayersArr[index]);
      (rankStepsArr[index], rankStepsArr[index - 1]) = (rankStepsArr[index - 1], rankStepsArr[index]);
      index--;
    }
    return (rankPlayersArr, rankStepsArr);
  }

  function _updateGameActivityInfo(NFTInfo memory nftInfo, uint256 round, uint256 times) private {
    address tokenAddr = nftInfo.tokenAddr;
    uint256 tokenId = nftInfo.tokenId;
    // uint256 setTimes;
    uint256 activityTimes = GameActivityTimes.getTimes(tokenAddr, tokenId, round);
    if (times == 3) {
      GameActivityTimes.set(nftInfo.tokenAddr, nftInfo.tokenId, round, activityTimes + times);
    } else if (times > 3) {
      GameActivityTimes.set(nftInfo.tokenAddr, nftInfo.tokenId, round, activityTimes + 1);
    }
  }
}
