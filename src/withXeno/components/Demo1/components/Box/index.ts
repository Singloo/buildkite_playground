import { BoxController } from "./Box.controller";
import { MBox } from "./Box";
import { connectStores } from "src/withXeno/util/connect";
import { Demo1Store } from "src/withXeno/stores/Demo1/demo1.store";

const Enhanced = connectStores(BoxController, { demo1Store: Demo1Store })(MBox);

export default Enhanced;
