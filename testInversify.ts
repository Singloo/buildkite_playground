import "reflect-metadata";
import { Container, injectable } from "inversify";

const CLASS_SYMBOL = Symbol("classSymbol");
export const container = new Container();

type ClassLike<T> = new (...args: any[]) => T;

export const Injectable = (name?: string, singleton?: boolean) => {
  return (target: ClassLike<any>) => {
    const res = injectable()(target);
    let classIdentifier = Symbol.for(target.name);
    if (typeof name !== "undefined") {
      classIdentifier = Symbol(name);
      Reflect.defineMetadata(CLASS_SYMBOL, classIdentifier, target);
    }
    const bind = container.bind<typeof target>(classIdentifier).to(target);
    if (singleton) {
      console.log("[Injectable] [singleton]", target);
      bind.inSingletonScope();
    }
    return res;
  };
};

const getClassSymbol = (target: ClassLike<any>) => {
  const storedSymbol = Reflect.getMetadata(CLASS_SYMBOL, target);
  return storedSymbol ?? Symbol.for(target.name);
};

export const resolve = <T extends any>(target: ClassLike<T>): T => {
  const paramTypes = Reflect.getMetadata("design:paramtypes", target);
  const identifier = getClassSymbol(target);
  if (!paramTypes) return container.get(identifier);
  const args: any[] = (paramTypes as any[]).map(resolve);
  return new target(...args);
};

export const Instantiable = () => {
  return (target: ClassLike<any>) => {};
};
