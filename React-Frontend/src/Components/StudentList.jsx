import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { getStudents, deleteStudent } from '../api/axios';
import { FiSearch, FiTrash2, FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({ dept: '', course: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id);
        setStudents(students.filter(s => s.id !== id));
      } catch (err) {
        alert("Failed to delete student");
      }
    }
  };

  // ✅ Corrected search + filter logic
  const filteredStudents = students.filter(student => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = filter.dept ? student.department?.dName === filter.dept : true;
    const matchesCourse = filter.course ? student.course?.cName === filter.course : true;

    return matchesSearch && matchesDept && matchesCourse;
  });

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Student Directory</h2>
            <p className="text-gray-500">Manage and monitor enrolled students</p>
          </div>
        </header>

        {/* Search and Filter Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full pl-12 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none"
            onChange={(e) => setFilter({ ...filter, dept: e.target.value })}
          >
            <option value="">All Departments</option>
            <option value="Computer Science & Engineering">Computer Science & Engineering</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Business Administration">Business Administration</option>
          </select>
        </div>

        {/* Table Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">ID</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Email</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Department</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Course</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">DOB</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="6" className="text-center py-10 text-gray-400">Loading students...</td></tr>
              ) : filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-700">{student.id}</td>
                  <td className="px-6 py-4 text-gray-600">{student.firstName} {student.lastName}</td>
                  <td className="px-6 py-4 text-gray-600">{student.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                      {student.department?.dName}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{student.course?.cName}</td>
                  <td className="px-6 py-4 text-gray-600">{student.dob ? student.dob.split('T')[0] : ''}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => navigate(`/edit-student/${student.id}`)}>
                      <FiEdit />
                      </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && filteredStudents.length === 0 && (
            <div className="text-center py-10 text-gray-500 font-medium italic">No students found.</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentList;