import http from './http';

export interface Todo {
  completed: boolean;
  text?: string;
  id: string;
}

const HEADERS = {
  'Content-Type': 'application/json'
}

const BASE_URL = 'api/todos';

const list = (): Promise<Todo> => http.get(BASE_URL);

const create = (text: string) => {
  const todo = {
    text,
    completed: false
  }
  const params = { url: BASE_URL, todo, headers: HEADERS }
  return http.post(params);
}

const update = (newTodo: Todo) => {
  const url = `${BASE_URL}/${newTodo.id}`
  const params = { url, newTodo, headers: HEADERS }
  return http.patch(params);
}

const deleteTodo = (id: number) => {
  const url = `${BASE_URL}/${id}`
  const params = { url, headers: HEADERS }
  return http.delete(params);
}

export default {
  list,
  create,
  update,
  delete: deleteTodo
}