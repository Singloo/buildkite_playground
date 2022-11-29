import { Instantiable } from "src/withXeno/inversify";
import { Demo1Service } from "src/withXeno/services/Demo1/demo1.service";
import { BaseController } from "src/types";
import { xeno } from "src/withXeno/xeno";
import { concatMap, interval, of, switchMap } from "rxjs";
@Instantiable()
export class Demo1Controller extends BaseController {
  constructor(private service: Demo1Service) {
    super();
  }

  componentDidMount(): void {}

  startBoradcastPosition = (elmId: string) => {
    return interval(Math.round(1000 / 60)).pipe(
      switchMap(() => of(this.service.getElmPosition(elmId))),
      switchMap((position) => {
        return xeno.trigger("BORADCAST_POSITION", position);
      })
    );
  };
  componentWillUnmount(): void {}

  onClickIncrease = () => {
    this.service.increase();
  };
}
