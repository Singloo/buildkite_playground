import { connectXeno, Xeno } from "src/xeno";
import { BROADCAST_POSITION, REMOVE_BOX } from "./components/Demo1/events";

type ALL_EVENTS = BROADCAST_POSITION | REMOVE_BOX;

export const xeno = new Xeno<ALL_EVENTS>();

export const withXeno = connectXeno(xeno);
