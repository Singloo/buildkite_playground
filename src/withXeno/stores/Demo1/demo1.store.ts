import { Injectable } from 'src/withXeno/inversify';
import { observable, action, makeObservable } from 'mobx';

@Injectable({ singleton: false })
export class Demo1Store {
  constructor() {
    makeObservable(this, {
      position: observable,
      count: observable,
      setPosition: action,
      increase: action,
    });
  }

  position = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
  };

  count = 0;

  setPosition = (position: { x1: number; x2: number; y1: number; y2: number }) => {
    this.position = position;
  };

  increase = () => {
    this.count += 1;
  };
}
