import React, { useState } from "react";
import { diffWords, diffChars } from "diff";

const TextDiffChecker = () => {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [diffResult, setDiffResult] = useState([]);
  const [diffMode, setDiffMode] = useState("word"); // "word" or "char"

  const generateDiff = () => {
    const diff =
      diffMode === "word" ? diffWords(textA, textB) : diffChars(textA, textB);
    setDiffResult(diff);
  };

  const renderDiff = (diff) =>
    diff.map((part, index) => {
      const baseStyle = "whitespace-pre-wrap";
      if (part.added) {
        return (
          <mark
            key={index}
            className="bg-green-200 text-green-900 px-1 rounded"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {part.value}
          </mark>
        );
      }
      if (part.removed) {
        return (
          <mark
            key={index}
            className="bg-red-200 text-red-900 line-through px-1 rounded"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {part.value}
          </mark>
        );
      }
      return (
        <span key={index} className={baseStyle}>
          {part.value}
        </span>
      );
    });

  const copyToClipboard = () => {
    // Convert diff to plain text with markers for added/removed
    let plainText = "";
    diffResult.forEach((part) => {
      if (part.added) plainText += `[Added: ${part.value}]`;
      else if (part.removed) plainText += `[Removed: ${part.value}]`;
      else plainText += part.value;
    });

    navigator.clipboard.writeText(plainText);
    alert("Diff copied to clipboard!");
  };

  const exportToFile = () => {
    let plainText = "";
    diffResult.forEach((part) => {
      if (part.added) plainText += `[Added: ${part.value}]`;
      else if (part.removed) plainText += `[Removed: ${part.value}]`;
      else plainText += part.value;
    });

    const blob = new Blob([plainText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "diff-result.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-16 px-6 md:px-16 lg:px-24 xl:px-32 py-6">
      <h2 className="text-3xl font-bold text-primary text-center mb-6">
        📝 Enhanced Text Difference Checker
      </h2>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <textarea
          value={textA}
          onChange={(e) => setTextA(e.target.value)}
          placeholder="Enter original text..."
          className="w-full border border-gray-300 rounded p-4 text-base focus:outline-primary resize-none"
          rows={8}
        />
        <textarea
          value={textB}
          onChange={(e) => setTextB(e.target.value)}
          placeholder="Enter modified text..."
          className="w-full border border-gray-300 rounded p-4 text-base focus:outline-primary resize-none"
          rows={8}
        />
      </div>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={generateDiff}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dull transition"
        >
          🔍 Compare Text
        </button>

        <button
          onClick={copyToClipboard}
          disabled={!diffResult.length}
          className={`px-6 py-2 rounded border ${
            diffResult.length
              ? "border-primary text-primary hover:bg-primary hover:text-white transition cursor-pointer"
              : "border-gray-300 text-gray-300 cursor-not-allowed"
          }`}
        >
          📋 Copy Diff
        </button>

        <button
          onClick={exportToFile}
          disabled={!diffResult.length}
          className={`px-6 py-2 rounded border ${
            diffResult.length
              ? "border-primary text-primary hover:bg-primary hover:text-white transition cursor-pointer"
              : "border-gray-300 text-gray-300 cursor-not-allowed"
          }`}
        >
          💾 Export Diff
        </button>

        <select
          value={diffMode}
          onChange={(e) => setDiffMode(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="word">Word-level Diff</option>
          <option value="char">Character-level Diff</option>
        </select>
      </div>

      {diffResult.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4 bg-gray-50 border border-gray-300 p-4 pb-12 rounded overflow-auto max-h-96">
          <div>
            <h4 className="font-semibold mb-2 text-center">Original Text</h4>
            <div className="whitespace-pre-wrap border p-3 rounded bg-white text-sm font-mono h-full overflow-auto">
              {diffResult.map((part, i) =>
                part.removed ? (
                  <mark
                    key={i}
                    className="bg-red-200 text-red-900 line-through px-1 rounded"
                  >
                    {part.value}
                  </mark>
                ) : (
                  <span key={i}>{part.value}</span>
                )
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-center">Modified Text</h4>
            <div className="whitespace-pre-wrap border p-3 rounded bg-white text-sm font-mono h-full overflow-auto">
              {diffResult.map((part, i) =>
                part.added ? (
                  <mark
                    key={i}
                    className="bg-green-200 text-green-900 px-1 rounded"
                  >
                    {part.value}
                  </mark>
                ) : (
                  <span key={i}>{part.value}</span>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextDiffChecker;
