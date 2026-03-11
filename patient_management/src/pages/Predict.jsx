import React, { useState, useEffect } from "react";

const Predict = ({ patientId }) => {

  const [patientName, setPatientName] = useState("");

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

  // PDF - REPORT
const downloadReport = async () => {

  if (!result) return;

  const form = new FormData();

  form.append("patient_name", patientName);
  form.append("patient_id", patientId);
  form.append("age", formData.age);
  form.append("gender", formData.gender);
  form.append("result", result.result);
  form.append("probability", (result.probability * 100).toFixed(2) + "%");

  form.append("explanation", JSON.stringify(result.explanation));
  form.append("diet", JSON.stringify(result.diet_recommendation));
  form.append("advice", JSON.stringify(result.medical_advice));

  const response = await fetch("http://127.0.0.1:8000/generate-report", {
    method: "POST",
    body: form
  });

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "medical_report.pdf";
  a.click();
};

  /* ---------------- PREDICTION ---------------- */

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
        setErrorMsg("Backend Error: " + errorText);
        setLoading(false);
        return;
      }

      const resultData = await response.json();
      console.log("Prediction Result:", resultData);

      setResult(resultData);

    } catch (error) {
      console.log(error);
      setErrorMsg("Network Error. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="p-10 min-h-screen bg-slate-100">

      <h2 className="text-3xl font-bold mb-8 text-slate-800 flex items-center gap-2">
        🩺 Anaemia Prediction
      </h2>

      {errorMsg && (
        <div className="bg-red-100 text-red-700 p-4 mb-6 rounded-lg">
          {errorMsg}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md border border-slate-200 space-y-6"
      >

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="border border-slate-300 p-2 rounded-lg"
            required
          />

          <div>
            <label className="block text-sm font-medium mb-1">
              Blood Cell Image
            </label>
            <input
              type="file"
              onChange={(e) => setRbcImage(e.target.files[0])}
              className="border p-2 rounded-lg w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Eye Conjunctiva Image
            </label>
            <input
              type="file"
              onChange={(e) => setEyeImage(e.target.files[0])}
              className="border p-2 rounded-lg w-full"
              required
            />
          </div>

          <input
            name="gender"
            placeholder="Gender (Male/Female)"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            name="age"
            placeholder="Age"
            type="number"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            name="hb"
            placeholder="Hemoglobin"
            type="number"
            step="0.1"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            name="b12"
            placeholder="B12"
            type="number"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            name="folate"
            placeholder="Folate"
            type="number"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            name="iron"
            placeholder="Iron"
            type="number"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition w-full"
        >
          {loading ? "Predicting..." : "🔍 Run Prediction"}
        </button>

      </form>

      {result && (

        <div className="mt-10 bg-white p-8 rounded-xl shadow-md border">

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

          <p className="mt-6 font-semibold">
            Confidence: {(result.probability * 100).toFixed(2)}%
          </p>

          {/* DOWNLOAD BUTTON */}

          <button
            onClick={downloadReport}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            📄 Download Medical Report
          </button>
          {/* ---------------- Risk Explanation ---------------- */}

          {result.explanation && result.explanation.length > 0 && (

            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-3">
                🧠 Risk Explanation
              </h4>

              <ul className="space-y-2">
                {result.explanation.map((item, index) => (
                  <li
                    key={index}
                    className="bg-slate-100 px-4 py-3 rounded-lg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          )}

          {/* ---------------- Diet Recommendation ---------------- */}

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

          {/* ---------------- Medical Advice ---------------- */}

          {result.medical_advice && result.medical_advice.length > 0 && (

            <div className="mt-6 bg-yellow-100 p-4 rounded-lg">

              <h4 className="font-semibold mb-2">
                ⚕️ Medical Advice
              </h4>

              {result.medical_advice.map((tip, i) => (
                <p key={i}>• {tip}</p>
              ))}

            </div>

          )}

        </div>

      )}

    </div>
  );
};

export default Predict;