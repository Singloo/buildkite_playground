import { Demo1Controller } from "../demo1.controller";

type Demo1Props = {
  controller: Demo1Controller;
};

export const Demo1 = ({}: Demo1Props) => {
  return <div>{"Demo1"}</div>;
};
