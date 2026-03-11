import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import PatientManagement from "./pages/PatientManagement";
import Predict from "./pages/Predict";
import History from "./pages/History";
import { useParams } from "react-router-dom";

const PredictWrapper = () => {
  const { id } = useParams();
  return <Predict patientId={id} />;
};



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/patients" element={<PatientManagement />} />

        {/* ✅ Changed here */}
        <Route path="/predict" element={<Predict />} />
         <Route path="/predict/:id" element={<PredictWrapper />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;