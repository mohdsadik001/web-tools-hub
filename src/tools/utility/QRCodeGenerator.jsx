import React, { useRef, useState } from "react";
// import  QRCode  from "qrcode.react";
import QRCode from "react-qr-code";

import { toPng, toJpeg } from "html-to-image";

const QrCodeGenerator = () => {
  const [text, setText] = useState("");
  const qrRef = useRef(null);

  const downloadQR = async (format = "png") => {
    if (!text) return alert("Please enter some text to generate QR code!");

    const node = qrRef.current;

    try {
      const dataUrl =
        format === "jpeg"
          ? await toJpeg(node)
          : await toPng(node);

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `qr-code.${format}`;
      link.click();
    } catch (error) {
      console.error("Download error", error);
    }
  };

  return (
    <div className="mt-16 px-6 md:px-16 lg:px-24 xl:px-32 py-4 flex flex-col items-center">
      <h2 className="text-2xl font-medium uppercase mb-4">📲 QR Code Generator</h2>

      <input
        type="text"
        placeholder="Enter text or URL..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border border-gray-400 px-4 py-3 rounded w-full max-w-md outline-primary mb-6"
      />

      <div ref={qrRef} className="bg-white p-4 rounded shadow-md">
        {text ? <QRCode value={text} size={300} /> : <p className="text-gray-500">QR code will appear here</p>}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => downloadQR("png")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Export as PNG
        </button>
        <button
          onClick={() => downloadQR("jpeg")}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dull cursor-pointer"
        >
          Export as JPEG
        </button>
      </div>
    </div>
  );
};

export default QrCodeGenerator;
