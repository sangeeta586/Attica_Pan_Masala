import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';




function App() {
  return (
    < >
     {/* <Admin/> */}
     
    
     <Outlet />
     {/* <CarouselDefault/> */}
     <Footer/>
    </>
  );
}

export default App;
