import {
    Configuration,
    TodosApi,
    Middleware,
    UsersApi
  
  } from './generated-rest-client';
  
  const requestLogger: Middleware = {
    pre: async (context) => {
      console.log(`>> ${context.init.method} ${context.url}`, context.init);
    },
    post: async (context) => {
      console.log(`<< ${context.response.status} ${context.url}`, context.response);
    }
  };

  const corsHandler: Middleware = {
    pre: async (context) => {
      return {
        url: context.url,
        init: {
          ...context.init,
          mode: 'cors',
          credentials: 'include'
        }
      };
    }
  };
  
  const configuration = new Configuration({
    middleware: [corsHandler, requestLogger]
  });
  
 
  
  const todosApi = new TodosApi(configuration);

  const usersApi = new UsersApi(configuration);

  
  const getTodos = async () => {
    return todosApi.getTodos();
  };
  
  const postTodo = async (text: string) => {
    
    return todosApi.postTodo({ inlineObject: { text }});
  };
  
  const putTodo = async (todoId: number, completed: boolean) => {
    return todosApi.putTodo({ todoId, inlineObject1: { completed }});
  };

  const deleteTodo = async (todoId: number) => {
      return todosApi.deleteTodo({ todoId })
  }

  
  
  export const BackendService = {
    getTodos,
    postTodo,
    putTodo,
    deleteTodo
  };