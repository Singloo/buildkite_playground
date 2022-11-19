export class BaseService {}

export type ClassType<T> = { new (...args: unknown[]): T };

class ServiceManager {
  static ServiceA: ClassType<BaseService>;

  static getService = <K extends keyof Pick<typeof ServiceManager, "ServiceA">>(
    serviceName: K
  ) => {
    const service = new ServiceManager[serviceName]();
  };
}

ServiceManager.getService("ServiceA");
