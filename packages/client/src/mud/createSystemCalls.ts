/*
 * Create the system calls that the client can use to ask
 * for changes in the World state (using the System contracts).
 */

import { getComponentValue } from "@latticexyz/recs";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import {
  encodeEntity,
  decodeEntity,
} from "@latticexyz/store-sync/recs";
import { Hex, parseEther } from "viem";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  /*
   * The parameter list informs TypeScript that:
   *
   * - The first parameter is expected to be a
   *   SetupNetworkResult, as defined in setupNetwork.ts
   *
   *   Out of this parameter, we only care about two fields:
   *   - worldContract (which comes from getContract, see
   *     https://github.com/latticexyz/mud/blob/main/templates/react/packages/client/src/mud/setupNetwork.ts#L63-L69).
   *
   *   - waitForTransaction (which comes from syncToRecs, see
   *     https://github.com/latticexyz/mud/blob/main/templates/react/packages/client/src/mud/setupNetwork.ts#L77-L83).
   *
   * - From the second parameter, which is a ClientComponent,
   *   we only care about Counter. This parameter comes to use
   *   through createClientComponents.ts, but it originates in
   *   syncToRecs
   *   (https://github.com/latticexyz/mud/blob/main/templates/react/packages/client/src/mud/setupNetwork.ts#L77-L83).
   */
  { worldContract, waitForTransaction, publicClient, walletClient }: SetupNetworkResult,
  { Puzzle }: ClientComponents,
) {
  const addressToEntityID = (address: Hex) =>
    encodeEntity({ address: "address" }, { address });

  const setup = async () => {

    try {
      const tx = await worldContract.write.setup([{"tokenAddr": "0x60EA96f57B3a5715A90DAe1440a78f8bb339C92e", "tokenId": 1n}, parseEther('2'), 2n, 600n, 2n]);
      const res = await publicClient.waitForTransactionReceipt({ hash: tx });
      console.log(res);
      
      await waitForTransaction(tx)

    } catch (error) {
      console.log(error);
    }
    
    return getComponentValue(Puzzle, addressToEntityID("0xeA8C71E9A0B1c217A6DAa37fBEb777a203087a37"));
  };

  const purchase = async () => {
    
    try {
      const tx = await worldContract.write.purchaseGame([{"tokenAddr": "0x60EA96f57B3a5715A90DAe1440a78f8bb339C92e", "tokenId": 1n}],{value: parseEther("2")});
      const res = await publicClient.waitForTransactionReceipt({ hash: tx });
      console.log(res);
      
      await waitForTransaction(tx)

    } catch (error) {
      console.log(error);
    }
    
    return getComponentValue(Puzzle, addressToEntityID("0xeA8C71E9A0B1c217A6DAa37fBEb777a203087a37"));
  }

  const createGame = async () => {
    
    try {
      const tx = await worldContract.write.createGame([{"tokenAddr": "0x60EA96f57B3a5715A90DAe1440a78f8bb339C92e", "tokenId": 1n}]);
      const res = await publicClient.waitForTransactionReceipt({ hash: tx });
      console.log(res);
      
      await waitForTransaction(tx)

    } catch (error) {
      console.log(error);
    }
    
    return getComponentValue(Puzzle, addressToEntityID("0xeA8C71E9A0B1c217A6DAa37fBEb777a203087a37"));
  }

  const move = async () => {
    
    try {
      const tx = await worldContract.write.move([{"tokenAddr": "0x60EA96f57B3a5715A90DAe1440a78f8bb339C92e", "tokenId": 1n},[0n,0n,0n],[1n,3n,2n]]);
      const res = await publicClient.waitForTransactionReceipt({ hash: tx });
      console.log(res);
      
      await waitForTransaction(tx)

    } catch (error) {
      console.log(error);
    }
    
    return getComponentValue(Puzzle, addressToEntityID("0xeA8C71E9A0B1c217A6DAa37fBEb777a203087a37"));
  }

  const startRound = async () => {
    
    try {
      const tx = await worldContract.write.startRound([{"tokenAddr": "0x60EA96f57B3a5715A90DAe1440a78f8bb339C92e", "tokenId": 1n}]);
      const res = await publicClient.waitForTransactionReceipt({ hash: tx });
      console.log(res);
      
      await waitForTransaction(tx)

    } catch (error) {
      console.log(error);
    }
    
    return getComponentValue(Puzzle, addressToEntityID("0xeA8C71E9A0B1c217A6DAa37fBEb777a203087a37"));
  }

  const createNFT = async () => {
    
    try {
      const tx = await worldContract.write.mintNFT([1]);
      const res = await publicClient.waitForTransactionReceipt({ hash: tx });
      console.log(res);
      
      await waitForTransaction(tx)

    } catch (error) {
      console.log(error);
    }
    
    return getComponentValue(Puzzle, addressToEntityID("0xeA8C71E9A0B1c217A6DAa37fBEb777a203087a37"));
  }

  const getBonus = async () => {
    
    try {
      const tx = await worldContract.read.getBonusSingle([{"nftInfo": {"tokenAddr": "0x60EA96f57B3a5715A90DAe1440a78f8bb339C92e", "tokenId": 1n},"round": [1n], "player": walletClient.account.address}, false]);
      console.log(tx);
      
    } catch (error) {
      console.log(error);
    }
    
    return getComponentValue(Puzzle, addressToEntityID("0xeA8C71E9A0B1c217A6DAa37fBEb777a203087a37"));
  }
  
  const claimBonusSingle = async () => {
    try {
      const tx = await worldContract.write.claimBonusSingle([{"nftInfo": {"tokenAddr": "0x60EA96f57B3a5715A90DAe1440a78f8bb339C92e", "tokenId": 1n},"round": [1n], "player": walletClient.account.address}]);
      console.log(tx);
      await waitForTransaction(tx)
    } catch (error) {
      console.log(error);
    }
    
    return getComponentValue(Puzzle, addressToEntityID("0xeA8C71E9A0B1c217A6DAa37fBEb777a203087a37"));
  }

  return {
    setup,
    purchase,
    createGame,
    move,
    startRound,
    createNFT,
    getBonus,
    claimBonusSingle
  };
}
