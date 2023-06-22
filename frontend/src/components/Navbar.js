import { Link } from "react-router-dom";
import {  useRecoilState } from "recoil";
import { loggedIn } from "../recoil_state";

const Header = () => {
  const [isValidToken, setValidToken] = useRecoilState(loggedIn);
  
  const logout = () => {
    localStorage.removeItem("token");
    setValidToken(false);
  };
  
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      {/* ==== LOGO or Brand Name ==== */}
      <div className="flex items-center flex-shrink-0 text-white mr-20">
        <span className="font-semibold text-3xl tracking-tight">
          <Link to="/">Resell</Link>
        </span>
      </div>
      {/* ==== Navbar Menu ==== */}
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-lg  lg:flex-grow">
          <li className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            <Link to="/">Home</Link>
          </li>
          <li className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            <Link to="/aboutus">About us</Link>
          </li>
          {/* <li className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            <Link to="/auth">Verification</Link>
          </li> */}
          {isValidToken ? (
            <li className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              <Link to="/MyProfile/{id}">My Profile</Link>
            </li>
          ) : (
            <li className="block mt-4 lg:inline-block"></li>
          )}
        </div>
        {/* ====== Login - Logout button ===== */}
        <div className="text-md text-white hover:text-teal-500 hover:bg-white rounded border-white  hover:border-transparent border inline-block my-2">
          {isValidToken ? (
            <button onClick={logout}>
              <Link to="/login" className="inline-block px-4 py-2 leading-none lg:mt-0">
                Logout
              </Link>
            </button>
          ) : (
            <Link to="/login" className="inline-block px-4 py-2 leading-none lg:mt-0">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
