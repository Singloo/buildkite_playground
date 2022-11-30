import { TXenoMessage } from "src/xeno";

export type BROADCAST_POSITION = TXenoMessage<
  "BORADCAST_POSITION",
  {
    left: number;
    top: number;
    w: number;
    h: number;
  }
>;

export type REMOVE_BOX = TXenoMessage<"REMOVE_BOX", number>;
