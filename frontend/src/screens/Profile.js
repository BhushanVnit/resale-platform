import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from "recoil";
import { loggedIn } from "../recoil_state";

const UserProfile = () => {

  const jwtToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: '', mobile: '', address: '', yearOfStudy: '', username: '', id: '' });
  const [products, setProducts] = useState([]);
  const [login, setLogin] = useRecoilState(loggedIn);

  //============ USE-EFFECT TO GET USER DATA AND THEN FETCH PRODUCTS DATA ===========
  useEffect(() => {
    //============== FETCHING USER DATA =================
    // retrieve JWT token from local storage
    const headers = {
      Authorization: jwtToken
    };

    axios.get(
      `http://localhost:8000/api/v1/Users/`,
      { headers }
    )
      .then(res => {
        if (res.status === 401) {
          navigate("/");
        }

        setUserData({
          name: res.data.data.user.name,
          mobile: res.data.data.user.mobileNo,
          address: res.data.data.user.address,
          yearOfStudy: res.data.data.user.yearOfStudy,
          username: res.data.data.user.username,
          id: res.data.data.user.id
        });
        
        //======= FETCHING PRODUCTS DATA WITH USERNAME AS PARAMETER ========
        axios.get(`http://localhost:8000/api/v1/products?username=${res.data.data.user.username}`,)
          .then(res => {
            setProducts(res.data.data.products);

          })
      }).catch(error => {
        //====== CHECKING IF USER HAS VALID TOKEN OR NOT ======
        if (error.response.status === 401) {
          localStorage.removeItem('token');
          setLogin(false);
          navigate("/login");
        }
      });
  }, [setLogin, jwtToken, navigate, userData.username]);

  //========================== Handle Delete Function ================================
  const handleDelete = (productId) => {
    axios.delete(`http://localhost:8000/api/v1/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then(response => {
        const updatedProducts = products.filter(product => product._id !== productId);
        setProducts(updatedProducts);
      })
      .catch(error => {
        console.error(error);
      });
  };
  // ============================= Handle Edit Function =============================
  const handleEdit = (productId) => {
    // Your implementation for editing the product information
    navigate(`/editProduct/${productId}`);
  };
  //======== CONTENTAINER ===========
  return (

    <>
      {
        login ?
          (
            <div className="flex flex-col p-6 m-20">
              <div className="flex flex-col items-center mt-6 border border-blue-500 w-full p-5">
                <p className="text-xl font-medium">{userData.name}</p>
                <p className="text-sm font-light">Mobile: {userData.mobile}</p>
                <p className="text-sm font-light">Address: {userData.address}</p>
                <p className="text-sm font-light">Year of Study: {userData.yearOfStudy}</p>
                <div className="flex justify-between mt-4 absolute right-32 text-blue-500 hover:text-blue-600 cursor-pointer" onClick={() => handleEdit()}>
                  <FontAwesomeIcon icon={faEdit} />
                </div>
              </div>
              {/* ==== BUTTON TO ADD NEW PRODUCTS WITH PASSING PARAMETER AS USERNAME ===== */}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded lg:w-1/6 my-2 w-full"
                onClick={() => navigate("/newProduct/" + userData.username)}
              >
                + Add Product
              </button>
              {/* ===== RENDERING PRODUCTS FROM PRODUCTS ARRAY ====== */}
              <div className="flex flex-wrap mt-6">
                {products ? (
                  products.map(product => (
                    <div key={product._id} className="lg:w-1/3 w-full md:p-3 p-1">
                      <div className="bg-white rounded shadow-xl border border-t-1 md:p-6 p-3 relative">
                        <p className="text-lg font-medium">{product.name}</p>
                        <p className="text-sm font-light">{product.description.slice(0, 200)}</p>
                        <div className="flex justify-between mt-4 absolute top-0 right-0 px-3">
                          <div className="text-red-500 hover:text-red-600 cursor-pointer px-2" onClick={() => handleDelete(product._id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </div>
                          <div className="text-blue-500 hover:text-blue-600 cursor-pointer" onClick={() => handleEdit(product._id)}>
                            <FontAwesomeIcon icon={faEdit} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            </div>

          ) : (
            <div className="text-center p-60 font-bold text-4xl justify-center">
              <h1>Login to see your profile !!!</h1>
            </div>
          )
      }
    </>

  );
};

export default UserProfile;
