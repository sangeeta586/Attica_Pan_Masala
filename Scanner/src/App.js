import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './component/Register';
import Login from './component/Login';
import UserProfile from './pages/UserProfile';
import DeliveryBoyLogin from './component/DeliveryBoy/DeliveryBoyLogin';
import DeliveryBoyHomePage from './component/DeliveryBoy/DeliveryBoyHomepage';
import PageNotFound from './component/PageNotFound';

function App() {
  return (
    // <Register/>
    <>
    
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<PageNotFound/>} />
      <Route path='/mobile' element={<PageNotFound/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/qrDetail' element={<UserProfile/>} />
      <Route path='/DeliveryBoyLogin' element={<DeliveryBoyLogin/>} />
      <Route path='/DeliveryBoyHomePage' element={<DeliveryBoyHomePage/>} />
      
    </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
