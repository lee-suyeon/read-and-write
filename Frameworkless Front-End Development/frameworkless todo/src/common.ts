export interface Todo {
  text: string;
  completed: boolean;
}

export interface State {
  todos: Todo[];
  currentFilter: string;
}