import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex h-screen">

      <div className="bg-gray-900 w-64 shadow-md">
        <div className="p-6">
          <h1 className="text-white text-xl font-bold">Dashboard</h1>
          <ul className="mt-6">
            <li className="mb-4">
              <a href="#" className="text-gray-300 hover:text-white">Home</a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-300 hover:text-white">Analytics</a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-300 hover:text-white">Settings</a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-300 hover:text-white">Logout</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow bg-gray-100 p-6">
        <h1 className="text-3xl text-gray-900 font-bold mb-4">Welcome to Your Dashboard</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
