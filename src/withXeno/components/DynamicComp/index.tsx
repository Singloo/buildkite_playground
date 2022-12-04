import React, { useMemo } from "react";
type DynamicCompProps<P> = {
  getComp: () => React.FunctionComponent<P>;
};
export const DynamicComp = <P extends JSX.IntrinsicAttributes>({
  getComp,
  ...props
}: DynamicCompProps<P> & P) => {
  const Comp = useMemo(() => getComp(), [getComp]);
  return <Comp {...(props as unknown as P)} />;
};
