import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <div className="flex justify-between items-center bg-slate-900 text-white px-10 py-4 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🩺</span>
          <h1 className="text-xl font-semibold tracking-wide">
            Anaemia AI Detection System
          </h1>
        </div>

        <button
          onClick={handleLogout}
          className="bg-slate-700 px-4 py-2 rounded-lg hover:bg-slate-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Welcome Section */}
      <div className="px-10 py-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Welcome Doctor 👨‍⚕️
        </h2>
        <p className="text-slate-500 mt-2">
          Monitor predictions, analyze results and manage patient records.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10">

        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <p className="text-slate-500 text-sm">Total Predictions</p>
          <div className="flex justify-between items-center mt-2">
            <h3 className="text-3xl font-bold text-slate-800">120</h3>
            <span className="text-2xl">📊</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <p className="text-slate-500 text-sm">Anaemia Detected</p>
          <div className="flex justify-between items-center mt-2">
            <h3 className="text-3xl font-bold text-red-500">45</h3>
            <span className="text-2xl">🩸</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <p className="text-slate-500 text-sm">Normal Cases</p>
          <div className="flex justify-between items-center mt-2">
            <h3 className="text-3xl font-bold text-emerald-600">75</h3>
            <span className="text-2xl">✅</span>
          </div>
        </div>

      </div>

      {/* Action Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-10 py-10">

        <div
          onClick={() => navigate("/predict")}
          className="bg-indigo-600 text-white p-8 rounded-xl shadow-md hover:bg-indigo-700 cursor-pointer transition"
        >
          <h3 className="text-xl font-semibold">➕ New Prediction</h3>
          <p className="text-sm opacity-80 mt-2">
            Run anaemia detection using medical inputs and images
          </p>
        </div>

        <div
          onClick={() => navigate("/history")}
          className="bg-purple-600 text-white p-8 rounded-xl shadow-md hover:bg-purple-700 cursor-pointer transition"
        >
          <h3 className="text-xl font-semibold">📁 Prediction History</h3>
          <p className="text-sm opacity-80 mt-2">
            View previous prediction results and explanations
          </p>
        </div>

        <div
          onClick={() => navigate("/analytics")}
          className="bg-teal-600 text-white p-8 rounded-xl shadow-md hover:bg-teal-700 cursor-pointer transition"
        >
          <h3 className="text-xl font-semibold">📊 Analytics Dashboard</h3>
          <p className="text-sm opacity-80 mt-2">
            Analyze trends and model performance statistics
          </p>
        </div>

        <div
          onClick={() => navigate("/patients")}
          className="bg-emerald-600 text-white p-8 rounded-xl shadow-md hover:bg-emerald-700 cursor-pointer transition"
        >
          <h3 className="text-xl font-semibold">👨‍⚕️ Manage Patients</h3>
          <p className="text-sm opacity-80 mt-2">
            Add new patients and manage existing records
          </p>
        </div>

      </div>

      {/* System Info */}
      <div className="px-10 pb-10">
        <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            System Overview
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed">
            This AI-powered Anaemia Detection System analyzes medical images
            and blood parameters to detect anaemia conditions. Doctors can
            perform predictions, view explainable AI insights, analyze
            statistics and track patient health records efficiently.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;