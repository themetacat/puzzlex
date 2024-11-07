import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import RouterList from "./router";
import './reset.css';

const route = createBrowserRouter([
  ...RouterList,
  {
      path: '*',
      element: <Navigate to='/' />
  }
]);


export const App = () => {
  const {
    components: { Puzzle },
    systemCalls: { increment },
  } = useMUD();

  const counter = useComponentValue(Puzzle, singletonEntity);

  return (
    <>
      {/* <div>
        Counter: <span>{counter?.value ?? "??"}</span>
      </div> */}
      {/* <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          console.log("new counter value:", await increment());
        }}
      >
        Increment
      </button> */}
      <RouterProvider router={route} />
    </>
  );
};
