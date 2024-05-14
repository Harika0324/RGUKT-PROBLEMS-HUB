// import logo from './logo.svg';
import Problem from './Problem';
import './App.css';
import LoginForm from './LoginForm';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { createContext,useState } from 'react';
import Home from './Home';
import LoginWorker from './LoginWorker';
import WorkerPostLogin from './WorkerPostLogin';
export const UsernameContext=createContext();

const UsernameContextProvider=({children})=>{
  const [name,setName]=useState("");
  return (
    <UsernameContext.Provider value={{name,setName}}>
      {children}
    </UsernameContext.Provider>
  );
};

function App() {
  return (
    <Router>
      <div>
        <h1>RGUKT Problems HUB</h1>
        <UsernameContextProvider>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path="/loginworker" element={<LoginWorker />}/>
          <Route exact path='/workerpostlogin' element={<WorkerPostLogin />}/>
          <Route exact path="/login" element={<LoginForm />}/>
          <Route exact path="/problems" element={<Problem />}/>
        </Routes>
        </UsernameContextProvider>
      </div>
    </Router>
  );
}

export default App;
