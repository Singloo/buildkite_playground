import { ReplaySubject, ObservableInput } from "rxjs";
import React from "react";
export type TFutureTask<P = unknown> = {
  params: P;
  subject: ReplaySubject<P>;
};

export type TXenoMessage<K extends string = string, P = unknown> = {
  name: K;
  uniqKey?: string;
  payload: P;
};

export type IReactComponent<P = any> =
  | React.ClassicComponentClass<P>
  | React.ComponentClass<P>
  | React.FunctionComponent<P>
  | React.ForwardRefExoticComponent<P>;

export interface IXenoInjectedProps<Events extends TXenoMessage> {
  on: FuncWithEventNamePayload<Events>;
  trigger: FuncWithEventNameHandler<Events>;
}

export type RequiredObject<O> = O extends object
  ? { [K in keyof O]-?: O[K] }
  : O;

export type HandlerFunction<T extends TXenoMessage, EventName = T["name"]> = (
  params: Extract<T, { name: EventName }>["payload"]
) => ObservableInput<unknown> | undefined | void;

export type FuncWithEventNamePayload<T extends TXenoMessage> = <
  E extends T["name"]
>(
  name: E,
  params: Extract<T, { name: E }>["payload"]
) => unknown;

export type FuncWithEventNameHandler<T extends TXenoMessage> = <
  E extends T["name"]
>(
  name: E,
  handler: HandlerFunction<T, E>
) => unknown;
