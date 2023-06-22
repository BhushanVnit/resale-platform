import React, { useState, useEffect } from 'react'
import Product from '../components/Products'
import axios from 'axios'

const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    const [serverStatus, setServerStatus] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await axios.get("http://localhost:8000/api/v1/products");

                if (result) {
                    setProducts(result.data.data.products);
                    setServerStatus(true);
                }
            } catch (error) {
                setServerStatus(false);
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            {serverStatus ? (
                <div className="container my-20 mx-5 lg:m-10">
                    <p className="text-blue-600 font-bold text-lg my-3  ">
                        Latest Products
                    </p>
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-0">
                        {products.map(product => (
                            <div
                                key={product._id}
                                className="w-80 rounded overflow-hidden shadow-lg my-1 p-2 border-2 border-blue-100" >
                                <Product product={product} />
                            </div>
                        ))
                        }
                    </div>
                </div >
            ) : (
                <div className="flex items-center justify-center min-h-screen ">
                    <div className="flex flex-col items-center justify-center text-center">
                        <img
                            src="https://img.freepik.com/free-vector/500-internal-server-error-concept-illustration_114360-5572.jpg?w=740&t=st=1687426214~exp=1687426814~hmac=9f67fb749e165f2aed05b5a6cea238eb1fe33217bf7677529a0def8e8551e11c"
                            alt="Server Failure Graphic"
                            className="w-4/5 h-auto transform -translate-y-8"
                        />
                        <p className="text-gray-700 transform -translate-y-16">
                            Oops! Something went wrong on the server. Please try again later.
                        </p>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default HomeScreen