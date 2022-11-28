import { Demo1Store } from "src/withXeno/stores/Demo1/demo1.store";
import { Box } from "./style";
import { useState } from "react";
import { randomNumber } from "src/withXeno/util";
import { useEffect } from "react";
import { BoxController } from "./Box.controller";

type MBoxProps = {
  demo1Store: Demo1Store;
  idx: number;
  controller: BoxController;
};

export const MBox = ({ demo1Store, idx }: MBoxProps) => {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [size, setSize] = useState(50);
  useEffect(() => {
    setSize(randomNumber(50, 100));
    setTop(randomNumber(0, 90));
    setLeft(randomNumber(0, 90));
  }, []);
  return (
    <Box
      className={"bg-teal-300 border rounded-sm border-purple-400"}
      $size={size}
      style={{
        left: left + "%",
        top: top + "%",
      }}
    />
  );
};
