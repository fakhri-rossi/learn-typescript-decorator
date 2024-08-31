// Class Decorator

@withEmploymentDateOnPrototype
@withEmploymentDate
@sealed
class Manager {
  task: string = "Simple task";
  project: string = "Simple project";

  constructor() {
    console.log("Initializing the manager class");
  }
}

function withEmploymentDateOnPrototype(value: Function, context: ClassDecoratorContext) {
  value.prototype.employmentDateOnPrototype = new Date().toISOString();
}

function withEmploymentDate<T extends { new (...args: any[]): {} }>(
  baseClass: T,
  context: ClassDecoratorContext
) {
  return class extends baseClass {
    employmentDate = new Date().toISOString();
    constructor(...args: any[]) {
      super(...args);
      console.log("Adding employment date to: ", baseClass.name);
    }
  };
}

function sealed(constructor: Function, context: ClassDecoratorContext) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

function printDecoratorData(value: Function, context: ClassDecoratorContext) {
  console.log("Value: ");
  console.log(value);
  console.log("Context: ");
  console.log(context);

  context.addInitializer(() => {
    console.log("Initialized class " + context.name);
  });
}

console.log(Manager);
console.log("\n");
const manager1: Manager = new Manager();
console.log("\n");
console.log(manager1);
console.log("\n");
