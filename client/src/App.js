// depedencies
import { Route, Routes, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

// style
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/style.css'
import 'bootstrap/dist/js/bootstrap';
import './index.css'

// pages
import Landing from './pages/landing-pages'
import DetailProduct from "./pages/detail-product";
import Cart from "./pages/cart";
import Profile from "./pages/profile";
import Transaction from "./pages/transaction";
import ListProduct from "./pages/list-product";
import AddProduct from "./pages/add-product";
import EditProduct from "./pages/edit-product";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./components/context/UserContext";

// Init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {

  let navigate = useNavigate();

  // Init user context
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/');
    } else {
      if (state.user.status === 'admin') {
        navigate('/transaction');
      } else if (state.user.status === 'customer') {
        navigate('/');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/detail-product/:id' element={<DetailProduct/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/transaction' element={<Transaction/>}/>
        <Route path='/list-product' element={<ListProduct/>}/>
        <Route path='/add-product' element={<AddProduct/>}/>
        <Route path='/add-product/:id' element={<EditProduct/>}/>
      </Routes>
  );
}

export default App;
