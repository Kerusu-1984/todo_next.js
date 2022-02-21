import React from "react";
import styles from "../styles/TodoForm.module.css";
import { BackendService } from "../backend/BackendService";
import { useInput } from "../hooks/useInput";
import { SubmitHandler, useForm } from "react-hook-form";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Props = {
  addTodo: (todo: Todo) => void;
};

type Inputs = {
  text: string;
};

export const TodoForm: React.FC<Props> = ({ addTodo }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (!text) {
  //     return;
  //   }
  //   BackendService.postTodo(text)
  //     .then(response => addTodo(response));
  //   setText('');
  // };

  return (
    <div className={styles.TodoForm_content}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.TodoForm_form}>
        <div className={styles.TodoForm_input}>
          <input
            type="text"
            {...register("text", { required: true })}
            placeholder="タスクを入力してください"
          />
        </div>
        <div className={styles.TodoForm_button}>
          <button type="submit">追加</button>
        </div>
      </form>
    </div>
  );
};
