import { useEffect, useRef } from "react";

const UseRefComponent = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(()=> {
    inputRef.current?.focus()
  }, [])

  return <input ref={inputRef} />
}

export default UseRefComponent;