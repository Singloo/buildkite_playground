import { ReplaySubject, ObservableInput } from "rxjs";
import React from "react";
export type TFutureTask<P = unknown> = {
  params: P;
  subject: ReplaySubject<P>;
};

export type TXenoMessage<
  Name extends string = string,
  Payload extends unknown = unknown,
  Res extends unknown = unknown
> = {
  name: Name;
  uniqKey?: string;
  payload: Payload;
  response?: Res;
};

export type IReactComponent<P = any> =
  | React.ClassicComponentClass<P>
  | React.ComponentClass<P>
  | React.FunctionComponent<P>
  | React.ForwardRefExoticComponent<P>;

export interface IXenoInjectedProps<Events extends TXenoMessage> {
  on: FuncWithEventNameHandler<Events>;
  trigger: FuncWithEventNamePayload<Events>;
}

export type RequiredObject<O> = Record<
  string | number | symbol,
  unknown
> extends O
  ? { [K in keyof O]-?: O[K] }
  : O;

export type HandlerFunction<T extends TXenoMessage, EventName = T["name"]> = (
  params: Extract<T, { name: EventName }>["payload"]
) => ObservableInput<unknown> | undefined | void;

export type FuncWithEventNamePayload<
  T extends TXenoMessage,
  Return = unknown
> = <E extends T["name"]>(
  name: E,
  params: Extract<T, { name: E }>["payload"]
) => Return;

export type FuncWithEventNameHandler<
  T extends TXenoMessage,
  Return = unknown
> = <E extends T["name"]>(name: E, handler: HandlerFunction<T, E>) => Return;
