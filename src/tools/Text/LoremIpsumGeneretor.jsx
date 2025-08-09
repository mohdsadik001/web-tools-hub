import React, { useState } from "react";
import {loremWordPool} from '../../assets/data.js'

const LoremIpsumGeneretor = () => {
    const [paragraphs, setParagraphs] = useState();
    const [avgSentences, setAvgSentences] = useState();
    const [avgWords, setAvgWords] = useState();
    const [output, setOutput] = useState([]);


const generateSentence = (avgWords) => {
  const length = Math.max(6, Math.round(avgWords + (Math.random() - 0.5) * 6)); // ±3
  const words = Array.from({ length }, () => {
    const word = loremWordPool[Math.floor(Math.random() * loremWordPool.length)];
    return word.toLowerCase();
  });
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

const startWithClassic = true;
const classicStart = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
const generateParagraph = (avgSentences, avgWords, isFirst = true) => {
  const sentenceCount = Math.max(2, Math.round(avgSentences + (Math.random() - 0.5) * 2));
  const para = Array.from({ length: sentenceCount }, () => generateSentence(avgWords)).join(" ");
  return isFirst && startWithClassic ? classicStart + para : para;
};


const generateLorem = () => {
    const paras = Array.from({ length: paragraphs }, () =>
    generateParagraph(avgSentences, avgWords)
  );
    setOutput(paras);
  };



  return (
    <div className="mt-2 md:mt-16 flex flex-col px-6 md:px-16 lg:px-24 xl:px-32 py-4">
      <div className="flex flex-col items-end w-max">
        <p className="text-lg md:text-2xl font-medium uppercase">Lorem Ipsum Generator</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>
      <div className="grid grid-row-4 gap-2 md:gap-4 mt-2 md:mt-4 md:grid-cols-4">
        <input onChange={(e) => setParagraphs(Number(e.target.value))}     className="border-1 border-gray-400 px-2 py-2 md:py-3 rounded outline-primary" type="text" placeholder="Paragraph Count" />
        <input onChange={(e) => setAvgSentences(Number(e.target.value))}   className="border-1 border-gray-400 px-2 py-2 md:py-3 rounded outline-primary" type="text" placeholder="Sentence Count Per Para." />
        <input onChange={(e) => setAvgWords(Number(e.target.value))}       className="border-1 border-gray-400 px-2 py-2 md:py-3 rounded outline-primary" type="text" placeholder="Word Count Per Sentence." />
        <button onClick={generateLorem}                                    className='flex gap-2 md:gap-4        px-2 py-2 md:py-3 justify-center items-center cursor-pointer w-full  rounded bg-primary hover:bg-primary-dull transition text-white text-xl'><i className="ri-pencil-line"></i> Generate</button>
      </div>

      <div className="border-1 border-gray-400 px-2 md:px-4 py-2 font-extralight rounded mt-2 outline-none text-justify h-[35vh] md:h-[40vh] overflow-auto">
        <p className="text-sm mb-2 text-gray-400">Lorem impsum text</p>
            {output.map((para, idx) => (
            <p>{para}</p>
        ))}
        </div>
       <div className="flex items-center mt-3 gap-5 w-full">
            <button onClick={()=> setOutput([])}                                                       className='flex gap-1 md:gap-4 items-center justify-center cursor-pointer w-full px-2 md:px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded text-base md:text-xl'><i className="ri-brush-2-line"></i> Reset</button>
            <button onClick={()=>  navigator.clipboard.writeText(output).then(() => alert("Copied!"))} className='flex gap-1 md:gap-4 items-center justify-center cursor-pointer w-full px-2 md:px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded text-base md:text-xl'><i className="ri-clipboard-line"></i> Copy Text</button>
          </div>
    </div>
  );
};

export default LoremIpsumGeneretor;
