import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 ">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <p>&copy; {new Date().getFullYear()} Your Company Name</p>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
