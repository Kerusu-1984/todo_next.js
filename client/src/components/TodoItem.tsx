import React from "react"
import styles from "../styles/TodoItem.module.css"

type Props = {
  id: number
  text: string
  completed: boolean
  toggleTodoCompletion: (id: number) => void
  deleteTodo: (id:number) => void
}

  export const TodoItem:React.FC<Props> = ({id, text, completed, toggleTodoCompletion,deleteTodo}) => {
    return (
      <li className={styles.TodoItem_item}>
        <div className={styles.TodoItem_todo}>
          <label>
            <input type="checkbox"
                   className={styles.TodoItem_checkbox}
                   checked={completed}
                   onChange={() => toggleTodoCompletion(id)} />
            <span>{text}</span>
          </label>
        </div>
        <div className={styles.TodoItem_delete}>
          <button className={styles.TodoItem_button} onClick={() => deleteTodo(id)}>x</button>
        </div>
      </li>
    );
  }