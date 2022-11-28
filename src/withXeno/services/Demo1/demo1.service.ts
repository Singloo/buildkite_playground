import { Injectable } from 'src/withXeno/inversify';
import { Demo1Store } from 'src/withXeno/stores/Demo1/demo1.store';

@Injectable()
export class Demo1Service {
  constructor(private demo1Store: Demo1Store) {}

  increase = () => {
    this.demo1Store.increase();
  };
}
