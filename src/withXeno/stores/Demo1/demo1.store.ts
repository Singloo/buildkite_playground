import { Injectable } from "src/withXeno/inversify";
import { observable, action, makeObservable } from "mobx";

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
    top: 0,
    left: 0,
    h: 0,
    w: 0,
  };

  count = 0;

  setPosition = (position: {
    top: number;
    left: number;
    h: number;
    w: number;
  }) => {
    this.position = position;
  };

  increase = () => {
    this.count += 1;
  };
}
