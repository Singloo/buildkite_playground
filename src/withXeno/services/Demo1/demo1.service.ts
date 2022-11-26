import { Injectable } from "@/withXeno/inversify";
import { Demo1Store } from "@/withXeno/stores/Demo1/demo1.store";

@Injectable()
export class Demo1Service {
  constructor(private demo1Store: Demo1Store) {}
}