
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import './App.css';

const Heading = ({title}: {title: string}) => <h2>{title}</h2>

const Box: React.FunctionComponent = ({children}) => (
  <div style={{padding: "1rem", fontWeight: 'bold'}}>
    {children}
  </div>
)

const List: React.FunctionComponent<{
  items: string[];
  onClick?: (item: string) => void
}> = ({items, onClick}) => (
  <ul>
    {
      items.map((item, index) => {
        return <li key={index} onClick={() => onClick?.(item)}>{item}</li>
      })
    }
  </ul>
)

interface Payload {
  text: string
}

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type ActionType = {type: "ADD", text: string} | {type: "REMOVE", id: number}

const useNumber = (inititalValue: number) => useState<number>(inititalValue);

type UseNumberValue = ReturnType<typeof useNumber>[0];
type UseNumberSetValue = ReturnType<typeof useNumber>[1];

const Incrementer: React.FunctionComponent<{value: UseNumberValue; setValue: UseNumberSetValue}> = ({ value, setValue }) => (
  <button onClick={() => setValue(value + 1)}>
    Add - {value}
  </button>
)

const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
    >
> = ({children, ...rest}) => (<button {...rest}>{children}</button>)



function App() {
  const [payload, setPayload] = useState<Payload | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then(res => res.json())
      .then(data => {
        setPayload(data)
      })
  }, [])

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

  const onListClick = useCallback((item: string) => {
    alert(item);
  }, [])

  const [value, setValue] = useNumber(0);

  return (
    <div className="App">
     <Heading title="Introduction" />
     <Box>Hello there</Box>
     <List items={["one", "two", "three"]} onClick={onListClick} />
     <Box>{JSON.stringify(payload)}</Box>
     <Incrementer value={value} setValue={setValue}/>

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
       <button onClick={onAddTodo}>Add Todo</button>
     </div>
    </div>
  );
}

export default App;
