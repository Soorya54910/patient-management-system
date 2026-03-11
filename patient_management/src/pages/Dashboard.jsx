
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };




  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="flex justify-between items-center bg-red-600 text-white px-8 py-4 shadow-md">
        <h1 className="text-xl font-semibold">
          Anaemia Prediction System 🏥
        </h1>

        <button
            onClick={handleLogout}
            className="bg-white text-red-600 px-4 py-2 rounded-md font-semibold"
        >
            Logout
        </button>
        </div>

      {/* Welcome Section */}
      <div className="px-8 py-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome Doctor 👨‍⚕️
        </h2>
        <p className="text-gray-500 mt-1">
          Monitor and manage anaemia prediction records.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8">

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border-l-4 border-blue-500">
          <h3 className="text-gray-500">Total Predictions</h3>
          <p className="text-3xl font-bold mt-2">120</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border-l-4 border-red-500">
          <h3 className="text-gray-500">Anaemic Cases</h3>
          <p className="text-3xl font-bold mt-2 text-red-600">45</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border-l-4 border-green-500">
          <h3 className="text-gray-500">Normal Cases</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">75</p>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="px-8 py-8 flex flex-wrap gap-4">

        <button
          onClick={() => navigate("/predict")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          ➕ New Prediction
        </button>

        <button
          onClick={() => navigate("/history")}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          📁 View History
        </button>

        <button
          onClick={() => navigate("/analytics")}
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
        >
          📊 Analytics
        </button>
        <button
            onClick={() => navigate("/patients")}
            className="bg-green-500 text-white px-4 py-2 rounded"
            >
            Manage Patients
        </button>

      </div>

    </div>
  );
};

export default Dashboard;