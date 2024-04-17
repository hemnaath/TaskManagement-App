import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './component/login/login';
import Register from './component/register/register';
import Dashboard from './component/dashboard/dashboard'
import Otp from './component/otp/otp';
import Org from './component/org/org';

function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/otp-validate' element={<Otp/>}></Route>
        <Route path='/org' element={<Org/>}></Route>
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
