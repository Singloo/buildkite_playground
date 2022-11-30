import { BaseController } from "src/types";
import { ClassLike, resolve } from "src/withXeno/inversify";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
export const connectStores =
  <
    C extends BaseController,
    Stores extends Record<string, ClassLike<any>>,
    IncluedProps = { controller: C | undefined } & { [K in keyof Stores]: any }
  >(
    controller: ClassLike<C> | undefined,
    stores: Stores
  ) =>
  <P extends IncluedProps & JSX.IntrinsicAttributes>(
    Comp: React.FunctionComponent<P>
  ) => {
    const compProps: Partial<
      { controller: C | undefined } & { [K in keyof Stores]: any }
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
