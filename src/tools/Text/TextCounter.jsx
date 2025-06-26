import React, { useEffect, useState } from "react";

const TextCounter = () => {
  
  const [text, setText] = useState("");
  const [charsCount, setCharsCount] = useState(0)
  const [wordsCount, setWordsCount] = useState(0)
  const [sentenceCount, setSentenceCount] = useState(0)


  useEffect(() => {
    const cleanText = text || ""

    // Characters
    const charsCount = cleanText.length;
    const charsCountNoSpaces = cleanText.replace(/\s/g, "").length;
    setCharsCount(charsCount)


    // Words
    const wordsCount = cleanText.trim().split(/\s+/).filter(Boolean).length;
    setWordsCount(wordsCount);

    // Sentences
    const sentenceCount = (cleanText.match(/[^.!?]+[.!?]+["']?\s*/g) || []).length;
    setSentenceCount(sentenceCount);

  },[text])


  return (
    <div className="mt-16 flex flex-col px-6 md:px-16 lg:px-24 xl:px-32 py-4">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">Text Counter</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>
    <textarea
        onChange={(e) => {
          setText(e.target.value);
        }}
        className="border-1 border-gray-400 px-4 py-2 text-xl font-light rounded mt-4 outline-primary text-justify"
        type="text"
        placeholder="Enter your text..."
        required
        rows={15}
        cols={30}
      ></textarea>
      {/* <p>{text.length} characters</p> */}

      <div className="grid grid-cols-3 gap-5 mt-4">
          <div className="p-4 flex flex-col items-center justify-around border-1 border-primary rounded hover:bg-primary/10">
            <p className="text-5xl font-bold ">{charsCount}</p>
            <p className="text-xl">{charsCount.length > 1 ? "Charaters" : "Character"}</p>
          </div>
          <div className="p-4 flex flex-col items-center justify-around border-1 border-primary rounded hover:bg-primary/10">
            <p className="text-5xl font-bold ">{wordsCount}</p>
            <p className="text-xl">{wordsCount.length > 1 ? "Words" : "Word"}</p>
          </div>
          <div className="p-4 flex flex-col items-center justify-around border-1 border-primary rounded hover:bg-primary/10">
            <p className="text-5xl font-bold ">{sentenceCount}</p>
            <p className="text-xl">{sentenceCount.length > 1 ? "Sentence" : "Sentence"}</p>
          </div>
      </div>

    </div>
  );
};

export default TextCounter;
