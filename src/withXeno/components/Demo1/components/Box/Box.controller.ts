import { BaseController } from "src/types";
import { Instantiable } from "src/withXeno/inversify";
import { Demo1Service } from "src/withXeno/services/Demo1/demo1.service";
import { xeno } from "src/withXeno/xeno";

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

  onBoxCollide = (id: number) => {
    xeno.trigger("REMOVE_BOX", id);
  };
}
