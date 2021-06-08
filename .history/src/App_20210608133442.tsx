
import './App.css';

const Heading = ({title}: {title: string}) => <h2>{title}</h2>

const Box = ({children}) => (
  <div style={{padding: "1rem", fontWeight: 'bold'}}>
    {children}
  </div>
)

function App() {
  return (
    <div className="App">
     <Heading title="Introduction" />
     <Box>Hello there</Box>
    </div>
  );
}

export default App;
