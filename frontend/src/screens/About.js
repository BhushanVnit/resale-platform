import React from 'react';
// import './About.css';

const About = () => {
  return (
    <div className="bg-gray-200 p-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          {/* <img src="" alt="About" className="w-full rounded-lg mb-4 md:mb-0" /> */}
        </div>
        <div className="md:w-2/3">
          <h1 className="text-2xl font-medium text-center text-blue-800">About</h1>
          <div className="mx-auto my-6 max-w-xl">
            <p className="text-lg text-gray-700 leading-relaxed">My name is Bhushan and I am a 3rd year student at VNIT. I am currently working on a website that allows VNIT students to buy and sell old college items.</p>
            <p className="text-lg text-gray-700 leading-relaxed">I created this website with the goal of making it easy for students to buy and sell items within the college community in a safe and secure manner.</p>
            <p className="text-lg text-gray-700 leading-relaxed">The website includes a feature of secure login to ensure that only authorized users can access the platform.</p>
            <p className="text-lg text-center text-blue-800">Thank you for visiting my website and I hope you find it useful.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
