import styles from "../styles/TodoBoard.module.css"
import { TodoForm } from "./TodoForm";
import { FilterType } from "./TodoFilter";
import { TodoFilter } from "./TodoFilter";
import { TodoList } from "./TodoList";
import React, { useEffect, useState } from 'react';
import { BackendService } from '../backend/BackendService';
import Router from "next/router";
import { useRecoilState } from "recoil" 
import { nameState,isLoggedInState } from  "./atoms"

type Todo = {
    id: number
    text: string
    completed: boolean
}

type ShowFilter = {
  [K in FilterType]: (todo: Todo) => boolean
}

const showFilter: ShowFilter = {
  ALL: (todo) => true,
  INCOMPLETE: (todo) => !todo.completed,
  COMPLETED: (todo) => todo.completed,
};


export const TodoBoard:React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>('ALL');
  const [isLoggedIn] = useRecoilState(isLoggedInState)


  useEffect(() => {
    if (isLoggedIn){
      BackendService.getTodos()
      .then(response => {console.log(response);setTodos(response);});
    }else{
      Router.push("/") //ログインせずに直に飛んできたときの処理、404を表示した方がよい？
    }

  }, []);

  const addTodo = (todo: Todo) => {
    setTodos(todos.concat(todo));
  };
  const toggleTodoCompletion = (id: number) => {
    const target = todos.find(todo => todo.id === id);
    if (!target) {
      return;
    }
    BackendService.putTodo(id, !target.completed)
      .then(response => setTodos(
        todos.map(todo => todo.id === response.id ? response : todo)
      ));
  };
  const deleteTodo = (id:number) => {
    const target = todos.find(todo => todo.id === id);
    if (!target) {
      return;
    }
    BackendService.deleteTodo(id)
      .then(response => setTodos(
        todos.filter(todo => todo.id !== id)
      ));
  }
  const showTodos = todos.filter(showFilter[filterType]);

  return (
    <div className={styles.TodoBoard_content}>
      <TodoForm addTodo={addTodo} />
      <TodoFilter filterType={filterType} setFilterType={setFilterType} />
      <TodoList todos={showTodos} toggleTodoCompletion={toggleTodoCompletion} deleteTodo={deleteTodo}/>
    </div>
  );
};