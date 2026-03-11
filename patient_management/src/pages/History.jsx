import React, { useEffect, useState } from "react";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/all-history")
      .then((res) => res.json())
      .then((data) => {
        setHistory(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching history:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6">Loading history...</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">
        🏥 All Prediction History
      </h2>

      {history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-xl p-6 border"
            >
              {/* Result */}
              <h3
                className={`text-lg font-semibold ${
                  item.result === "Anaemia Detected"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {item.result}
              </h3>

              {/* Patient Name + ID */}
              <p className="mt-2">
                👤 <span className="font-semibold">
                  {item.patient_name || "Unknown"}
                </span>{" "}
                (ID: {item.patient_id})
              </p>

              {/* Probability */}
              <p className="mt-2">
                Probability:{" "}
                <span className="font-bold">
                  {item.probability}
                </span>
              </p>

              {/* Date */}
              <p className="text-sm text-gray-500 mt-2">
                {new Date(item.created_at).toLocaleString()}
              </p>

              {/* Explanation */}
              {Array.isArray(item.explanation) &&
                item.explanation.length > 0 && (
                  <ul className="mt-4 list-disc list-inside space-y-1">
                    {item.explanation.map((exp, idx) => (
                      <li key={idx}>{exp}</li>
                    ))}
                  </ul>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;