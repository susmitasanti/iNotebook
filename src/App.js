import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import Alert from './components/Alert';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import SignUp from './components/SignUp';


function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert message="Amazing"/>
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signup" element={<SignUp />}></Route>


            </Routes>
          </div>


        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
