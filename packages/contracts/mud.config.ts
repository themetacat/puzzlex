import { defineWorld } from "@latticexyz/world";

export default defineWorld({
  tables: {
    Puzzle: {
      schema: {
        owner: "address",
        startTime: "uint256",
        gameFinished: "bool",
        picSeq: "uint256[]",
      },
      key: ["owner"],
    },
  },
});
