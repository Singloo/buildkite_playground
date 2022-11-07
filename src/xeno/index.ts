export { Xeno } from "./xeno";
export { connectXeno } from "./connect";
export { type IXenoInjectedProps, type TXenoMessage } from "./type";

const construct = <T>(events: T) => {
  const xeno = new Xeno<T>();
};
