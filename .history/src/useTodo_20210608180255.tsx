import React, { useCallback, useEffect, useReducer, useState } from 'react';

type ActionType = {type: "ADD", text: string} | {type: "REMOVE", id: number};

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

export function useTodos(initialTodos: Todo[]): {todos: Todo[]; addTodo: (text: string) => void; removeTodo: (id: number) => void} {
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
  }, initialTodos);

  const addTodo = useCallback((text: string) => {
    dispatch({
      type: "ADD",
      text
    })
  }, [])

  const removeTodo = useCallback((id: number) => {
    dispatch({
      type: "REMOVE",
      id
    })
  }, [])

  return {todos, addTodo, removeTodo};
}