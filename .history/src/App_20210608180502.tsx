
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useTodos } from "./useTodo";
import './App.css';

const Heading = ({title}: {title: string}) => <h2>{title}</h2>

const Box: React.FunctionComponent = ({children}) => (
  <div style={{padding: "1rem", fontWeight: 'bold'}}>
    {children}
  </div>
)
interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type ActionType = {type: "ADD", text: string} | {type: "REMOVE", id: number}

const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
    > & {
      title?: string
    }
> = ({title, children, style, ...rest}) => (<button {...rest} style={{...style, backgroundColor: "red", color: "white", fontSize: "xx-large"}} >{title ?? children}</button>)

function App() {
  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if(newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value
      })
      newTodoRef.current.value = "";
    }
  }, [])

  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    const uuid = Math.floor(Math.random() * 9999 + 1);
    switch (action.type) {
      case "ADD": {
        return [
          ...state,
          {
            id: uuid,
            text: action.text,
            done: false,
          },
        ];
      }
      case "REMOVE": {
        return state.filter(({id}) => id !== action.id);
      }
      default:
        throw new Error()
    }
  }, []);

  return (
    <div className="App">
     <Heading title="Introduction" />
     <Box>Hello there</Box>

     <Heading title="Todos" />
     {
       todos.map((todo) => (
         <div key={todo.id}>
           {todo.text}
           <button
            onClick={() => dispatch({
              type: "REMOVE",
              id: todo.id
            })}
           >
             Remove
           </button>
        </div>
       ))
     }
     <div>
       <input type="text" ref={newTodoRef} />
       <Button onClick={onAddTodo}>Add Todo</Button>
     </div>
    </div>
  );
}

export default App;
