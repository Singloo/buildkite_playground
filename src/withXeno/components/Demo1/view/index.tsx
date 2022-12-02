import { Demo1Store } from "src/withXeno/stores/Demo1/demo1.store";
import { Demo1Controller } from "../controller";
import { Button2 } from "src/components";
import { MovingBox } from "./style";
import { Box } from "../components";
import { useEffect, useState } from "react";
import { BoxManagerStore } from "src/withXeno/stores/BoxManager/boxManager.store";
import { xeno } from "src/withXeno/xeno";
type Demo1Props = {
  controller: Demo1Controller;
  demo1Store: Demo1Store;
  boxManagerStore: BoxManagerStore;
  name: string;
};

export const Demo1 = (props: Demo1Props) => {
  const { demo1Store, controller, boxManagerStore } = props;
  const [run, setRun] = useState(true);
  useEffect(() => {
    if (!run) return;
    const obsr = controller.startBoradcastPosition("movingline");
    const sub = obsr.subscribe(() => {});

    return () => sub.unsubscribe();
  }, [controller, run]);

  useEffect(() => {
    const unlisten = xeno.on("REMOVE_BOX", controller.onBoxRemove);
    return unlisten;
  }, [controller]);
  console.warn({ currentBoxes: boxManagerStore.currentBoxes });
  return (
    <div>
      <Button2 onClick={() => setRun(!run)}>{run ? "Stop" : "Start"}</Button2>
      {boxManagerStore.currentBoxes.map((id) => (
        <Box key={"box" + id} id={id} />
      ))}
      <MovingBox $run={run} id={"movingline"} />
    </div>
  );
};
