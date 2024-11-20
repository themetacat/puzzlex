import { defineWorld } from "@latticexyz/world";
import { encodeAbiParameters, stringToHex } from "viem";
 
const erc721ModuleArgs = encodeAbiParameters(
  [
    { type: "bytes14" },
    {
      type: "tuple",
      components: [{ type: "string" }, { type: "string" }, { type: "string" }],
    },
  ],
  [stringToHex("PuzzleX", { size: 14 }), ["PuzzleX", "PX", "http://www.example.com/base/uri/goes/here"]],
);


export default defineWorld({
  tables: {
    Puzzle: {
      schema: {
        tokenAddr: "address",
        tokenId: "uint256",
        owner: "address",
        startTime: "uint256",
        round: "uint256",
        gameFinished: "bool",
        picSeq: "uint256[]",
      },
      key: ["tokenAddr", "tokenId", "owner"],
    },
    PlayableGames: {
      schema: {
        tokenAddr: "address",
        tokenId: "uint256",
        buyer: "address",
        times: "uint256",
        ticket: "uint256"
      },
      key: ["tokenAddr", "tokenId", "buyer"],
    },
    NFTSettings: {
      schema: {
        tokenAddr: "address",
        tokenId: "uint256",
        ticket: "uint256",
        numOfGames: "uint256",
        perRound: "uint256",
        pieces: "uint256"
      },
      key: ["tokenAddr", "tokenId"],
    },
    GameRound: {
      schema: {
        tokenAddr: "address",
        tokenId: "uint256",
        startTime: "uint256",
        round: "uint256",
      },
      key: ["tokenAddr", "tokenId"],
    },
    GameRecord: {
      schema: {
        tokenAddr: "address",
        tokenId: "uint256",
        round: "uint256",
        playTimes: "uint256",
        successTimes: "uint256",
        successPlayer: "uint256",
        pool: "uint256"
      },
      key: ["tokenAddr", "tokenId", "round"],
    },
    PlayerGameRecord: {
      schema: {
        player: "address",
        tokenAddr: "address",
        tokenId: "uint256",
        round: "uint256",
        step: "uint256",
        totalStep: "uint256",
        minStep: "uint256",
        playTimes: "uint256",
        successTimes: "uint256",
      },
      key: ["tokenAddr", "tokenId", "player", "round"],
    },
    GameActivityTimes: {
      schema: {
        tokenAddr: "address",
        tokenId: "uint256",
        round: "uint256",
        times: "uint256",
      },
      key: ["tokenAddr", "tokenId", "round"],
    },
    PlayerClaim: {
      schema: {
        player: "address",
        tokenAddr: "address",
        tokenId: "uint256",
        round: "uint256",
        claimed: "bool"
      },
      key: ["tokenAddr", "tokenId", "player", "round"],
    },
    // !!! single NFT or all NFT
    PlayerWithdrawn: {
      schema: {
        player: "address",
        tokenAddr: "address",
        tokenId: "uint256",
        amount: "uint256"
      },
      key: ["tokenAddr", "tokenId", "player"],
    },
    RankRecord: {
      schema: {
        tokenAddr: "address",
        tokenId: "uint256",
        round: "uint256",
        players: "address[]",
        steps: "uint256[]",
      },
      key: ["tokenAddr", "tokenId", "round"],
    },
    TotalSupply: {
      schema: {
        tokenAddr: "address",
        totalSupply: "uint256"
      },
      key: ["tokenAddr"],
    },
    NFTData: {
      schema: {
        tokenAddr: "address",
        tokenId: "uint256",
        name: "bytes32"
      },
      key: ["tokenAddr", "tokenId"],
    },
  },
  // systems: {
  //   PuzzleXNFTSettingSystem: {
  //     name: "settingSystem",
  //     openAccess: false
  //   }
  // },
  modules: [
    // {
    //   artifactPath: "@latticexyz/world-modules/out/PuppetModule.sol/PuppetModule.json",
    //   root: false,
    //   args: [],
    // },
    {
      artifactPath: "@latticexyz/world-modules/out/ERC721Module.sol/ERC721Module.json",
      root: false,
      args: [
        {
          type: "bytes",
          value: erc721ModuleArgs,
        },
      ],
    },
  ],
});
