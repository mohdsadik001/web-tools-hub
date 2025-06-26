import React, { useState } from "react";

const JsonValidator = () => {
  const [input, setInput] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [error, setError] = useState("");

  const validateJson = (text) => {
    try {
      const parsed = JSON.parse(text);
      const pretty = JSON.stringify(parsed, null, 2);
      setFormattedJson(pretty);
      setError("");
    } catch (err) {
      setFormattedJson("");
      setError("❌ Invalid JSON: " + err.message);
    }
  };

  const handleChange = (e) => {
    const text = e.target.value;
    setInput(text);
    validateJson(text);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson);
    alert("Formatted JSON copied to clipboard!");
  };

  const exportFile = (type) => {
    const blob = new Blob([formattedJson], {
      type: type === "json" ? "application/json" : "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `formatted.${type}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearFields = () => {
    setInput("");
    setFormattedJson("");
    setError("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-12 bg-white rounded shadow-md">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        🧾 JSON Validator & Formatter
      </h2>

      <textarea
        value={input}
        onChange={handleChange}
        placeholder="Paste or write your JSON here..."
        rows={10}
        className="w-full border border-gray-300 rounded p-4 text-sm font-mono resize-none focus:outline-primary focus:ring-2 focus:ring-primary"
      />

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded text-sm font-medium">
          {error}
        </div>
      )}

      {formattedJson && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">✅ Formatted JSON:</h3>
          <pre className="bg-gray-50 border border-gray-300 rounded p-4 text-sm font-mono overflow-auto max-h-80">
            {formattedJson}
          </pre>

          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={handleCopy}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dull transition"
            >
              📋 Copy
            </button>
            <button
              onClick={() => exportFile("json")}
              className="border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white transition"
            >
              💾 Export .json
            </button>
            <button
              onClick={() => exportFile("txt")}
              className="border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white transition"
            >
              💾 Export .txt
            </button>
          </div>
        </div>
      )}

      {(input || formattedJson) && (
        <div className="mt-6 text-center">
          <button
            onClick={clearFields}
            className="px-6 py-2 bg-gray-100 text-gray-700 border border-gray-400 rounded hover:bg-gray-200 transition"
          >
            ✖ Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default JsonValidator;
