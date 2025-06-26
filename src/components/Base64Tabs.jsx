import React, { useState } from "react";
import Base64Encoder from "./Base64Encoder";
import Base64Decoder from "./Base64Decoder";
import FileToBase64 from "./FileToBase64";
import FileDecoder from "./FileDecoder";

const Base64Tabs = () => {
  const tabs = ["Encode Text", "Decode Text", "File to Base64", "File Decoder"];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mt-16 px-4 md:px-10 py-6">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        🧬 Base64 Toolkit
      </h1>

      <div className="flex justify-center mb-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm md:text-base border-b-2 transition ${
              activeTab === index
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 border rounded shadow">
        {activeTab === 0 && <Base64Encoder />}
        {activeTab === 1 && <Base64Decoder />}
        {activeTab === 2 && <FileToBase64 />}
        {activeTab === 3 && <FileDecoder />}
      </div>
    </div>
  );
};

export default Base64Tabs;
