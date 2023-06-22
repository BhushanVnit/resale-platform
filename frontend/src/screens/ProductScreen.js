import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import axios from 'axios'

const ProductScreen = ({ match }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobno, setMobno] = useState("");
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState({})

  const [user, setUser] = useState({})

  let params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await axios.get(`http://localhost:8000/api/v1/products/${params.id}`)
      setProduct(result.data.data.product);
    }
    fetchProduct()

  }, [params.id]);

  
  useEffect(() => {

    if (product && product.username) {
      const fetchUser = async () => {
        try {
          const result = await axios.get(
            `http://localhost:8000/api/v1/Users?username=${product.username}`,);
          setUser(result.data.data.user[0]);
        } catch (error) {
          console.error(error);
        }
      };
      fetchUser();
    }
  }, [product])

  function handleChange(e) {
    switch (e.target.id) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "mobno":
        setMobno(e.target.value);
        break;
      case "message":
        setMessage(e.target.value);
        break;
      default:
        break;
    }
  }
  function handleSubmit(e) {

    e.preventDefault();
    axios.post("/buyOrder", null, {
      params: {
        name: name,
        email: email,
        mobile: mobno,
        message: message,
        resEmail: user.email
      }
    }).then((res) => {
      console.log(res.data.message);
    })
  }

  return (
    // ============== product Container ============
    <div className="container  my-12 ">
      {/* ======= previous Button===== */}
      <Link className="" to="/">
        <button type="button" className="text-black bg-gray-300 hover:text-sm text-xs font-medium rounded p-2.5 text-center">
          ❮ Previous
        </button>
      </Link>
      {/* =========== Product Name and Price Container ============ */}
      <div className="container p-5 px-30 flex flex-col lg:flex-row justify-center align-middle ">
        <div className="container w-80 lg:w-1/2">
          <div className="container border-2  max-w-md shadow-lg rounded-lg">
            <p className="text-3xl text-center font-bold">{product.name}</p>
            <div className="container flex justify-center p-1 my-3 gap-5 border-t-2">
              <div className="p-2 flex flex-col justify-end align-middle text-lg" >
                <p className="font-medium">Owner :</p> {user.name}
              </div>
              <div className="border-l-2 border-gray-300"></div>
              <div className="price p-2 flex gap-3 mx-3 align-middle text-lg ">
                <p className="font-medium text-lg"> Price : </p><p className="font-bold text-3xl my-0 py-0"> ₹ {product.price} </p>
              </div>
            </div>
          </div>
          {/* ============ Product Description and Contact Info ============ */}
          <div className="container border max-w-md my-5 shadow-xl p-1 rounded-md">
            <p className="text-xl font-medium mx-12">Description : </p>
            <div className="description container flex align-middle justify-center ">
              <p className='p-3'> {product.description} </p>
            </div>
            <p className="text-xl font-medium mx-12 py-2"> Owner Info : </p>
            <div className="contactInfo px-3 container flex flex-col align-middle ">
              <p className='p-3'> {product.contactInfo}  </p>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p></p>
            </div>
          </div>
        </div>
        {/* ============== contact Form Container ============= */}
        <div className="contactForm container lg:mx-20 ">
          <div className="py-4 px-4 bg-slate-900 rounded-md mx-auto max-w-screen-sm">
            <h3 className="mb-4 text-3xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Onwer</h3>
            {/* ========= form started ======== */}
            <form className="space-y-8">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                <input onChange={handleChange} type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="olx-vnit@google.com" required />
              </div>

              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Name</label>
                <input onChange={handleChange} type="text" id="name" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Your Name Please" required />
              </div>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Mobile Number</label>
                <input onChange={handleChange} type="text" id="mobno" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Your Name Please" required />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                <textarea onChange={handleChange} id="message" rows="2" className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter the message you want to send to owner ...."></textarea>
              </div>
              <button onClick={handleSubmit} className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-primary-800 ">Send message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductScreen