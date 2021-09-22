const sortTodo = (todos) => todos.sort((a, b) => a.index - b.index);
export const save = (todos) => localStorage.setItem('todos', JSON.stringify(todos));

export const saveToStorage = (todos) => {
  const sortedTodos = sortTodo(todos);
  save(sortedTodos);
};

export const orderAndSave = (todos) => {
  const orderedTodos = todos.map((todo, index) => {
    todo.index = index + 1;
    return todo;
  });
  save(orderedTodos);
};

export const updateStatus = (e, todos) => {
  const index = e.target.id.slice(-1);
  todos[index - 1].completed = !todos[index - 1].completed;
  saveToStorage(todos);
  return todos;
};

export const getTodos = () => {
  const todos = localStorage.getItem('todos');
  if (todos) {
    return JSON.parse(todos);
  }
  return [];
};
