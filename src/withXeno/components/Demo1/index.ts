import { Demo1 } from "./view";
import { connectStores } from "../../util/connect";
import { Demo1Store } from "../../stores/Demo1/demo1.store";
import { Demo1Controller } from "./controller";
import { BoxManagerStore } from "src/withXeno/stores/BoxManager/boxManager.store";

const EnahncedDemo1 = connectStores(
  {
    demo1Store: Demo1Store,
    boxManagerStore: BoxManagerStore,
  },
  Demo1Controller
)(Demo1);
export { EnahncedDemo1 };
