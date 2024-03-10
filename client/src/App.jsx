import Navbar from './Navbar/Navbar'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import Singup from './components/Singup'
import RegistrationForm from './FormData'
function App() {
  return (
    <>
     <BrowserRouter>
      <Navbar/>
       <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/singup' element={<Singup/>} />
       </Routes>
     </BrowserRouter>  
    </>
  )
}

export default App
