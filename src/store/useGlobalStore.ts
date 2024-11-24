// global state management using zustand
import { create } from "zustand";

type State = {
  detailsId: string; //detailsId: A string that holds the ID of the selected cryptocurrency (default is "bitcoin").
  setDetailsId: (id: string) => void; // setDetailsId: A function to update the detailsId.
};

//custom hook useGlobalStore
export const useGlobalStore = create<State>()((set) => ({
  detailsId: "bitcoin",

  /*
  set takes a callback function where:

    (state) represents the current state.
    { ...state, detailsId: id } spreads the current state and overrides the detailsId property with the new value.
  */
  setDetailsId: (id) => set((state) => ({ ...state, detailsId: id })),
}));
/*
What This Code Does:

    Creates a Global State Store:
        It manages a global piece of state (detailsId) which holds the selected cryptocurrency ID.
        Components anywhere in the app can access or update this state using the useGlobalStore hook.

    Provides a Method to Update State:
        setDetailsId allows components to change the value of detailsId dynamically.

*/

/*

import { useGlobalStore } from "./store/useGlobalStore";

const SomeComponent = () => {
  // Access the current detailsId and the setter function
  const detailsId = useGlobalStore((state) => state.detailsId);
  const setDetailsId = useGlobalStore((state) => state.setDetailsId);

  return (
    <div>
      <h1>Selected Coin: {detailsId}</h1>
      <button onClick={() => setDetailsId("ethereum")}>Switch to Ethereum</button>
    </div>
  );
};

*/
