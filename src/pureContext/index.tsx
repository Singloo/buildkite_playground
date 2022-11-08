import { useEffect } from "react";
import { constructContext } from "./context";
import { RenderCounter } from "../components/RenderCounter";

const { withContextProvider, useMyContext } = constructContext();

const Comp1 = () => {
  const { state, dispatch } = useMyContext();
  const { count1 } = state;
  console.warn("Comp1 render " + Date.now());
  useEffect(() => {
    console.warn("Comp1 count1 update");
  }, [state.count1]);
  return (
    <div>
      <RenderCounter />
      <div>{"Count1 " + count1}</div>
      <button
        onClick={() =>
          dispatch({ type: "INCREASE_1", payload: { count1: count1 + 1 } })
        }
      >
        {"Increase 1"}
      </button>
    </div>
  );
};

const Comp2 = () => {
  const { dispatch, state } = useMyContext();
  const { count2 } = state;
  console.warn("Comp2 render " + Date.now());
  return (
    <div>
      <div>{"Count2 " + count2}</div>
      <button
        onClick={() =>
          dispatch({ type: "INCREASE_2", payload: { count2: count2 + 1 } })
        }
      >
        {"Increase 2"}
      </button>
    </div>
  );
};

const Comp3 = () => {
  const { dispatch, state } = useMyContext();
  const { count3 } = state;
  console.warn("Comp3 render " + Date.now());
  return (
    <div>
      <div>{"count3 " + count3}</div>
      <button
        onClick={() =>
          dispatch({ type: "INCREASE_2", payload: { count3: count3 + 1 } })
        }
      >
        {"Increase 2"}
      </button>
    </div>
  );
};

function App() {
  return (
    <div>
      <Comp1 />
      <Comp2 />
      <Comp3 />
    </div>
  );
}

export default withContextProvider(App);
