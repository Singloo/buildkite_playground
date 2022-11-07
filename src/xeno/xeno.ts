import { ReplaySubject, of, from } from "rxjs";
import { mergeMap, switchMap, take } from "rxjs/operators";
import {
  TFutureTask,
  TXenoMessage,
  FuncWithEventNameHandler,
  FuncWithEventNamePayload,
} from "./type";
import { map2Array, toObservable, isDev } from "./util";
const log = (
  target: "LISTENER" | "SENDER",
  name: string | any,
  ...args: any[]
) => {
  if (isDev) {
    console.info(
      `[${target}]`,
      name,
      `${new Date().toISOString()}`,
      ...args
    );
  }
};
class Handlers {
  _handlers: Map<Function, Function> = new Map();
  _name: string;
  constructor(name: string) {
    this._name = name;
  }
  addHandler = (handler: Function) => {
    this._handlers.set(handler, handler);
    const removeListener = () => {
      if (!this._handlers.has(handler)) return;
      this._handlers.delete(handler);
      log("LISTENER", this._name, "UNLISTEN", "REAMINING", this.numOfListeners);
    };
    return removeListener;
  };
  getHandlers = () => {
    return map2Array(this._handlers, (v) => v[1]);
  };
  get numOfListeners() {
    return this._handlers.size;
  }
}

/**
 *
 *
 * @class Xeno3
 * implementation 2: each time create a new subject
 */

export class Xeno<Messages extends TXenoMessage> {
  events: Map<string, Handlers> = new Map();
  _futureEvents: Map<string, TFutureTask> = new Map();

  _cleanFutureEvent = <K extends Messages["name"]>(name: K) => {
    // const task = this._futureEvents.get(name);
    // if (!task?.subject.closed) task?.subject.unsubscribe();
    this._futureEvents.delete(name as string);
  };
  _addFutureEvent = (
    subject: ReplaySubject<any>,
    name: Messages["name"],
    params?: Messages["payload"]
  ) => {
    if (this._futureEvents.has(name as string)) {
      // already existed a future event, will replace the old one
      this._cleanFutureEvent(name);
    }
    this._futureEvents.set(name as string, {
      params,
      subject,
    });
  };
  _executeFutureEvent: FuncWithEventNameHandler<Messages> = (name, handler) => {
    //only first listener will receive event
    const task = this._futureEvents.get(name as string)!;
    of(handler(task.params))
      .pipe(switchMap(toObservable))
      .subscribe({
        next: (res) => {
          if (!task.subject.closed) task.subject.next(res);
        },
        complete: () => this._cleanFutureEvent(name),
      });
  };

  _checkIfHasFutureEvent: FuncWithEventNameHandler<Messages> = (
    name,
    handler
  ) => {
    if (this._futureEvents.has(name as string)) {
      log("LISTENER", name, "FUTURE TASK TRIGGERED");
      this._executeFutureEvent(name, handler);
    }
  };

  on: FuncWithEventNameHandler<Messages> = (name, handler) => {
    if (!this.events.get(name as string)) {
      this.events.set(name as string, new Handlers(name as string));
    }
    this._checkIfHasFutureEvent(name, handler);
    const unlisten = this.events.get(name as string)!.addHandler(handler);
    log(
      "LISTENER",
      name,
      "TOTAL",
      this.events.get(name as string)!.numOfListeners
    );

    return unlisten;
  };

  /**
   *
   *
   * @memberof Xeno3
   * implementation 2: each time create a new subject
   */
  trigger: FuncWithEventNamePayload<Messages> = (name, params) => {
    const handlerIns = this.events.get(name);
    const sub = new ReplaySubject<any>();
    if (!handlerIns || handlerIns.numOfListeners === 0) {
      log("SENDER", name, "FUTURE TASK");
      // no handlers
      this._addFutureEvent(sub, name, params);
      return sub.pipe(take(1));
    }
    // exist handlers
    from(
      // listeners are notified in this step
      handlerIns.getHandlers().map((_handler) => _handler(params))
    )
      .pipe(
        // if senders want to know results, this line will be executed
        mergeMap(toObservable)
      )
      .subscribe({
        next: (res) => {
          if (!sub.closed) {
            sub.next(res);
          }
        },
      });
    log("SENDER", name, "LISTENERS TRIGGERED", handlerIns.numOfListeners);
    return sub.pipe(take(handlerIns.numOfListeners));
  };
}
