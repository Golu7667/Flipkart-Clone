// import React,{ useEffect,Suspense } from 'react';
// import { useDispatch } from 'react-redux';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import WebFont from 'webfontloader';
// import Footer from './components/Layouts/Footer/Footer';
// import Header from './components/Layouts/Header/Header';
// import Login from './components/User/Login';
// import Register from './components/User/Register';
// import { loadUser } from './actions/userAction';
// import UpdateProfile from './components/User/UpdateProfile';
// import UpdatePassword from './components/User/UpdatePassword';
// import ForgotPassword from './components/User/ForgotPassword';
// import ResetPassword from './components/User/ResetPassword';
// import Account from './components/User/Account';
// import ProtectedRoute from './Routes/ProtectedRoute';
// import Home from './components/Home/Home';
// import ProductDetails from './components/ProductDetails/ProductDetails';
// import Products from './components/Products/Products';
// import Cart from './components/Cart/Cart';
// import Shipping from './components/Cart/Shipping';
// import OrderConfirm from './components/Cart/OrderConfirm';
// import Payment from './components/Cart/Payment';
// import OrderStatus from './components/Cart/OrderStatus';
// import OrderSuccess from './components/Cart/OrderSuccess';
// import MyOrders from './components/Order/MyOrders';
// import OrderDetails from './components/Order/OrderDetails';
// import Dashboard from './components/Admin/Dashboard';
// import MainData from './components/Admin/MainData';
// import OrderTable from './components/Admin/OrderTable';
// import UpdateOrder from './components/Admin/UpdateOrder';
// import ProductTable from './components/Admin/ProductTable';
// import NewProduct from './components/Admin/NewProduct';
// import UpdateProduct from './components/Admin/UpdateProduct';
// import UserTable from './components/Admin/UserTable';
// import UpdateUser from './components/Admin/UpdateUser';
// import ReviewsTable from './components/Admin/ReviewsTable';
// import Wishlist from './components/Wishlist/Wishlist';
// import NotFound from './components/NotFound';


