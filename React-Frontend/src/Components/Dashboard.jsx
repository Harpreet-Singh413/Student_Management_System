import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { getStudentStats } from "../api/axios";

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStudentStats();
        const data = response.data;

        setStats([
          { label: 'Total Students', value: data.totalStudents, color: 'bg-blue-500' },
          { label: 'Departments', value: data.departments, color: 'bg-purple-500' },
          { label: 'Active Courses', value: data.activeCourses, color: 'bg-green-500' },
        ]);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 p-8">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">System Overview</h2>
          <p className="text-gray-500">Welcome back, Admin.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {loading && (
            <p className="text-gray-500">Loading stats...</p>
          )}
          {error && (
            <p className="text-red-500">Error: {error}</p>
          )}
          {!loading && !error && stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1 text-gray-900">{stat.value}</h3>
              <div className={`h-1 w-12 mt-3 rounded-full ${stat.color}`}></div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h3>
          <p className="text-gray-400 italic">No new registrations today.</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;