import React from 'react'

import {Link} from 'react-router-dom'

const Footer = () => {
    return (
        <div className=" ">

            <footer className="sticky top-[70vh] p-3 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900 ">

                <div className="sm:flex sm:items-center sm:justify-between">

                    <Link to="/about" className="flex items-center mb-4 sm:mb-0">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="OLX_VNIT Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">OLX-VNIT</span>
                    </Link>

                    <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <Link to="/" className="mr-4 hover:underline md:mr-6 ">About</Link>
                        </li>
                        <li>
                            <Link to="/" className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to="/" className="hover:underline">Contact</Link>
                        </li>
                    </ul>

                </div>


                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © <Link to="https://olx-vnit.com/" className="hover:underline">OLX-VNIT™</Link> -  All Rights Reserved.
                </span>

            </footer>

        </div>


    )
}

export default Footer;