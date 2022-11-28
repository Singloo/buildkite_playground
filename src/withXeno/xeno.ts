import { connectXeno, Xeno } from "src/xeno";
import { BROADCAST_POSITION } from "./components/Demo1/events";

type ALL_EVENTS = BROADCAST_POSITION;

export const xeno = new Xeno<ALL_EVENTS>();

export const withXeno = connectXeno(xeno);
