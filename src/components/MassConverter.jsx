import React, { useState, useEffect } from "react";
import Select from "react-select";

// Base unit: gram (g)
const massUnits = [
  {
    label: "Milligram (mg)",
    value: "mg",
    factor: 0.001,
    description: "1 mg = 0.001 grams (used for medicine, micro-measurements)",
  },
  {
    label: "Gram (g)",
    value: "g",
    factor: 1,
    description: "1 gram = base unit of mass in the metric system",
  },
  {
    label: "Kilogram (kg)",
    value: "kg",
    factor: 1000,
    description: "1 kg = 1000 grams (used for measuring body weight, groceries)",
  },
  {
    label: "Metric Ton (t)",
    value: "t",
    factor: 1_000_000,
    description: "1 t = 1,000,000 grams (used for heavy goods and cargo)",
  },
  {
    label: "Ounce (oz)",
    value: "oz",
    factor: 28.3495,
    description: "1 oz ≈ 28.35 grams (used in the US for food, mail)",
  },
  {
    label: "Pound (lb)",
    value: "lb",
    factor: 453.592,
    description: "1 lb ≈ 453.59 grams (used in US customary system)",
  },
  {
    label: "US Ton",
    value: "us_ton",
    factor: 907_185,
    description: "1 US Ton = 907,185 grams (used for large mass in the US)",
  },
];

const MassConverter = () => {
  const [inputValue, setInputValue] = useState(1);
  const [fromUnit, setFromUnit] = useState("g");
  const [toUnit, setToUnit] = useState("kg");
  const [convertedValue, setConvertedValue] = useState(0);

  useEffect(() => {
    convertMass();
  }, [inputValue, fromUnit, toUnit]);

  const convertMass = () => {
    const from = massUnits.find((unit) => unit.value === fromUnit);
    const to = massUnits.find((unit) => unit.value === toUnit);
    if (!from || !to) return;
    const valueInGrams = parseFloat(inputValue) * from.factor;
    const result = valueInGrams / to.factor;
    setConvertedValue(result);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const getDescription = (unitValue) =>
    massUnits.find((u) => u.value === unitValue)?.description;

  return (
    <div className="mt-16 px-6 md:px-16 lg:px-24 xl:px-32 py-6">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        ⚖️ Mass Converter
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start mb-4">
  {/* Amount Input */}
  <div className="flex flex-col">
    <input
      type="number"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="border border-gray-400 px-4 py-1.5 rounded outline-primary w-full"
      placeholder="Enter mass"
    />
  </div>

  {/* From Unit Selector */}
  <div className="flex flex-col">
    <Select
      options={massUnits.map((u) => ({
        label: u.label,
        value: u.value,
      }))}
      value={massUnits.find((opt) => opt.value === fromUnit)}
      onChange={(selected) => setFromUnit(selected.value)}
      className="w-full"
      classNamePrefix="select"
    />
    <p className="text-xs text-gray-600 mt-1 min-h-[36px]">
      {getDescription(fromUnit)}
    </p>
  </div>

  {/* To Unit Selector */}
  <div className="flex flex-col">
    <Select
      options={massUnits.map((u) => ({
        label: u.label,
        value: u.value,
      }))}
      value={massUnits.find((opt) => opt.value === toUnit)}
      onChange={(selected) => setToUnit(selected.value)}
      className="w-full"
      classNamePrefix="select"
    />
    <p className="text-xs text-gray-600 mt-1 min-h-[36px]">
      {getDescription(toUnit)}
    </p>
  </div>
</div>


      <div className="flex justify-center mb-4">
        <button
          onClick={swapUnits}
          className="text-sm text-white hover:underline flex items-center gap-1 bg-primary px-4 py-2 rounded cursor-pointer"
        >
          🔄 Swap Units
        </button>
      </div>

      <div className="text-center text-xl font-semibold text-gray-700">
        {inputValue} {fromUnit} ={" "}
        <span className="text-primary font-bold">{convertedValue.toFixed(6)}</span> {toUnit}
      </div>
    </div>
  );
};

export default MassConverter;
