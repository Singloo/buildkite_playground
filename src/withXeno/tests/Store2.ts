import { Injectable } from "../inversify";
import { RStore3 } from "./Store3";

@Injectable({ singleton: true })
export class RStore2 {
  constructor(private store3: RStore3) {}
}
