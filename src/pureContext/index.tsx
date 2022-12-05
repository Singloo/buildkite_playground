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
    <div className={"border border-green-300 p-3"}>
      <RenderCounter />
      <div>{"Count1 " + count1}</div>
      <button
        className={"border rounded-lg px-2 py-1 border-sky-500"}
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
    <div className={"border border-purple-300 p-3"}>
      <RenderCounter />
      <div>{"Count2 " + count2}</div>
      <button
        className={"border rounded-lg px-2 py-1 border-sky-500"}
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
    <div className={"border border-red-300 p-3"}>
      <RenderCounter />
      <div>{"count3 " + count3}</div>
      <button
        className={"border rounded-lg px-2 py-1 border-sky-500"}
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
    <div className={"flex flex-col mx-auto gap-2 mt-3"}>
      <Comp1 />
      <Comp2 />
      <Comp3 />
    </div>
  );
}

export default withContextProvider(App);
