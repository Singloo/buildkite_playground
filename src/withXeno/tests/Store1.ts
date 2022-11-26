import { Injectable } from "../inversify";
import { RStore2 } from "./Store2";

@Injectable({ singleton: true })
export class RStore1 {
  constructor(private store2: RStore2) {}
}
