import { Counter } from './features/counter/Counter';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
import Cart from './features/cart/Cart';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { selectLogedInUser } from './features/auth/authSlice';
import ErrorPage from './pages/ErrorPage';
import OrderSucess from './pages/OrderSuccess';
import UserOrders from './features/user/componets/UserOrders';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfile from './features/user/componets/UserProfile';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInInfoAsync } from './features/user/userSlice';
import LogOut from './features/auth/components/LogOut';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductDetail from './features/admin/components/AdminProductDetail';
import ProductForm from './features/admin/components/ProductForm';
import AdminProductFormPage from './pages/AdminProductFormPage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Protected> <Home></Home> </Protected>,
  },
  {
    path: '/admin',
    element: <Protected> <AdminHome/> </Protected>,
  },
  {
    path: '/admin/product-form',
    element: <Protected> <AdminProductFormPage></AdminProductFormPage> </Protected>,
  },
  {
    path: '/admin/product-form/edit/:id',
    element: <Protected> <AdminProductFormPage></AdminProductFormPage> </Protected>,
  },

  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/signup',
    element:  <SignupPage></SignupPage>,
  },
  { 
    path: '/cart',
    element: <Protected><CartPage></CartPage></Protected> ,
  },
  { 
    path: '/checkout',
    element: <Protected><Checkout></Checkout></Protected> ,
  },
  { 
    path: '/product-detail/:id',
    element: <Protected><ProductDetailPage></ProductDetailPage></Protected>,
  },  
  { 
    path: '/admin/product-detail/:id',
    element: <ProtectedAdmin><AdminProductDetail/> </ProtectedAdmin>,
  },  
  { 
    path: '/order-success/:id',
    element: <OrderSucess/>,
  },  
  { 
    path: '/orders',
    element: <UserOrdersPage/>
  },  
  { 
    path: '/profile',
    element: <UserProfilePage/>
  },  
  { 
    path: '/logout',
    element: <LogOut/>
  },  
  { 
    path: '/forgotpassword',
    element: <ForgotPasswordPage/>
  },  
  { 
    path: '*',
    element: <ErrorPage/>,
  },
]);




function App() {

  const dispatch = useDispatch()
  const user = useSelector(selectLogedInUser)


  useEffect(()=>{
    if (user){
  dispatch(fetchItemsByUserIdAsync(user.id))
  dispatch(fetchLoggedInInfoAsync(user.id))
  }  },[dispatch,user?.id])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
