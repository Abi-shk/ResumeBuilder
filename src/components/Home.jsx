import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Home() {
  const navigate = useNavigate();

  const handleTemplateClick = (template) => {
    navigate(`/${template}`);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col h-screen bg-gray-100 p-5">
        <h1 className="text-2xl font-bold mb-8 text-center mt-4">Choose Your Template</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full h-[600px]">
          <div
            className="cursor-pointer p-2 bg-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handleTemplateClick('template1')}
          >
            <img src="./src/assets/template1.png" alt="Template 1" className="w-full h-full object-cover mb-4" />
          </div>
          <div
            className="cursor-pointer p-2 bg-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handleTemplateClick('template2')}
          >
            <img src="./src/assets/template2.png" alt="Template 2" className="w-full h-full object-cover mb-4" />
          </div>
          <div
            className="cursor-pointer p-2 bg-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handleTemplateClick('template3')}
          >
            <img src="./src/assets/template3.png" alt="Template 3" className="w-full h-full object-cover" />
          </div>
          <div
            className="cursor-pointer p-2 bg-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handleTemplateClick('template4')}
          >
            <img src="./src/assets/template4.png" alt="Template 3" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
