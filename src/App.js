import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import Alert from './components/Alert';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useState } from 'react';


function App() {

  const [alert, setAlert]= useState({type:"", msg:""})

  const showAlert=(type, msg)=>{
      setAlert({
        type:type,
        msg:msg
      })
      setTimeout( () => {
        setAlert("")
      }, 1000)
  }


  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          <div className='container'>
            <Routes>
              <Route exact path="/"  element={<Navigate replace to="/login" />}></Route>
              <Route exact path="/home" element={<Home showAlert={showAlert}/>}></Route>
              <Route exact path="/about" element={<About showAlert={showAlert}/>}></Route>
              <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
              <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>}></Route>


            </Routes>
          </div>


        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
