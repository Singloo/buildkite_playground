import { BaseController } from "src/types";
import { ClassLike, resolve, unionResolve } from "src/withXeno/inversify";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";

interface Enhanced<P> {
  (props: P): JSX.Element;
  displayName: string;
}

type Enhancer<IncluedProps> = <
  P extends IncluedProps & JSX.IntrinsicAttributes
>(
  Comp: React.FunctionComponent<P>
) => Enhanced<Omit<P, keyof IncluedProps>>;

function connectStores<
  Stores extends Record<string, ClassLike<any>>,
  IncluedProps = { [K in keyof Stores]: any }
>(stores: Stores): Enhancer<IncluedProps>;
function connectStores<
  Stores extends Record<string, ClassLike<any>>,
  C extends BaseController,
  IncluedProps = { controller: C } & { [K in keyof Stores]: any }
>(stores: Stores, controller: ClassLike<C>): Enhancer<IncluedProps>;
function connectStores<
  Stores extends Record<string, ClassLike<any>>,
  C extends BaseController,
  IncluedProps = { controller?: C } & { [K in keyof Stores]: any }
>(stores: Stores, controller?: ClassLike<C>): Enhancer<IncluedProps> {
  const enhanceComp = <P extends IncluedProps & JSX.IntrinsicAttributes>(
    Comp: React.FunctionComponent<P>
  ) => {
    const compProps: Partial<
      { controller?: C } & { [K in keyof Stores]: any }
    > = {};
    if (controller) {
      compProps["controller"] = resolve(controller);
    }
    Object.entries(stores).forEach(([key, value]) => {
      compProps[key as keyof Stores] = resolve(value as ClassLike<any>);
    });
    const CompObserver = observer(Comp);
    function Enhanced(props: Omit<P, keyof IncluedProps>) {
      const _props = {
        ...props,
        ...compProps,
      } as P;
      useEffect(() => {
        compProps.controller?.componentDidMount();
        return () => compProps.controller?.componentWillUnmount();
      }, []);
      return <CompObserver {..._props} />;
    }
    Enhanced.displayName =
      `connected-with-${controller?.name ?? ""}-${Object.values(stores)
        .map((o) => o.name)
        .join("-")}` + Comp.displayName;
    return Enhanced;
  };
  return enhanceComp;
}

export { connectStores };
