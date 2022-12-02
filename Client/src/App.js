import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import SignUp from './components/SignUp'
import { useState } from 'react';
function App() {
  const log = sessionStorage.getItem('logged')
  const [state, setstate] = useState(log || false)
  return (
    <div className="App">
      {
       state 
       ?
        <Home/>
       :
        <SignUp setstate = {setstate} state = {state}/>
      }
    </div>
  );
}

export default App;
