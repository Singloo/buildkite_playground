import { Demo1 } from './view';
import { BaseController } from '../../../types';
import { connectStores } from '../../util/connect';
import { Demo1Store } from '../../stores/Demo1/demo1.store';
const EnahncedDemo1 = connectStores(BaseController, {
  demo1Store: Demo1Store,
})(Demo1);
export { EnahncedDemo1 };
