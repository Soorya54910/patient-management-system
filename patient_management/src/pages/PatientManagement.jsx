import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

const PatientManagement = () => {
  const navigate = useNavigate();

  const [patients, setPatients] = useState(() => {
  const storedPatients = localStorage.getItem("patients");
  return storedPatients ? JSON.parse(storedPatients) : [];
});
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: "",
    gender: "",
    phone: "",
  });

  

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
    <div className="p-10 min-h-screen bg-slate-100">

      {/* Title */}
      <h2 className="text-3xl font-bold text-slate-800 mb-8">
        Patient Management
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md border border-slate-200 mb-10"
      >
        <div className="grid md:grid-cols-2 gap-5">

          <input
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Patient ID"
            className="border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />

          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />

          <input
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Gender"
            className="border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border border-slate-300 p-3 rounded-lg md:col-span-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />

        </div>

        <button className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition">
          Add Patient
        </button>
      </form>

      {/* Table */}
      <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200">
        <table className="w-full text-left">

          <thead className="bg-slate-100 text-slate-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-3">ID</th>
              <th className="py-3 px-3">Name</th>
              <th className="py-3 px-3">Age</th>
              <th className="py-3 px-3">Gender</th>
              <th className="py-3 px-3">Phone</th>
              <th className="py-3 px-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className="border-b hover:bg-slate-50 transition"
              >
                <td className="py-3 px-3">{patient.id}</td>
                <td className="py-3 px-3 font-medium">{patient.name}</td>
                <td className="py-3 px-3">{patient.age}</td>
                <td className="py-3 px-3">{patient.gender}</td>
                <td className="py-3 px-3">{patient.phone}</td>

                <td className="py-3 px-3">

                  {/* Buttons Side by Side */}
                  <div className="flex gap-3">

                    <button
                      onClick={() => navigate(`/predict/${patient.id}`)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      Check Anaemia
                    </button>

                    <button
                      onClick={() => handleDelete(patient.id)}
                      className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      Delete
                    </button>

                  </div>

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