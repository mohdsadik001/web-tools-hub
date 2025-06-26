import React, { useState } from "react";

const Base64Encoder = () => {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [copyMsg, setCopyMsg] = useState("");

  const handleEncode = (input) => {
    try {
      const encodedText = btoa(unescape(encodeURIComponent(input)));
      setEncoded(encodedText);
    } catch (error) {
      setEncoded("Encoding failed. Make sure the input is valid UTF-8.");
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setText(input);
    handleEncode(input);
  };

  const handleCopy = () => {
    if (!encoded) return;
    navigator.clipboard.writeText(encoded);
    setCopyMsg("Copied!");
    setTimeout(() => setCopyMsg(""), 1500);
  };

  const handleClear = () => {
    setText("");
    setEncoded("");
    setCopyMsg("");
  };

  const handleDownload = () => {
    const blob = new Blob([encoded], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "base64-output.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-16 px-6 md:px-16 lg:px-24 xl:px-32 py-6">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        🧬 Base64 Encoder
      </h2>

      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Enter text to encode..."
        rows={6}
        className="w-full border border-gray-300 rounded p-4 text-lg focus:outline-primary resize-none"
      />

      <div className="flex flex-wrap gap-4 mt-4">
        <button
          onClick={handleCopy}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dull transition"
        >
          📋 Copy
        </button>
        <button
          onClick={handleClear}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          ❌ Clear
        </button>
        <button
          onClick={handleDownload}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          ⬇️ Download
        </button>
      </div>

      <div className="mt-6">
        <label className="block font-semibold mb-2 text-gray-700">
          Encoded Base64 Output:
        </label>
        <div className="bg-gray-100 border border-gray-300 rounded p-4 text-sm font-mono break-all select-all">
          {encoded || "Output will appear here..."}
        </div>
        {copyMsg && <p className="text-green-600 mt-2">{copyMsg}</p>}
      </div>
    </div>
  );
};

export default Base64Encoder;
