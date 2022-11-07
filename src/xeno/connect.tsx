import React, {useEffect, useRef} from 'react';
import {Xeno} from './xeno';
import {IReactComponent, HandlerFunction} from './type';
export const connectXeno =
  <T,>(xeno: Xeno<T>) =>
  (Comp: IReactComponent<any>) => {
    const EnhancedComp = (props: any) => {
      const unlistens = useRef<Function[]>([]);
      const on = <K extends keyof T>(
        eventName: K,
        handler: HandlerFunction<T, K>,
      ) => {
        const unlisten = xeno.on(eventName, handler);
        unlistens.current.push(unlisten);
        return unlisten;
      };
      useEffect(() => {
        const cleanListeners = () => {
          unlistens.current.forEach(func => func());
        };
        return () => {
          cleanListeners();
        };
      }, []);

      return <Comp {...props} on={on} trigger={xeno.trigger} />;
    };
    EnhancedComp.displayName = 'Xeno-connected-' + Comp.displayName;
    return EnhancedComp;
  };
