import React, { useState } from "react";

const UrlEncoderDecoder = () => {
  const [mode, setMode] = useState("encode"); // "encode" or "decode"
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  // Encode or decode based on mode
  const processText = (text) => {
    try {
      if (mode === "encode") {
        return encodeURIComponent(text);
      } else {
        return decodeURIComponent(text);
      }
    } catch (e) {
      return "Invalid input for decoding!";
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);
    setOutput(processText(val));
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setInput("");
    setOutput("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert("Copied to clipboard!");
  };

  const clearFields = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md mt-12">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        🔗 URL Encoder / Decoder
      </h2>

      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => handleModeChange("encode")}
          className={`px-6 py-2 rounded ${
            mode === "encode"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } transition`}
        >
          Encode
        </button>
        <button
          onClick={() => handleModeChange("decode")}
          className={`px-6 py-2 rounded ${
            mode === "decode"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } transition`}
        >
          Decode
        </button>
      </div>

      <textarea
        value={input}
        onChange={handleInputChange}
        rows={6}
        placeholder={
          mode === "encode"
            ? "Enter text to encode..."
            : "Enter URL encoded text to decode..."
        }
        className="w-full border border-gray-300 rounded p-4 mb-4 resize-none focus:outline-primary focus:ring-2 focus:ring-primary"
      />

      <div className="mb-4">
        <label className="block font-semibold mb-1">Result:</label>
        <textarea
          readOnly
          value={output}
          rows={6}
          className="w-full border border-gray-300 rounded p-4 resize-none bg-gray-50"
        />
      </div>

      <div className="flex space-x-4 justify-center">
        <button
          onClick={copyToClipboard}
          disabled={!output}
          className={`px-6 py-2 rounded border border-primary text-primary hover:bg-primary hover:text-white transition ${
            !output ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          📋 Copy Result
        </button>

        <button
          onClick={clearFields}
          disabled={!input && !output}
          className={`px-6 py-2 rounded border border-gray-400 text-gray-700 hover:bg-gray-200 transition ${
            !input && !output ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          ✖ Clear
        </button>
      </div>
    </div>
  );
};

export default UrlEncoderDecoder;
