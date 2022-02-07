import styles from "../styles/TodoForm.module.css";
import { BackendService } from "../backend/BackendService";
import { useInput } from "../hooks/useInput";

type Todo = {
  id: number
  text: string
  completed: boolean
}

type Props = {
  addTodo: (todo: Todo) => void
}

export default function({ addTodo }) {
  const [text, textAttributes, setText] = useInput('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!text) {
      return;
    }
    BackendService.postTodo(text)
      .then(response => addTodo(response));
    setText('');
  };

  return (
    <div className={styles.TodoForm_content}>
      <form onSubmit={handleSubmit} className={styles.TodoForm_form}>
        <div className={styles.TodoForm_input}>
          <input type="text" {...textAttributes} placeholder="タスクを入力してください"/>
        </div>
        <div className={styles.TodoForm_button}>
          <button type="submit">追加</button>
        </div>
      </form>
    </div>
  );
}