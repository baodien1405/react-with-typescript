
import './App.css';

const Heading = ({title}: {title: string}) => <h2>{title}</h2>

const Box: React.FunctionComponent = ({children}) => (
  <div style={{padding: "1rem", fontWeight: 'bold'}}>
    {children}
  </div>
)

const List: React.FunctionComponent<{items: string[]}> = ({items}) => (
  <ul>
    {
      items.map((item, index) => {
        return <li key={index}>{item}</li>
      })
    }
  </ul>
)

function App() {
  return (
    <div className="App">
     <Heading title="Introduction" />
     <Box>Hello there</Box>
     <List items={["one", "two", "three"]} />
    </div>
  );
}

export default App;
