import { BoxController } from "./Box.controller";
import { MBox } from "./Box";
import { connectStores } from "src/withXeno/util/connect";
import { Demo1Store } from "src/withXeno/stores/Demo1/demo1.store";

const Enhanced = connectStores({ demo1Store: Demo1Store }, BoxController)(MBox);

const getBox = () =>
  connectStores({ demo1Store: Demo1Store }, BoxController)(MBox);
export default Enhanced;

export { getBox };
