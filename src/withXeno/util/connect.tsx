import { BaseController } from 'src/types';
import { ClassLike, resolve } from 'src/withXeno/inversify';
import { observer } from 'mobx-react-lite';
import React from 'react';
export const connectStores =
  <
    C extends BaseController,
    Stores extends Record<string, ClassLike<any>>,
    IncluedProps = { controller: C | undefined } & { [K in keyof Stores]: any },
  >(
    controller: ClassLike<C> | undefined,
    stores: Stores,
  ) =>
  <P extends IncluedProps & JSX.IntrinsicAttributes>(Comp: React.FunctionComponent<P>) => {
    const compProps: Partial<{ controller: C | undefined } & { [K in keyof Stores]: any }> = {};
    if (controller) {
      compProps['controller'] = resolve(controller);
    }
    Object.entries(stores).forEach(([key, value]) => {
      compProps[key as keyof Stores] = resolve(value as ClassLike<any>);
    });
    const ObserverComp = observer(Comp);
    function Enhanced(props: Omit<P, keyof IncluedProps>) {
      const _props = {
        ...props,
        ...compProps,
      } as P;
      return <ObserverComp {..._props} />;
    }
    return Enhanced;
  };
