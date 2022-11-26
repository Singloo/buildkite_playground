import { Injectable } from "../inversify";
import { RStore1 } from "./Store1";

@Injectable({ singleton: true })
export class RStore3 {
  constructor(private store1: RStore1) {}
}
