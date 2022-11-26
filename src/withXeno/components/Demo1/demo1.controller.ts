import { Instantiable } from "@/withXeno/inversify";
import { Demo1Service } from "@/withXeno/services/Demo1/demo1.service";

@Instantiable()
export class Demo1Controller {
  constructor(private service: Demo1Service) {}
}
