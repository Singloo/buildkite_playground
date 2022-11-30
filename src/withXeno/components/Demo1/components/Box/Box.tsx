import { Demo1Store } from "src/withXeno/stores/Demo1/demo1.store";
import { Box } from "./style";
import { useState } from "react";
import { randomNumber } from "src/withXeno/util";
import { useEffect } from "react";
import { BoxController } from "./Box.controller";
import { xeno } from "src/withXeno/xeno";
import { RenderCounter } from "src/components/RenderCounter";

type MBoxProps = {
  demo1Store: Demo1Store;
  id: number;
  controller: BoxController;
};

export const MBox = ({ demo1Store, controller, id }: MBoxProps) => {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [size, setSize] = useState(50);
  const [position, setPosition] = useState<{
    left: number;
    top: number;
    w: number;
    h: number;
  }>({ left: 0, top: 0, w: 0, h: 0 });
  useEffect(() => {
    setSize(randomNumber(50, 100));
    setTop(randomNumber(0, 90));
    setLeft(randomNumber(0, 90));
  }, [id]);
  const [isIntersected, setIntersected] = useState(false);

  useEffect(() => {
    if (!top || !left || size === 50) return;
    const position = controller.getElmPosition("box" + id);
    setPosition(position);
  }, [controller, id, top, left, size]);

  useEffect(() => {
    console.warn("listen", id);
    const unlisten = xeno.on("BORADCAST_POSITION", (movingLine) => {
      const isIntersected =
        movingLine.left > position.left &&
        movingLine.left < position.left + position.w;
      if (isIntersected) {
        // intersected
        setIntersected(true);
        console.warn("collide", id);
        controller.onBoxCollide(id);
      } else {
        setIntersected(false);
      }
    });
    return () => {
      console.warn("unlisten", id);
      unlisten();
    };
  }, [position, id, controller]);
  console.warn("box", id);
  return (
    <Box
      id={"box" + id}
      className={"bg-teal-300 border rounded-sm border-purple-400"}
      $size={size}
      style={{
        left: left + "%",
        top: top + "%",
        backgroundColor: isIntersected ? "red" : undefined,
      }}
    >
      {id}
      <RenderCounter />
    </Box>
  );
};
