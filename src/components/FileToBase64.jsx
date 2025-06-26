import React, { useState } from "react";

const FileToBase64 = () => {
  const [file, setFile] = useState(null);
  const [base64, setBase64] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(base64);
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4"
      />
      {file && (
        <>
          <p className="text-sm mb-2">📁 File: {file.name}</p>
          <div className="bg-gray-100 p-3 rounded border text-xs overflow-x-auto max-h-60">
            {base64}
          </div>
          <button
            onClick={handleCopy}
            className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dull"
          >
            📋 Copy Base64
          </button>
        </>
      )}
    </div>
  );
};

export default FileToBase64;
