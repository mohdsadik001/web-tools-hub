import React, { useState, useRef } from "react";

const directions = [
  { label: "To Right", value: "to right" },
  { label: "To Left", value: "to left" },
  { label: "To Bottom", value: "to bottom" },
  { label: "To Top", value: "to top" },
  { label: "45deg", value: "45deg" },
  { label: "135deg", value: "135deg" },
  { label: "225deg", value: "225deg" },
  { label: "315deg", value: "315deg" },
  { label: "Radial", value: "radial" },
];

const GradientGenerator = () => {
  const [colors, setColors] = useState(["#ff0000", "#0000ff"]);
  const [direction, setDirection] = useState("to right");
  const previewRef = useRef();

  // Handle color change for a specific index
  const handleColorChange = (index, value) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  // Add a new color picker (limit 6 max)
  const addColor = () => {
    if (colors.length < 6) setColors([...colors, "#ffffff"]);
  };

  // Remove color by index (min 2 colors)
  const removeColor = (index) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  // Generate CSS gradient string
  const gradientCss =
    direction === "radial"
      ? `radial-gradient(circle, ${colors.join(", ")})`
      : `linear-gradient(${direction}, ${colors.join(", ")})`;

  // Copy CSS code to clipboard
  const copyCss = () => {
    navigator.clipboard.writeText(`background: ${gradientCss};`);
    alert("✅ CSS Gradient copied to clipboard!");
  };

  // Export preview as PNG image
  const exportAsImage = async () => {
    if (!previewRef.current) return;

    try {
      // Dynamically import html-to-image for smaller bundle size
      const htmlToImage = (await import("html-to-image")).default;

      const dataUrl = await htmlToImage.toPng(previewRef.current);
      const link = document.createElement("a");
      link.download = "gradient.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert("Failed to export image.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        🎨 Gradient Generator
      </h1>

      {/* Direction selector */}
      <div className="mb-4 flex flex-wrap gap-3 justify-center">
        {directions.map((dir) => (
          <button
            key={dir.value}
            onClick={() => setDirection(dir.value)}
            className={`px-4 py-2 rounded border ${
              direction === dir.value
                ? "bg-primary text-white border-primary"
                : "bg-white text-primary border-gray-300 hover:bg-primary hover:text-white transition"
            }`}
          >
            {dir.label}
          </button>
        ))}
      </div>

      {/* Color pickers */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {colors.map((color, i) => (
          <div key={i} className="flex items-center space-x-2">
            <input
              type="color"
              value={color}
              onChange={(e) => handleColorChange(i, e.target.value)}
              className="w-12 h-12 rounded cursor-pointer border border-gray-300"
              aria-label={`Select color ${i + 1}`}
            />
            <button
              onClick={() => removeColor(i)}
              disabled={colors.length <= 2}
              className={`text-red-500 font-bold text-xl select-none ${
                colors.length <= 2 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title="Remove color"
            >
              &times;
            </button>
          </div>
        ))}
        <button
          onClick={addColor}
          disabled={colors.length >= 6}
          className={`px-4 py-2 border border-primary rounded text-primary hover:bg-primary hover:text-white transition select-none ${
            colors.length >= 6 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Add color"
        >
          + Add Color
        </button>
      </div>

      {/* Gradient preview */}
      <div
        ref={previewRef}
        className="rounded-lg h-48 mb-6 shadow-lg"
        style={{
          background: gradientCss,
        }}
        aria-label="Gradient preview"
      ></div>

      {/* CSS Code + Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <textarea
          readOnly
          className="flex-grow border border-gray-300 rounded-lg p-3 font-mono text-sm resize-none h-20"
          value={`background: ${gradientCss};`}
          aria-label="CSS Gradient code"
        />

        <div className="flex gap-3">
          <button
            onClick={copyCss}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dull transition"
          >
            📋 Copy CSS
          </button>
          <button
            onClick={exportAsImage}
            className="border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white transition"
          >
            📷 Export PNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default GradientGenerator;
