import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getStudentById, updateStudent } from '../api/axios';
import API from '../api/axios';
import { FiUser, FiMail, FiCalendar, FiAward, FiBook, FiSave } from 'react-icons/fi';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load student + metadata
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, deptRes, courseRes] = await Promise.all([
          getStudentById(id),
          // reuse your API instance
          // if you don’t have these helpers, use API.get('/departments') and API.get('/courses')
          API.get('/departments'),
          API.get('/course')
        ]);
        setStudent(studentRes.data);
        setDepartments(deptRes.data);
        setCourses(courseRes.data);
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'did') {
      setStudent({ ...student, department: { did: value } });
    } else if (name === 'cid') {
      setStudent({ ...student, course: { cid: value } });
    } else {
      setStudent({ ...student, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updating student:", student);
    try {
      await updateStudent(id, student);
      alert("Student updated successfully!");
      navigate('/students');
    } catch (err) {
      console.error("Update failed:", err.response);
      alert(err.response?.data?.message || "Failed to update student");
    }
  };

  if (loading || !student) {
    return <div className="p-10 text-center">Loading student...</div>;
  }

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar />
      <main className="flex-1 ml-64 p-10">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Student</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">First Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  name="firstName"
                  value={student.firstName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Last Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  name="lastName"
                  value={student.lastName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Date of Birth</label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="date"
                  name="dob"
                  value={student.dob ? student.dob.split('T')[0] : ''}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={student.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Department</label>
              <div className="relative">
                <FiAward className="absolute left-3 top-3.5 text-gray-400" />
                <select
                  name="did"
                  value={student.department?.did || ''}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Department</option>
                  {departments.map(d => (
                    <option key={d.did} value={d.did}>{d.dName}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Course */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Course</label>
              <div className="relative">
                <FiBook className="absolute left-3 top-3.5 text-gray-400" />
                <select
                  name="cid"
                  value={student.course?.cid || ''}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Course</option>
                  {courses.map(c => (
                    <option key={c.cid} value={c.cid}>{c.cName}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="col-span-2 mt-4 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
            >
              <FiSave /> Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditStudent;