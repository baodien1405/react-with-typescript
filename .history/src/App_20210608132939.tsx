import React from 'react';
import logo from './logo.svg';
import './App.css';

const Heading = (title) => <h2>{title}</h2>

function App() {
  return (
    <div className="App">
     <Heading title="Introduction" />
    </div>
  );
}

export default App;
