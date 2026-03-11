import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PatientManagement = () => {
  const navigate = useNavigate(); // ✅ inside component

  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: "",
    gender: "",
    phone: "",
  });

  useEffect(() => {
    const storedPatients =
      JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(storedPatients);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPatients = [...patients, formData];
    setPatients(updatedPatients);
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
    setFormData({ id: "", name: "", age: "", gender: "", phone: "" });
  };

  const handleDelete = (id) => {
    const filtered = patients.filter((p) => p.id !== id);
    setPatients(filtered);
    localStorage.setItem("patients", JSON.stringify(filtered));
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Patient Management</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-8"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Patient ID"
            className="border p-2 rounded"
            required
          />
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 rounded"
            required
          />
          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="border p-2 rounded"
            required
          />
          <input
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Gender"
            className="border p-2 rounded"
            required
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-2 rounded col-span-2"
            required
          />
        </div>

        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Patient
        </button>
      </form>

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b">
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.phone}</td>
                <td className="space-x-2">
                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(patient.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                  {/* 🔥 Check Anaemia Button */}
                  <button
                    onClick={() =>
                      navigate(`/predict/${patient.id}`)
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Check Anaemia
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientManagement;