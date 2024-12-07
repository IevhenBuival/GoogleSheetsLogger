import { Logger } from '@nestjs/common';

export function LogMessage(): MethodDecorator {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const startTime = Date.now();
      const result = await originalMethod.apply(this, args);
      const endTime = Date.now();
      const executionTime = endTime - startTime;
      Logger.log(
        `message ${JSON.stringify(args[0])} execution time: ${executionTime}ms`,
        target.constructor.name,
      );
      Logger.log(
        `Method ${propertyKey} execution time: ${executionTime}ms`,
        target.constructor.name,
      );
      return result;
    };
    return descriptor;
  };
}
