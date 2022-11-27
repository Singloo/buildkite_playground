import { Demo1Store } from 'src/withXeno/stores/Demo1/demo1.store';
import { Demo1Controller } from '../demo1.controller';

type Demo1Props = {
  controller: Demo1Controller;
  demo1Store: Demo1Store;
  name:string
};

export const Demo1 = ({}: Demo1Props) => {
  return <div>{'Demo1'}</div>;
};
