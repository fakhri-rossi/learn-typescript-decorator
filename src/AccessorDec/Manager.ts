function watchChange<T, V>(
  accessor: { get: (this: T) => V; set: (this: T, value: V) => void },
  context: ClassAccessorDecoratorContext<T, V>
) {
  return {
    get: function (this: T) {
      return accessor.get.call(this) + " will be served";
    },
    set: function (this: T, value: V) {
      console.log(`Setting ${context.name.toString()} to ${value}`);
      accessor.set.call(this, value);
    },
  };
}

class Waiter {
  @watchChange
  // Auto-accessors, unlike regular fields, define a getter and setter on the class prototype
  accessor order: string = "Simple order";
}

const waiter1 = new Waiter();
waiter1.order = "Steak";
waiter1.order = "Burger";
console.log(waiter1.order);