import React, { useEffect, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import WebFont from 'webfontloader';
import { loadUser } from './actions/userAction';

const Footer = React.lazy(() => import('./components/Layouts/Footer/Footer'));
const Header = React.lazy(() => import('./components/Layouts/Header/Header'));
const Login = React.lazy(() => import('./components/User/Login'));
const Register = React.lazy(() => import('./components/User/Register'));
const UpdateProfile = React.lazy(() => import('./components/User/UpdateProfile'));
const UpdatePassword = React.lazy(() => import('./components/User/UpdatePassword'));
const ForgotPassword = React.lazy(() => import('./components/User/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./components/User/ResetPassword'));
const Account = React.lazy(() => import('./components/User/Account'));
const ProtectedRoute = React.lazy(() => import('./Routes/ProtectedRoute'));
const Home = React.lazy(() => import('./components/Home/Home'));
const ProductDetails = React.lazy(() => import('./components/ProductDetails/ProductDetails'));
const Products = React.lazy(() => import('./components/Products/Products'));
const Cart = React.lazy(() => import('./components/Cart/Cart'));
const Shipping = React.lazy(() => import('./components/Cart/Shipping'));
const OrderConfirm = React.lazy(() => import('./components/Cart/OrderConfirm'));
const Payment = React.lazy(() => import('./components/Cart/Payment'));
const OrderStatus = React.lazy(() => import('./components/Cart/OrderStatus'));
const OrderSuccess = React.lazy(() => import('./components/Cart/OrderSuccess'));
const MyOrders = React.lazy(() => import('./components/Order/MyOrders'));
const OrderDetails = React.lazy(() => import('./components/Order/OrderDetails'));
const Dashboard = React.lazy(() => import('./components/Admin/Dashboard'));
const MainData = React.lazy(() => import('./components/Admin/MainData'));
const OrderTable = React.lazy(() => import('./components/Admin/OrderTable'));
const UpdateOrder = React.lazy(() => import('./components/Admin/UpdateOrder'));
const ProductTable = React.lazy(() => import('./components/Admin/ProductTable'));
const NewProduct = React.lazy(() => import('./components/Admin/NewProduct'));
const UpdateProduct = React.lazy(() => import('./components/Admin/UpdateProduct'));
const UserTable = React.lazy(() => import('./components/Admin/UserTable'));
const UpdateUser = React.lazy(() => import('./components/Admin/UpdateUser'));
const ReviewsTable = React.lazy(() => import('./components/Admin/ReviewsTable'));
const Wishlist = React.lazy(() => import('./components/Wishlist/Wishlist'));
const NotFound = React.lazy(() => import('./components/NotFound'));


















function App() {

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  

 

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto:300,400,500,600,700"]
      },
    });
  });

  useEffect(() => {
    console.log("load")
    dispatch(loadUser());
  
  }, [dispatch]);

  // always scroll to top on route/path change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname])


  
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      </Suspense>
      <Routes>
        <Route path="/" element={  <Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
        <Route path="/login" element={
           <Suspense fallback={<div>Loading...</div>}>
        <Login />
        </Suspense>
        } />
        <Route path="/register" element={<Suspense fallback={<div>Loading...</div>}><Register /> </Suspense>} />

        <Route path="/product/:id" element={
        <Suspense fallback={<div>Loading...</div>}>
        <ProductDetails />    </Suspense>} 
       
        />
        <Route path="/products" element={
          <Suspense fallback={<div>Loading...</div>}>
        <Products />
        </Suspense>
        } />
        <Route path="/products/:keyword" element={
          <Suspense fallback={<div>Loading...</div>}> 
        <Products />
        </Suspense>
        } />

        <Route path="/cart" element={
         <Suspense fallback={<div>Loading...</div>}> 
        <Cart />
        </Suspense>
        } />

        {/* order process */}
        <Route path="/shipping" element={
           <Suspense fallback={<div>Loading...</div>}> 
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
          </Suspense>
        } ></Route>

        <Route path="/order/confirm" element={
           <Suspense fallback={<div>Loading...</div>}> 
          <ProtectedRoute>
            <OrderConfirm />
          </ProtectedRoute>
          </Suspense>
        } ></Route>

        <Route path="/process/payment" element={
            <Suspense fallback={<div>Loading...</div>}> 
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
          </Suspense>
        } ></Route>

        <Route path="/orders/success" element={
         <Suspense fallback={<div>Loading...</div>}> 
        <OrderSuccess success={true} />
        </Suspense>
        } />
        <Route path="/orders/failed" element={
           <Suspense fallback={<div>Loading...</div>}>  <OrderSuccess success={false} />  </Suspense>
       } />
        {/* order process */}

        <Route path="/order/:id" element={
          <Suspense fallback={<div>Loading...</div>}> 
          <ProtectedRoute>
            <OrderStatus />
          </ProtectedRoute>
          </Suspense>
        } ></Route>

        <Route path="/orders" element={
          <Suspense fallback={<div>Loading...</div>}> 
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
          </Suspense>
        }></Route>

        <Route path="/order_details/:id" element={
          <Suspense fallback={<div>Loading...</div>}> 
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
          </Suspense>
        }></Route>

        <Route path="/account" element={
          <Suspense fallback={<div>Loading...</div>}> 
          <ProtectedRoute>
            <Account />
           </ProtectedRoute>
           </Suspense>
        } ></Route>

        <Route path="/account/update" element={
          <Suspense fallback={<div>Loading...</div>}> 
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
          </Suspense>
        } ></Route>

        <Route path="/password/update" element={
          <Suspense fallback={<div>Loading...</div>}> 
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
          </Suspense>
        } ></Route>

        <Route path="/password/forgot" element={
        <Suspense fallback={<div>Loading...</div>}> 
        <ForgotPassword />
        </Suspense>
        } />

        <Route path="/password/reset/:token" element={
        <Suspense fallback={<div>Loading...</div>}> 
        <ResetPassword />
        </Suspense> 
        } />

        <Route path="/wishlist" element={
          <Suspense fallback={<div>Loading...</div>}> 
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
          </Suspense>
        } ></Route>

        <Route path="/admin/dashboard" element={
          <Suspense fallback={<div>Loading...</div>}> 
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={0}>
              <MainData />
            </Dashboard>
           </ProtectedRoute>
           </Suspense>
        } ></Route>

        <Route path="/admin/orders" element={
          <Suspense fallback={<div>Loading...</div>}> 
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={1}>
              <OrderTable />
            </Dashboard>
          </ProtectedRoute>
          </Suspense>
        } ></Route>

        <Route path="/admin/order/:id" element={
          <Suspense fallback={<div>Loading...</div>}> 
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={1}>
              <UpdateOrder />
            </Dashboard>
          </ProtectedRoute>
          </Suspense>
        } ></Route>

        <Route path="/admin/products" element={
          <Suspense fallback={<div>Loading...</div>}> 
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={2}>
              <ProductTable />
            </Dashboard>
          </ProtectedRoute>
          </Suspense>
        } ></Route>

        <Route path="/admin/new_product" element={
          <Suspense fallback={<div>Loading...</div>}> 
          // <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={3}>
              <NewProduct />
            </Dashboard>
          // </ProtectedRoute>
          </Suspense>
        } ></Route>

        <Route path="/admin/product/:id" element={
          <Suspense fallback={<div>Loading...</div>}> 

          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={2}>
              <UpdateProduct />
            </Dashboard>
          </ProtectedRoute>
          </Suspense>
        } ></Route>

        <Route path="/admin/users" element={
          <Suspense fallback={<div>Loading...</div>}> 
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={4}>
              <UserTable />
            </Dashboard>
          </ProtectedRoute>
          </Suspense>
        } ></Route>

        <Route path="/admin/user/:id" element={
          <Suspense fallback={<div>Loading...</div>}> 
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={4}>
              <UpdateUser />
            </Dashboard>
          </ProtectedRoute>
          </Suspense>
        } ></Route>

        <Route path="/admin/reviews" element={
          <Suspense fallback={<div>Loading...</div>}> 
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={5}>
              <ReviewsTable />
            </Dashboard>
          </ProtectedRoute> 
          </Suspense>
        } ></Route>

        <Route path="*" element=  {<Suspense fallback={<div>Loading...</div>}> <NotFound />  </Suspense>}></Route>

      </Routes>
      <Suspense fallback={<div>Loading...</div>}>
      <Footer />
      </Suspense>
    </>
  );
}

export default App;
