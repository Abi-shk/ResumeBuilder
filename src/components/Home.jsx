import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import template1 from '../assets/template1.png';
import template2 from '../assets/template2.png';
import template3 from '../assets/template3.png';
import template4 from '../assets/template4.png';
import Footer from './Footer';

function Home() {
  const navigate = useNavigate();

  const handleTemplateClick = (template) => {
    navigate(`/${template}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow p-5">
        <h1 className="text-2xl font-bold mb-8 text-center mt-4">Choose Your Template</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full h-full">
          <div
            className="cursor-pointer p-2 bg-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            onClick={() => handleTemplateClick('template1')}
          >
            <img src={template1} alt="Template 1" className="w-full h-auto object-cover max-w-full max-h-[600px]" />
          </div>
          <div
            className="cursor-pointer p-2 bg-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            onClick={() => handleTemplateClick('template2')}
          >
            <img src={template2} alt="Template 2" className="w-full h-auto object-cover max-w-full max-h-[600px]" />
          </div>
          <div
            className="cursor-pointer p-2 bg-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            onClick={() => handleTemplateClick('template3')}
          >
            <img src={template3} alt="Template 3" className="w-full h-auto object-cover max-w-full max-h-[600px]" />
          </div>
          <div
            className="cursor-pointer p-2 bg-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            onClick={() => handleTemplateClick('template4')}
          >
            <img src={template4} alt="Template 4" className="w-full h-auto object-cover max-w-full max-h-[600px]" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
