import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { loggedIn } from '../recoil_state';

const LoginScreen = () => {

  const [message, setMessage] = useState("");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useRecoilState(loggedIn);
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/login', {
        username: username,
        password: password
      });

      if (response.data.message === "1") {
        localStorage.setItem("token", response.data.token);
        setLogin(true);
        // window.location.href = '/';
        navigate("/");
      }
      else {
        setPassword('');
        setMessage("Wrong Credentials");
      }


    } catch (error) {
      console.log(error);
      setPassword('');
      setMessage("Wrong Credentials");
    }
  };


  return (
    <>
      {
        !login ?
          <div className="w-full max-w-xs my-20 py-2 mx-auto">

            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
              <div className="text-center py-2 ">
                {message ? <div className="text-center py-2 text-red-600 font-bold" >{message} </div> : ""}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="******************"
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Sign In
                </button>
              </div>
              <div className="text-center mt-4">
                Don't have an account? <Link to="/signup" className="text-indigo-500 hover:text-indigo-600">Sign up</Link>
              </div>
            </form>
          </div>
          :
          <> </>

      }
    </>

  );
}

export default LoginScreen;

