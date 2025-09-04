import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Shops from './pages/Shops';
import ShopForm from './pages/ShopForm';
import ShopDetail from './pages/ShopDetail';
import ProductForm from './pages/ProductForm';
import ProtectedRoute from './components/ProtectedRoute';
import './styles.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
         
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />

          <Route path="/register" element={<Register />} />

          
          <Route path="/shops" element={<Shops />} />
          <Route path="/shops/new" element={<ProtectedRoute><ShopForm /></ProtectedRoute>} />
          <Route path="/shops/:id/edit" element={<ProtectedRoute><ShopForm /></ProtectedRoute>} />
          <Route path="/shops/:id" element={<ShopDetail />} />

         
          <Route path="/shops/:shopId/products/new" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
       
          <Route path="/products/:productId/edit" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />

          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
