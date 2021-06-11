
import React, { useCallback, useRef, ReactNode, ReactElement, useState, useEffect } from 'react';
import './App.css';
import { useTodos } from "./useTodo";
import UseStateComponent from "./UseStateComponent";
import UseEffectComponent from './UseEffectComponent';
import UseContextComponent from "./UseContextComponent";
import UseReducerCompoennt from './UseReducerComponent';
import UseRefComponent from './UseRefComponent';
import UseCustomHookComponent from './UseCustomHookComponent';

const Heading = ({title}: {title: string}) => <h2>{title}</h2>

const Box: React.FunctionComponent = ({children}) => (
  <div style={{padding: "1rem", fontWeight: 'bold'}}>
    {children}
  </div>
)

const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
    > & {
      title?: string
    }
> = ({title, children, style, ...rest}) => (<button {...rest} style={{...style, backgroundColor: "red", color: "white", fontSize: "xx-large"}} >{title ?? children}</button>)

interface Pokemon {
  id: number,
  name: {
    english: string,
    japanese: string,
    chinese: string,
    french: string
  };
  type: string[];
  base: {
    HP: number;
    Attack: number;
    Defense: number;
    "Sp. Attack": number;
    "Sp. Defense": number;
    Speed: number
  }
}

type ListComponent = <ListItem>({items, render}: {
  items: ListItem[];
  render: (item: ListItem) => ReactNode
}) => ReactElement

const List: ListComponent = ({items, render}) => {
  return (
    <ul>
      {
        items.map((item, index) => (
          <li key={index}>{render(item)}</li>
        ))
      }
    </ul>
  )
}

function App() {
  const newTodoRef = useRef<HTMLInputElement>(null);

  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetch('/pokemon.json')
      .then(res => res.json())
      .then(data => setPokemon(data))
  }, [pokemon])

  const { todos, addTodo, removeTodo} = useTodos([
    {id: 0, text: "Hey there", done: false}
  ]);

  const onAddTodo = useCallback(() => {
    if(newTodoRef.current) {
      addTodo(newTodoRef.current.value)
      newTodoRef.current.value = "";
    }
  }, [addTodo])

  return (
    <div className="App">
     {/* <Heading title="Introduction" />
     <Box>Hello there</Box>

     <Heading title="Todos" />
     {
       todos.map((todo) => (
         <div key={todo.id}>
           {todo.text}
           <button
            onClick={() => removeTodo(todo.id)}
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

     <List items={pokemon} render={(item: Pokemon) => (item.name.english) }/> */}
    <h1>useCustomHook</h1>
     <UseCustomHookComponent />

    <h1>useRef</h1>
     <UseRefComponent />

    <h1>useReducer</h1>
     <UseReducerCompoennt />

    <h1>useContext</h1>
     <UseContextComponent />

     <h1>useEffect</h1>
     <UseEffectComponent />

     <h1>useState</h1>
     <UseStateComponent />

    </div>
  );
}

export default App;
