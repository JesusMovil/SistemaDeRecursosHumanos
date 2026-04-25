import Home from './pages/Home/Home'
import ListarEmpleados from './pages/Empleados/ListarEmpleados'
import Navbar from './layouts/Navbar'
import { Routes, BrowserRouter, Navigate, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster position='top-right' toastOptions={{ duration: 2000, style: { fontSize: "14px" } }} />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/empleados' element={<ListarEmpleados />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App