import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
//=========== Importing components =============
import Header from './components/Navbar';
import Footer from './components/Footer';
import { validateToken } from "./components/authCheck";
// ========== Importing Screens ==========
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Profile from './screens/Profile';
import SignUp from './screens/SignUp';
import About from './screens/About';
import Contact from './screens/Contact';
import LoginScreen from "./screens/LoginScreen";
import EditProduct from "./screens/EditProduct";
import NewProduct from "./screens/NewProduct";
import { loggedIn } from "./recoil_state";
import { useRecoilState } from "recoil";

const App = () => {

  const [login, setLogin] = useRecoilState(loggedIn);

  useEffect(() => {
    const checkToken = async () => {
      const isValidToken = await validateToken();

      if (isValidToken) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    };

    checkToken();
  }, [setLogin]);

  return (

    <Router>
      <div className="App">
        <Header />

        <div className="main">
          <Routes>
            <Route path="/" exact element={<HomeScreen />}></Route>
            <Route path="products/:id" element={<ProductScreen />}></Route>
            <Route path="/login" element={<LoginScreen />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/editProduct/:productId" element={<EditProduct />}></Route>
            <Route path="/newProduct/:username" element={<NewProduct />}></Route>
            <Route path="/aboutus" element={<About />}></Route>
            <Route path="MyProfile/:id" element={<Profile />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>

  );
}

export default App;