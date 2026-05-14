import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import API from '../api/axios';
import { FiUser, FiMail, FiCalendar, FiBook, FiAward, FiArrowLeft } from 'react-icons/fi';

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/students/${id}`);
        setStudent(response.data);
      } catch (err) {
        setError('Failed to fetch student details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </main>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200">
            {error || 'Student not found'}
          </div>
          <button 
            onClick={() => navigate('/students')}
            className="mt-4 flex items-center gap-2 text-blue-600 hover:underline"
          >
            <FiArrowLeft /> Back to List
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <button 
          onClick={() => navigate('/students')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <FiArrowLeft /> Back to Student List
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden max-w-4xl">
          {/* Header/Cover Area */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
            <div className="absolute -bottom-16 left-10">
              <div className="w-32 h-32 bg-white rounded-3xl shadow-lg p-2">
                <div className="w-full h-full bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                  <FiUser size={64} />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-10 px-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900">
                  {student.firstName} {student.lastName}
                </h1>
                <p className="text-blue-600 font-medium text-lg mt-1">
                  Student ID: #{student.id}
                </p>
              </div>
              <div className="flex gap-3">
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-2xl text-sm font-bold border border-purple-200">
                  {student.department?.dName || 'No Department'}
                </span>
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-2xl text-sm font-bold border border-blue-200">
                  {student.course?.cName || 'No Course'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Personal Details</h3>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-50 rounded-xl text-gray-400">
                    <FiMail />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Email Address</p>
                    <p className="text-gray-900 font-medium">{student.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-50 rounded-xl text-gray-400">
                    <FiCalendar />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Date of Birth</p>
                    <p className="text-gray-900 font-medium">
                      {student.dob ? new Date(student.dob).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Academic Status</h3>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-50 rounded-xl text-gray-400">
                    <FiBook />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Department</p>
                    <p className="text-gray-900 font-medium">{student.department?.dName || 'Not Assigned'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-50 rounded-xl text-gray-400">
                    <FiAward />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Enrolled Course</p>
                    <p className="text-gray-900 font-medium">{student.course?.cName || 'Not Enrolled'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentProfile;
