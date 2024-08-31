// Method Decorator

function withBudget(actionBudget: number) {
  return function <T extends { budget: number }>(
    target: Function,
    context: ClassMethodDecoratorContext<T>
  ) {
    return function (...args: any) {
      const instance = this as T;
      if (instance.budget > actionBudget) {
        instance.budget -= actionBudget;
        target.apply(instance, args);
      } else {
        console.error(
          `Insufficient budget for ${context.name.toString()}. Required ${actionBudget}. Available ${
            instance.budget
          }`
        );
      }
      return target;
    };
  };
}

class Project {
  budget: number = 900;

  @withBudget(10)
  writeTests() {
    console.log("Tests are important!");
  }

  @withBudget(500)
  fixBugInProduction() {
    console.log("Fixing bug in production");
  }
}

const project1 = new Project();
// project1.writeTests();
project1.fixBugInProduction();
project1.fixBugInProduction();
project1.fixBugInProduction();
