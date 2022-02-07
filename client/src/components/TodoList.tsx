import styles from "../styles/TodoList.module.css"
import TodoItem from "./TodoItem";

type Todo = {
  id: number
  text: string
  completed: boolean
}

type Props = {
  todos: Todo[]
}

export default function TodoList({todos, toggleTodoCompletion,deleteTodo}) {
  return (
    <ul className={styles.TodoList_list}>
      {todos.map(todo =>
        <TodoItem key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} toggleTodoCompletion={toggleTodoCompletion} deleteTodo={deleteTodo}/>
      )}
    </ul>
  );
    
}