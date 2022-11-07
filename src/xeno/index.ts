import { Xeno } from "./xeno";
import { IXenoInjectedProps, TXenoMessage } from "./type";
const construct = <T extends TXenoMessage>(events: T) => {
  const xeno = new Xeno<T>();
};

export { connectXeno } from "./connect";
export { Xeno };
export { type IXenoInjectedProps, type TXenoMessage };
