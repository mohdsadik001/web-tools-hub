import React, { useState, useEffect } from "react";

const TimestampConverter = () => {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    convertToDate(timestamp);
  }, []);

  const convertToDate = (ts) => {
    const d = new Date(ts * 1000);
    setDateStr(d.toLocaleString());
  };

  const convertToTimestamp = (date) => {
    const ts = Math.floor(new Date(date).getTime() / 1000);
    setTimestamp(ts);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${timestamp} = ${dateStr}`);
    alert("📋 Copied to clipboard!");
  };

  const handleExport = () => {
    const blob = new Blob([`${timestamp} = ${dateStr}`], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "timestamp.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleNow = () => {
    const now = Math.floor(Date.now() / 1000);
    setTimestamp(now);
    convertToDate(now);
  };

  return (
    <div className="px-4 py-2 md:py-6 md:px-10 lg:px-16 xl:px-24 max-w-4xl mx-auto mt-2 md:mt-12 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
        ⏱️ Timestamp Converter
      </h2>

      <div className="space-y-4 md:space-y-6">
        <div>
          <label className="block text-base font-medium mb-1">
            🔢 UNIX Timestamp
          </label>
          <input
            type="number"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg text-lg outline-primary"
            value={timestamp}
            onChange={(e) => {
              const value = e.target.value;
              setTimestamp(value);
              convertToDate(value);
            }}
          />
        </div>

        <div>
          <label className="block text-base font-medium mb-1">
            📅 Human-Readable Date
          </label>
          <input
            type="datetime-local"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg text-lg outline-primary"
            value={new Date(timestamp * 1000).toISOString().slice(0, 16)}
            onChange={(e) => convertToTimestamp(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
          <button
            onClick={handleNow}
            className="px-5 py-3 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
          >
            🔄 Use Current Time
          </button>
          <button
            onClick={handleCopy}
            className="px-5 py-3 bg-primary text-white text-sm sm:text-base rounded-lg hover:bg-primary-dull transition w-full sm:w-auto"
          >
            📋 Copy
          </button>
          <button
            onClick={handleExport}
            className="px-5 py-3 border border-primary text-primary text-sm sm:text-base rounded-lg hover:bg-primary hover:text-white transition w-full sm:w-auto"
          >
            💾 Export
          </button>
        </div>

        <div className="mt-4 text-center text-lg text-gray-600 bg-gray-200 p-2 md:p-4 rounded">
          {timestamp && dateStr && (
            <>
              <p>
                🧠 <strong>{timestamp}</strong> ={" "}
                <span className="text-black font-medium">{dateStr}</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimestampConverter;
