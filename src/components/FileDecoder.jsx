import React, { useState } from "react";

const FileDecoder = () => {
  const [decodedContent, setDecodedContent] = useState("");
  const [isImage, setIsImage] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const base64Str = reader.result;

        // Try decoding the Base64 content
        const decoded = decodeURIComponent(escape(atob(base64Str)));
        setDecodedContent(decoded);
        setIsImage(false);
      } catch {
        // If it's not decodable text, treat it as image
        setDecodedContent(`data:image/*;base64,${reader.result}`);
        setIsImage(true);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">📁 Upload Base64 File to Decode</h3>

      <input
        type="file"
        accept=".txt,.b64"
        onChange={handleFileChange}
        className="mb-4"
      />

      {decodedContent && (
        <div className="mt-4 border rounded p-4 bg-gray-50">
          <h4 className="font-medium mb-2">🔓 Decoded Output:</h4>
          {isImage ? (
            <img src={decodedContent} alt="Decoded Preview" className="max-w-full" />
          ) : (
            <div className="whitespace-pre-wrap break-words font-mono text-sm">
              {decodedContent}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileDecoder;
