import React, { useState } from "react";

const Base64Decoder = () => {
  const [base64Input, setBase64Input] = useState("");
  const [decodedText, setDecodedText] = useState("");

  const handleDecode = (text) => {
    try {
      const decoded = decodeURIComponent(escape(atob(text)));
      setDecodedText(decoded);
    } catch {
      setDecodedText("❌ Invalid Base64 input.");
    }
  };

  return (
    <div>
      <textarea
        value={base64Input}
        onChange={(e) => {
          setBase64Input(e.target.value);
          handleDecode(e.target.value);
        }}
        placeholder="Paste Base64 encoded text..."
        rows={6}
        className="w-full border border-gray-300 rounded p-4 text-lg focus:outline-primary resize-none"
      />
      <div className="mt-4">
        <label className="block font-semibold mb-2 text-gray-700">
          Decoded Output:
        </label>
        <div className="bg-gray-100 border border-gray-300 rounded p-4 text-sm font-mono break-all select-all">
          {decodedText || "Output will appear here..."}
        </div>
      </div>
    </div>
  );
};

export default Base64Decoder;
