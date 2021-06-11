import { useState } from "react";

const UseStateComponent = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [name, setName] = useState<string | null>(null);

  return (
    <div>
      <button onClick={() => setArr([...arr, arr.length + 1])}>
        Add
      </button>
      <span>{JSON.stringify(arr)}</span>

      <button onClick={() => setName("Dien")}>
        Set name
      </button>
      <span>{JSON.stringify(name)}</span>
    </div>
  )
}

export default UseStateComponent;