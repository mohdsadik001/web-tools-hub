import React, { useState, useEffect } from "react";
import Select from "react-select";

// Units and conversion factors
const unitToMeter = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.34,
};

const unitDescriptions = {
  mm: "Millimeter – 1/1000 of a meter",
  cm: "Centimeter – 1/100 of a meter",
  m: "Meter – basic unit of length",
  km: "Kilometer – 1000 meters",
  in: "Inch – 1/12 of a foot",
  ft: "Foot – 12 inches",
  yd: "Yard – 3 feet",
  mi: "Mile – 5280 feet",
};

const units = Object.keys(unitToMeter);

const options = units.map((unit) => ({
  value: unit,
  label: unit.toUpperCase(),
}));

const LengthConverter = () => {
  const [inputValue, setInputValue] = useState(1);
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("cm");
  const [convertedValue, setConvertedValue] = useState(0);

  useEffect(() => {
    convertLength();
  }, [inputValue, fromUnit, toUnit]);

  const convertLength = () => {
    const meters = parseFloat(inputValue) * unitToMeter[fromUnit];
    const result = meters / unitToMeter[toUnit];
    setConvertedValue(result);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="mt-10 px-4 md:px-16 lg:px-24 xl:px-32 py-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">📏 Length Converter</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-gray-300 px-4 py-1.5 rounded outline-primary w-full"
          placeholder="Enter length"
        />

        <Select
          options={options}
          value={options.find((opt) => opt.value === fromUnit)}
          onChange={(opt) => setFromUnit(opt.value)}
          className="w-full"
        />

        <Select
          options={options}
          value={options.find((opt) => opt.value === toUnit)}
          onChange={(opt) => setToUnit(opt.value)}
          className="w-full"
        />
      </div>

      <div className="flex justify-center mt-2 mb-6">
        <button
          onClick={swapUnits}
          className="text-sm text-white hover:underline flex items-center gap-1 bg-primary px-4 py-2 rounded cursor-pointer"
        >
          🔄 Swap Units
        </button>
      </div>

      <div className="text-center text-2xl font-semibold text-primary">
        {inputValue} {fromUnit} = {convertedValue.toFixed(2)} {toUnit}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-center text-sm text-gray-600">
        <p><strong>{fromUnit.toUpperCase()}</strong>: {unitDescriptions[fromUnit]}</p>
        <p><strong>{toUnit.toUpperCase()}</strong>: {unitDescriptions[toUnit]}</p>
      </div>
    </div>
  );
};

export default LengthConverter;
