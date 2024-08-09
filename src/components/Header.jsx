// Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-200 p-4 flex justify-center items-center">
      <img
        src="./src/assets/techmaghi.png" // Replace with the path to your PNG image
        alt="Centered Logo"
        className="w-52 h-auto" // Adjust width and height as needed
      />
    </header>
  );
};

export default Header;
