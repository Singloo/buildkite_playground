import { BaseController } from "src/types";
import { Demo1Service } from "src/withXeno/services/Demo1/demo1.service";

export class BoxController extends BaseController {
  constructor(private service: Demo1Service) {
    super();
  }
}
