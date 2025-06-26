import React, { useState } from "react";
import imageCompression from "browser-image-compression";

const ImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const [quality, setQuality] = useState(0.7);
  const [maxWidth, setMaxWidth] = useState(1024);
  const [maxHeight, setMaxHeight] = useState(1024);

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    setOriginalImage(URL.createObjectURL(imageFile));
    setOriginalSize((imageFile.size / 1024 / 1024).toFixed(2));

    const options = {
      maxSizeMB: 5,
      maxWidthOrHeight: Math.max(maxWidth, maxHeight),
      initialQuality: quality,
      useWebWorker: true,
    };

    try {
      const compressedBlob = await imageCompression(imageFile, options);
      setCompressedImage(URL.createObjectURL(compressedBlob));
      setCompressedSize((compressedBlob.size / 1024 / 1024).toFixed(2));
    } catch (error) {
      console.error("Compression error:", error);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = compressedImage;
    link.download = "compressed-image.jpg";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4 py-12">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-4xl p-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          📸 Image Compressor Pro
        </h2>

        {/* Compression Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="font-semibold block mb-1">Compression Quality ({quality})</label>
            <input
              type="range"
              min={0.1}
              max={1.0}
              step={0.1}
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">Max Width (px)</label>
            <input
              type="number"
              value={maxWidth}
              onChange={(e) => setMaxWidth(Number(e.target.value))}
              className="border border-gray-300 px-3 py-2 rounded w-full"
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">Max Height (px)</label>
            <input
              type="number"
              value={maxHeight}
              onChange={(e) => setMaxHeight(Number(e.target.value))}
              className="border border-gray-300 px-3 py-2 rounded w-full"
            />
          </div>
        </div>

        {/* File Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-6 block w-full text-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dull"
        />

        {/* Image Previews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {originalImage && (
            <div>
              <h3 className="text-center font-medium mb-2">Original Image</h3>
              <img src={originalImage} alt="original" className="w-full rounded shadow" />
              <p className="text-center text-sm text-gray-600 mt-2">
                Size: {originalSize} MB
              </p>
            </div>
          )}

          {compressedImage && (
            <div>
              <h3 className="text-center font-medium mb-2">Compressed Image</h3>
              <img src={compressedImage} alt="compressed" className="w-full rounded shadow" />
              <p className="text-center text-sm text-gray-600 mt-2">
                Size: {compressedSize} MB
              </p>
              <div className="text-center mt-4">
                <button
                  onClick={handleDownload}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold transition"
                >
                  ⬇️ Download
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;
