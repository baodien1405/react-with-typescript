
import { useCallback, useEffect, useState } from 'react';
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

function App() {
  const [payload, setPayload] = useState<Payload | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then(res => res.json())
      .then(data => {
        setPayload(data)
      })
  }, [payload])

  const onListClick = useCallback((item: string) => {
    alert(item);
  }, [])
  return (
    <div className="App">
     <Heading title="Introduction" />
     <Box>Hello there</Box>
     <List items={["one", "two", "three"]} onClick={onListClick} />
     <Box>{JSON.stringify(payload)}</Box>
    </div>
  );
}

export default App;
