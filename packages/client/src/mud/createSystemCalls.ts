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
import { Hex, fromBytes, hexToString, isHex } from "viem";

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
  { worldContract, waitForTransaction, publicClient }: SetupNetworkResult,
  { Puzzle }: ClientComponents,
) {
  const increment = async () => {
    /*
     * Because IncrementSystem
     * (https://mud.dev/templates/typescript/contracts#incrementsystemsol)
     * is in the root namespace, `.increment` can be called directly
     * on the World contract.
     */
    
    try {
      const tx = await worldContract.write.createGame([4]);
      const res = await publicClient.waitForTransactionReceipt({ hash: tx });
      console.log(res);
      
      await waitForTransaction(tx)

    } catch (error) {
      console.log(error);
    }
    
    return getComponentValue(Puzzle, addressToEntityID("0xeA8C71E9A0B1c217A6DAa37fBEb777a203087a37"));
  };
  const addressToEntityID = (address: Hex) =>
    encodeEntity({ address: "address" }, { address });

  return {
    increment,
  };
}
