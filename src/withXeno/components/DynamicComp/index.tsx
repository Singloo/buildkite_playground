import React, { useMemo } from "react";
type DynamicCompProps<P> = {
  getComp: () => React.ComponentType<P>;
};
export const DynamicComp = <P extends JSX.IntrinsicAttributes>({
  getComp,
  ...props
}: DynamicCompProps<P> & P) => {
  const Comp = useMemo(() => getComp(), [getComp]);
  return <Comp {...(props as unknown as P)} />;
};

export const getDynamicComp = <P extends JSX.IntrinsicAttributes>(
  getComp: () => React.ComponentType<P>
) => {
  const _DynamicComp = (props: P) => {
    return <DynamicComp getComp={getComp} {...props} />;
  };
  return _DynamicComp;
};
