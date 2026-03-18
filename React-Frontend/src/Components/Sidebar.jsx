import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiGrid, FiUsers, FiUserPlus, FiLogOut, FiBookOpen } from 'react-icons/fi';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <FiBookOpen /> SMS
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <Link to="/dashboard" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all">
          <FiGrid /> Dashboard
        </Link>
        <Link to="/students" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all">
          <FiUsers /> All Students
        </Link>
        <Link to="/add-student" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all">
          <FiUserPlus /> Add Student
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;