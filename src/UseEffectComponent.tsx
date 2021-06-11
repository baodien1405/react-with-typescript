import { useEffect, useState } from "react";

const UseEffectComponent = () => {
  const [value, setValue] = useState<number>(1);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setValue((v) => v + 1);
    }, 1000)

    return () => window.clearInterval(timer);
  }, [])

  return <h4>{value}</h4>
}

export default UseEffectComponent;