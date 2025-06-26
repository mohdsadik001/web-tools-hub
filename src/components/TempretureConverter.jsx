import React, { useState, useEffect } from "react";
import Select from "react-select"; // ✅ FIXED
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const temperatureUnits = ["Celsius", "Fahrenheit", "Kelvin"];
const unitOptions = temperatureUnits.map((unit) => ({
  value: unit,
  label: unit,
}));

const TemperatureConverter = () => {
  const [inputValue, setInputValue] = useState(0);
  const [fromUnit, setFromUnit] = useState("Celsius");
  const [toUnit, setToUnit] = useState("Fahrenheit");
  const [convertedValue, setConvertedValue] = useState("");
  const [copyMsg, setCopyMsg] = useState("");

  const unitSymbol = (unit) => {
    if (unit === "Celsius") return "°C";
    if (unit === "Fahrenheit") return "°F";
    if (unit === "Kelvin") return "K";
  };

  useEffect(() => {
    convertTemperature();
  }, [inputValue, fromUnit, toUnit]);

  const convertTemperature = () => {
    let tempInC;

    if (fromUnit === "Celsius") tempInC = parseFloat(inputValue);
    else if (fromUnit === "Fahrenheit")
      tempInC = (parseFloat(inputValue) - 32) * (5 / 9);
    else if (fromUnit === "Kelvin") tempInC = parseFloat(inputValue) - 273.15;

    let result;
    if (toUnit === "Celsius") result = tempInC;
    else if (toUnit === "Fahrenheit") result = tempInC * (9 / 5) + 32;
    else if (toUnit === "Kelvin") result = tempInC + 273.15;

    setConvertedValue(result.toFixed(2));
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleCopy = () => {
    const text = `${inputValue} ${unitSymbol(
      fromUnit
    )} = ${convertedValue} ${unitSymbol(toUnit)}`;
    navigator.clipboard.writeText(text);
    setCopyMsg("Copied!");
    setTimeout(() => setCopyMsg(""), 1500);
  };

  const getTempIndicator = () => {
    const val = parseFloat(convertedValue);
    if (toUnit === "Celsius") {
      if (val <= 0) return { emoji: "❄️", color: "text-blue-500" };
      if (val >= 35) return { emoji: "🔥", color: "text-red-500" };
    } else if (toUnit === "Fahrenheit") {
      if (val <= 32) return { emoji: "❄️", color: "text-blue-500" };
      if (val >= 95) return { emoji: "🔥", color: "text-red-500" };
    } else if (toUnit === "Kelvin") {
      if (val <= 273) return { emoji: "❄️", color: "text-blue-500" };
      if (val >= 308) return { emoji: "🔥", color: "text-red-500" };
    }
    return { emoji: "🌤️", color: "text-yellow-600" };
  };

  const chartData = Array.from({ length: 10 }, (_, i) => {
    const value = parseFloat(inputValue) + i - 5;
    let converted = 0;
    let c = 0;

    if (fromUnit === "Celsius") c = value;
    else if (fromUnit === "Fahrenheit") c = (value - 32) * (5 / 9);
    else if (fromUnit === "Kelvin") c = value - 273.15;

    if (toUnit === "Celsius") converted = c;
    else if (toUnit === "Fahrenheit") converted = c * (9 / 5) + 32;
    else if (toUnit === "Kelvin") converted = c + 273.15;

    return {
      x: `${value} ${unitSymbol(fromUnit)}`,
      y: parseFloat(converted.toFixed(2)),
    };
  });

  const { emoji, color } = getTempIndicator();

  return (
    <div className="mt-16 px-6 md:px-16 lg:px-24 xl:px-32 py-6">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        🌡️ Temperature Converter
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-gray-400 px-4 py-1.5 rounded outline-primary w-full"
          placeholder="Enter temperature"
        />

        <Select
          options={unitOptions}
          value={unitOptions.find((opt) => opt.value === fromUnit)}
          onChange={(selected) => setFromUnit(selected.value)}
          className="w-full"
          classNamePrefix="select"
        />

        <Select
          options={unitOptions}
          value={unitOptions.find((opt) => opt.value === toUnit)}
          onChange={(selected) => setToUnit(selected.value)}
          className="w-full"
          classNamePrefix="select"
        />
      </div>

      <div className="flex justify-center mt-2 mb-4">
        <button
          onClick={swapUnits}
          className="text-sm text-white hover:underline flex items-center gap-1 bg-primary px-4 py-2 rounded cursor-pointer"
        >
          🔄 Swap Units
        </button>
      </div>

      <div className="text-center text-xl font-semibold flex flex-col items-center gap-2">
        <div className={color}>
          {inputValue} {unitSymbol(fromUnit)} = {convertedValue}{" "}
          {unitSymbol(toUnit)} {emoji}
        </div>

        <button
          onClick={handleCopy}
          className="text-sm bg-primary text-white px-4 py-1 rounded hover:bg-primary-dull"
        >
          📋 Copy
        </button>
        {copyMsg && <p className="text-green-500 text-xs">{copyMsg}</p>}
      </div>

    </div>
  );
};

export default TemperatureConverter;
