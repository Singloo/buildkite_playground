import { BaseController } from "src/types";
import { Instantiable } from "src/withXeno/inversify";
import { Demo1Service } from "src/withXeno/services/Demo1/demo1.service";

@Instantiable()
export class BoxController extends BaseController {
  constructor(private service: Demo1Service) {
    super();
  }
  componentDidMount(): void {}
  componentWillUnmount(): void {}

  setElmPosition = (elmId: string) => {
    this.service.getAndSetElmPosition(elmId);
  };

  getElmPosition = (elmId: string) => {
    return this.service.getElmPosition(elmId);
  };
}
