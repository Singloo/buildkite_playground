import { Demo1Store } from "src/withXeno/stores/Demo1/demo1.store";
import { Box } from "./style";
import { useState } from "react";
import { randomNumber } from "src/withXeno/util";
import { useEffect } from "react";
import { BoxController } from "./Box.controller";
import { xeno } from "src/withXeno/xeno";

type MBoxProps = {
  demo1Store: Demo1Store;
  idx: number;
  controller: BoxController;
};

export const MBox = ({ demo1Store, controller, idx }: MBoxProps) => {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [size, setSize] = useState(50);
  const { position } = demo1Store;
  useEffect(() => {
    setSize(randomNumber(50, 100));
    setTop(randomNumber(0, 90));
    setLeft(randomNumber(0, 90));
    controller.setElmPosition("box" + idx);
  }, [idx, controller]);

  useEffect(() => {
    const unlisten = xeno.on("BORADCAST_POSITION", (movingLine) => {
      if (
        movingLine.left > position.left &&
        movingLine.left < position.left + position.w
      ) {
        // intersected
        console.warn("intersected");
      }
    });
    return unlisten;
  }, [position]);
  return (
    <Box
      id={"box" + idx}
      className={"bg-teal-300 border rounded-sm border-purple-400"}
      $size={size}
      style={{
        left: left + "%",
        top: top + "%",
      }}
    />
  );
};
