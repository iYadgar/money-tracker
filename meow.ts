interface StateWithLoading extends State {
  loading: meow;
}

interface State {}

class Store<T extends State> {}
