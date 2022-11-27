import { Injectable } from 'src/withXeno/inversify';
import { observable, action, makeObservable } from 'mobx';

@Injectable({ singleton: true })
export class Demo1Store {
  constructor() {
    makeObservable(this, {
      position: observable,
      setPosition: action,
    });
  }

  position = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
  };

  setPosition = (position: { x1: number; x2: number; y1: number; y2: number }) => {
    this.position = position;
  };
}
