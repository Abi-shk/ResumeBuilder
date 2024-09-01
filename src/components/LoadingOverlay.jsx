// LoadingOverlay.js
import React from 'react';

const LoadingOverlay = ({ isLoading, loadingProgress }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="text-white text-xl mb-4">Generating PDFs, please wait...</div>
      <div className="w-64 bg-gray-300 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-300"
          style={{ width: `${loadingProgress}%` }}
        ></div>
      </div>
      <div className="text-white text-lg mt-2">{Math.round(loadingProgress)}% completed</div>
    </div>
  );
};

export default LoadingOverlay;
