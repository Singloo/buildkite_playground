import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from "react";

const INITIAL_STATE: IState = {
  count1: 0,
  count2: 0,
  count3: 0,
};

type IState = {
  count1: number;
  count2: number;
  count3: number;
};

const reducer = (
  state: IState,
  action: {
    type: string;
    payload: Partial<IState>;
  }
) => {
  switch (action.type) {
    default:
      return {
        ...state,
        ...action.payload,
      };
  }
};

export const constructContext = () => {
  const context = createContext<{
    state: IState;
    count1: string;
    dispatch: React.Dispatch<{
      type: string;
      payload: Partial<IState>;
    }>;
  }>(
    null as unknown as {
      state: IState;
      count1: string;
      dispatch: React.Dispatch<{
        type: string;
        payload: Partial<IState>;
      }>;
    }
  );
  const withContextProvider = <P extends object>(
    Comp: React.ComponentType<P>
  ) => {
    const Enhanced = (props: P) => {
      const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
      useEffect(() => {
        console.warn("dispatch update");
      }, [dispatch]);
      const count1 = useMemo(
        () => "Count1" + state.count1,
        [state.count1, dispatch]
      );
      useEffect(() => {
        console.warn("State change");
      }, [state]);
      return (
        <context.Provider value={{ state, dispatch, count1 }}>
          <Comp {...props} />
        </context.Provider>
      );
    };
    return Enhanced;
  };

  const useMyContext = () => useContext(context);
  const withContextConsumer = <P extends object, K extends keyof IState>(
    observes: K[],
    Comp: React.ComponentType<P>
  ): React.ComponentType<P & Pick<IState, K>> => {
    const Enhanced = (props: P & Pick<IState, K>) => {
      const { state } = useMyContext();
      const selectedState: Pick<IState, K> = observes
        .map((key) => ({ [key]: state[key] }))
        .reduce((prev, curr) => ({ ...prev, ...curr }), {}) as Pick<IState, K>;
      const memoed = useMemo(
        () => <Comp {...props} {...selectedState} />,
        [props, ...Object.values(selectedState)]
      );
      return memoed;
    };
    return Enhanced;
  };

  return {
    context,
    withContextProvider,
    withContextConsumer,
    useMyContext,
  };
};
