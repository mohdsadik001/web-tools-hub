import React, { useState } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copyMsg, setCopyMsg] = useState("");

  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:',.<>/?";

  const generatePassword = () => {
    let charPool = "";
    if (includeUpper) charPool += upperChars;
    if (includeLower) charPool += lowerChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    if (!charPool) {
      setPassword("");
      return;
    }

    let generated = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      generated += charPool[randomIndex];
    }
    setPassword(generated);
  };

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopyMsg("Copied!");
    setTimeout(() => setCopyMsg(""), 1500);
  };

  // Simple strength estimator based on length and variety
  const getStrength = () => {
    let score = 0;
    if (includeUpper) score++;
    if (includeLower) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;
    if (length >= 12) score++;

    if (score <= 2) return { label: "Weak", color: "text-red-600" };
    if (score === 3 || score === 4) return { label: "Medium", color: "text-yellow-600" };
    if (score === 5) return { label: "Strong", color: "text-green-600" };
  };

  const strength = getStrength();

  return (
    <div className="h-[92vh] flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4 py-12">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full">
        <h2 className="text-xl md:text-3xl font-bold text-center text-primary mb-6">
          🔐 Password Generator
        </h2>

        {/* Length */}
        <div className="mb-4">
          <label htmlFor="length" className="block font-semibold mb-1">
            Password Length: {length}
          </label>
          <input
            type="range"
            id="length"
            min={8}
            max={32}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={() => setIncludeUpper((prev) => !prev)}
              className="accent-purple-600"
            />
            Include Uppercase
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={() => setIncludeLower((prev) => !prev)}
              className="accent-purple-600"
            />
            Include Lowercase
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers((prev) => !prev)}
              className="accent-purple-600"
            />
            Include Numbers
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols((prev) => !prev)}
              className="accent-purple-600"
            />
            Include Symbols
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="w-full bg-primary hover:bg-primary-dull cursor-pointer text-white py-3 rounded-lg font-semibold transition"
        >
          Generate Password
        </button>

        {/* Password Display */}
        {password && (
          <div className="mt-6 p-2 md:p-4 bg-gray-100 rounded-lg flex flex-col gap-2 md:flex-row items-center  md:justify-between font-mono text-lg break-all select-all">
            <span className="w-full text-center overflow-scroll">{password}</span>
            <button
              onClick={copyToClipboard}
              className="text-white w-full hover:bg-primary-dull bg-primary md:px-4 py-1 rounded cursor-pointer"
              title="Copy to clipboard"
            >
              📋 Copy
            </button>
          </div>
        )}

        {/* Strength */}
        {password && (
          <p className={`mt-3 text-center font-semibold ${strength.color}`}>
            Strength: {strength.label}
          </p>
        )}
      </div>
    </div>
  );
};

export default PasswordGenerator;
