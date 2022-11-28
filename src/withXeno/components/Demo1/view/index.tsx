import { Demo1Store } from "src/withXeno/stores/Demo1/demo1.store";
import { Demo1Controller } from "../demo1.controller";
import { Button2 } from "src/components";
import { MovingBox } from "./style";
import { Box } from "../components";

type Demo1Props = {
  controller: Demo1Controller;
  demo1Store: Demo1Store;
  name: string;
};

export const Demo1 = (props: Demo1Props) => {
  const { demo1Store, controller } = props;
  return (
    <div
      className={"flex flex-col flex-1 items-center border-violet-500 border"}
    >
      {new Array(10).fill(1).map((_, idx) => (
        <Box key={"box" + idx} idx={idx} />
      ))}
      <MovingBox />
    </div>
  );
};
