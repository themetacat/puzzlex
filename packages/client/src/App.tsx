import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { singletonEntity } from "@latticexyz/store-sync/recs";

export const App = () => {
  const {
    components: { Puzzle },
    systemCalls: { setup, purchase, createGame, move, startRound, createNFT, getBonus, claimBonusSingle },
  } = useMUD();

  const counter = useComponentValue(Puzzle, singletonEntity);

  return (
    <>
      {/* <div>
        Counter: <span>{counter?.value ?? "??"}</span>
      </div> */}
      <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          console.log("new counter value:", await setup());
        }}
      >
        setup
      </button>
      <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          console.log("new counter value:", await startRound());
        }}
      >
        startRound
      </button>
      <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          console.log("new counter value:", await purchase());
        }}
      >
        buy
      </button>
      <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          console.log("new counter value:", await createGame());
        }}
      >
        create
      </button>
      <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          console.log("new counter value:", await move());
        }}
      >
        move
      </button>
      <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          console.log("new counter value:", await createNFT());
        }}
      >
        createNFT
      </button>
      <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          console.log("new counter value:", await getBonus());
        }}
      >
        getBonus
      </button>
      
      <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          console.log("new counter value:", await claimBonusSingle());
        }}
      >
        claimBonusSingle
      </button>
    </>
  );
};
