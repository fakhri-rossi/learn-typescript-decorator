// Field Decorators

type Task = {
  name: string;
  level: "low" | "medium" | "complicated";
};

class Person {
  // @withComplicatedTask
  @withTask({
    name: "Added Task",
    level: "low",
  })
  tasks: Task[] = [];

  @withComplicatedTask()
  extraTasks: Task[] = [];
}

function withTask(task: Task) {
  return function <T, V extends Task[]>(
    target: undefined,
    context: ClassFieldDecoratorContext<T, V>
  ) {
    return function (args: V) {
      args.push(task);
      return args;
    };
  };
}

function withComplicatedTask() {
  return withTask({
    name: "Added Task",
    level: "complicated",
  });
}

const person1 = new Person();
console.log(person1);
