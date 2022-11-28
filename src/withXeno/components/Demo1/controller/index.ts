import { Instantiable } from "src/withXeno/inversify";
import { Demo1Service } from "src/withXeno/services/Demo1/demo1.service";
import { BaseController } from "src/types";

@Instantiable()
export class Demo1Controller extends BaseController {
  constructor(private service: Demo1Service) {
    super();
  }

  componentDidMount(): void {}
  componentWillUnmount(): void {}

  onClickIncrease = () => {
    this.service.increase();
  };
}
