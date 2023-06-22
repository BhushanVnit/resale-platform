import React from 'react'
import { Link } from 'react-router-dom'

const Products = ({ product }) => {

    let description = product.description;
     description = description.slice(0,100);
    return (
        <div className="">
            <div className="px-2 py-1">
                <div className="font-bold text-2xl mb-2">
                    <Link to={`/products/${product._id}`}>
                        {product.name}
                    </Link>
                </div>
                <p className="text-gray-700 text-base">
                    {description}
                </p>
                <p className="text-gray-700 text-base">
                    <b>Owner :</b> {product.owner}
                </p>

                <p className="text-gray-700 text-base">
                    <b>Price :</b>  ₹{product.price}
                </p>
            </div>
        </div >
    )
}

export default Products