import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-gray-900 dark:text-white min-w-[600px] " >
      <h1 className="text-7xl font-bold text-red-600 dark:text-red-400 mb-4">404</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-error dark:bg-red-700 dark:hover:bg-red-800 text-white px-6">Go Back Home</Link>
    </div>
  );
}