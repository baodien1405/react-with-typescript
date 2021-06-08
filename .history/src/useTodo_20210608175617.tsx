import React, { useCallback, useEffect, useReducer, useState } from 'react';

export function useTodos() {
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
}