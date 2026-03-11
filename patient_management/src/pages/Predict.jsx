import React, { useState, useEffect } from "react";

const Predict = ({ patientId }) => {
  const [patientName, setPatientName] = useState("");   // 🔥 NEW

  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    hb: "",
    b12: "",
    folate: "",
    iron: "",
  });

  const [rbcImage, setRbcImage] = useState(null);
  const [eyeImage, setEyeImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    console.log("Received Patient ID:", patientId);
  }, [patientId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientId) {
      setErrorMsg("Invalid Patient ID");
      return;
    }

    if (!patientName) {
      setErrorMsg("Patient Name is required");
      return;
    }

    if (!rbcImage || !eyeImage) {
      setErrorMsg("Please upload both images");
      return;
    }

    setLoading(true);
    setResult(null);
    setErrorMsg("");

    const data = new FormData();

    // 🔥 IMPORTANT: send name
    data.append("patient_id", patientId);
    data.append("patient_name", patientName);

    data.append("rbc_image", rbcImage);
    data.append("eye_image", eyeImage);

    data.append("gender", formData.gender);
    data.append("age", parseFloat(formData.age));
    data.append("hb", parseFloat(formData.hb));
    data.append("b12", parseFloat(formData.b12));
    data.append("folate", parseFloat(formData.folate));
    data.append("iron", parseFloat(formData.iron));

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend error:", errorText);
        setErrorMsg("Backend Error: " + errorText);
        setLoading(false);
        return;
      }

      const resultData = await response.json();
      console.log("Prediction result:", resultData);

      setResult(resultData);
    } catch (error) {
      console.error("Fetch error:", error);
      setErrorMsg("Network Error. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        🩺 Anaemia Prediction
      </h2>

      {errorMsg && (
        <div className="bg-red-100 text-red-700 p-4 mb-6 rounded-lg">
          {errorMsg}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-4">

          {/* 🔥 PATIENT NAME FIELD */}
          <input
            type="text"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="border p-3 rounded"
            required
          />

          <input
            type="file"
            onChange={(e) => setRbcImage(e.target.files[0])}
            className="border p-2 rounded"
            required
          />

          <input
            type="file"
            onChange={(e) => setEyeImage(e.target.files[0])}
            className="border p-2 rounded"
            required
          />

          <input
            name="gender"
            placeholder="Gender (Male/Female)"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            name="age"
            placeholder="Age"
            type="number"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            name="hb"
            placeholder="Hemoglobin"
            type="number"
            step="0.1"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            name="b12"
            placeholder="B12"
            type="number"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            name="folate"
            placeholder="Folate"
            type="number"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            name="iron"
            placeholder="Iron"
            type="number"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-full"
        >
          {loading ? "Predicting..." : "🔍 Run Prediction"}
        </button>
      </form>

      {result && (
        <div className="mt-10 bg-white p-8 rounded-2xl shadow-xl border">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">Prediction Result</h3>

            <span
              className={`px-5 py-2 rounded-full text-white font-semibold ${
                result.result === "Anaemia Detected"
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
            >
              {result.result}
            </span>
          </div>

          <div className="mt-6">
            <p className="font-semibold mb-2">
              Confidence Level:{" "}
              {(result.probability * 100).toFixed(1)}%
            </p>

            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all duration-500 ${
                  result.result === "Anaemia Detected"
                    ? "bg-red-500"
                    : "bg-green-500"
                }`}
                style={{
                  width: `${result.probability * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-3">
              🧠 Risk Explanation
            </h4>

            <ul className="space-y-2">
              {result.explanation &&
                result.explanation.map((item, index) => (
                  <li
                    key={index}
                    className="bg-gray-100 px-4 py-3 rounded-lg"
                  >
                    {item}
                  </li>
                ))}
            </ul>
          </div>
          {/* 🥗 DIET RECOMMENDATION */}
{result.diet_recommendation && result.diet_recommendation.length > 0 && (
  <div className="mt-8">
    <h4 className="text-lg font-semibold mb-3">
      🥗 Recommended Diet
    </h4>

    <ul className="list-disc ml-6 space-y-2">
      {result.diet_recommendation.map((food, index) => (
        <li
          key={index}
          className="bg-green-50 px-4 py-2 rounded-lg"
        >
          {food}
        </li>
      ))}
    </ul>
  </div>
)}

{/* ⚕️ MEDICAL ADVICE */}
{result.medical_advice && result.medical_advice.length > 0 && (
  <div className="mt-6 bg-yellow-100 p-4 rounded-lg">
    <h4 className="font-semibold mb-2">
      ⚕️ Medical Advice
    </h4>

    {result.medical_advice.map((tip, i) => (
      <p key={i} className="text-gray-700">
        • {tip}
      </p>
    ))}
  </div>
)}+
        </div>
      )}
      
    </div>
  );
};

export default Predict;