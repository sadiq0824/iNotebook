import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Notes from "./components/Notes";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {useState} from "react"
import Addnote from "./components/Addnote";

function App() {
  const [alert, setAlert] = useState('');
  
  
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,

    })
    setTimeout(() => {
      setAlert('')
    }, 3000)
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
         
         
          <Alert alert={alert}/>
         
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/notes" element={<Notes showAlert={showAlert}/>}></Route>
              <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
              <Route exact path="/addnote" element={<Addnote showAlert={showAlert}/>}></Route>
             
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
