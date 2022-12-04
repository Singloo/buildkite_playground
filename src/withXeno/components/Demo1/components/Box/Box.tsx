import { Demo1Store } from "src/withXeno/stores/Demo1/demo1.store";
import { Box } from "./style";
import { useState } from "react";
import { randomNumber } from "src/withXeno/util";
import { useEffect } from "react";
import { BoxController } from "./Box.controller";
import { xeno } from "src/withXeno/xeno";
import { RenderCounter } from "src/components/RenderCounter";
import { motion } from "framer-motion";
import { BoxManagerStore } from "src/withXeno/stores/BoxManager/boxManager.store";

type MBoxProps = {
  demo1Store: Demo1Store;
  boxManagerStore: BoxManagerStore;
  id: number;
  controller: BoxController;
};

export const MBox = ({
  demo1Store,
  controller,
  id,
  boxManagerStore,
}: MBoxProps) => {
  const [top, setTop] = useState("0px");
  const [left, setLeft] = useState("0px");
  const [height, setHeight] = useState(50);
  const [width, setWidth] = useState(50);
  const [paddingLeft, setPaddingLeft] = useState(0);
  const [paddingRight, setPaddingRight] = useState(0);
  const { position } = demo1Store;
  useEffect(() => {
    const size = randomNumber(50, 100);
    setHeight(size);
    setWidth(size);
    setTop(randomNumber(0, 85) + "%");
    setLeft(randomNumber(0, 90) + "%");
  }, [id]);
  const [isIntersected, setIntersected] = useState(false);

  useEffect(() => {
    if (!top && !left && height === 50) return;
    controller.setElmPosition("box" + id);
    console.warn("position set", "id" + id);
  }, [controller, id, top, left, height]);

  useEffect(() => {
    console.warn("listen broad case", "id" + id, position);
    let fromRight = true;
    const unlisten = xeno.on("BORADCAST_POSITION", (movingLine) => {
      const _isIntersected =
        movingLine.left > position.left &&
        movingLine.left < position.left + position.w;
      const diff = position.w * 0.15;
      const lineCrossBox = fromRight
        ? movingLine.left <= position.left + diff
        : movingLine.left >= position.left + position.w - diff;
      if (_isIntersected) {
        // intersected
        setIntersected(true);
        const gap = fromRight
          ? position.left + position.w - movingLine.left
          : movingLine.left - position.left;
        fromRight ? setPaddingRight(gap) : setPaddingLeft(gap);
        if (lineCrossBox) {
          console.warn("collide", "id" + id);
          controller.onBoxCollide(id);
        }
      } else {
        if (movingLine.left < position.left) {
          fromRight = false;
        }
      }
    });
    return () => {
      console.warn("unlisten ", "id" + id, position);
      unlisten();
    };
  }, [position, id, controller]);
  console.warn("box render", "id" + id);
  return (
    <Box
      id={"box" + id}
      $size={height}
      style={{
        left: left,
        top: top,
        width,
        paddingLeft,
        paddingRight,
      }}
    >
      <motion.div
        className={"bg-teal-300 flex border rounded-sm border-purple-400"}
        style={{
          backgroundColor: isIntersected ? "red" : undefined,
          flex: 1,
        }}
      />

      <div className={"flex absolute top-0 right-0 flex-col"}>
        {id}
        <RenderCounter />
      </div>
    </Box>
  );
};
