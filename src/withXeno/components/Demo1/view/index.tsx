import { Demo1Store } from "src/withXeno/stores/Demo1/demo1.store";
import { Demo1Controller } from "../controller";
import { Button2 } from "src/components";
import { MovingBox } from "./style";
import { Box } from "../components";
import { useEffect, useState } from "react";
type Demo1Props = {
  controller: Demo1Controller;
  demo1Store: Demo1Store;
  name: string;
};

export const Demo1 = (props: Demo1Props) => {
  const { demo1Store, controller } = props;
  const [run, setRun] = useState(true);
  useEffect(() => {
    const obsr = controller.startBoradcastPosition("movingline");
    const sub = obsr.subscribe(() => {});

    return () => sub.unsubscribe();
  }, [controller]);
  return (
    <div>
      <Button2 onClick={() => setRun(!run)}>{run ? "Stop" : "Start"}</Button2>
      {new Array(10).fill(1).map((_, idx) => (
        <Box key={"box" + idx} idx={idx} />
      ))}
      <MovingBox $run={run} id={"movingline"} />
    </div>
  );
};
