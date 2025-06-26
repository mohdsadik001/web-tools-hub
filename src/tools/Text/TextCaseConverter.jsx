import React, { useState } from "react";

const TextCaseConverter = () => {

  const upperCase = () => {
    setText(text.toUpperCase())
  }

  const sentenceCase = ()=> {
    setText(text.toLowerCase().replace(/([.?!]\s*|^)([a-z])/g, (match, separator, char) => {
      return separator + char.toUpperCase();
    }))
  }

  const lowerCase = ()=> {
    setText(text.toLowerCase())
  }

  const titleCase = () => {
    setText(text.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "))
  }

  const inverseCase = () => {
    setText(text.split("").map(char => char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase()).join(""))
  }

  const mixedCase = () => {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      result += i % 2 === 0 ? text[i].toLowerCase() : text[i].toUpperCase();
  }
    setText(result)
  }

  const [text, setText] = useState("");
  return (
    <div className="mt-16 flex flex-col px-6 md:px-16 lg:px-24 xl:px-32 py-4">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">Case Converter</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      <div className="flex gap-3 w-full items-center justify-between mt-3">
          <button onClick={sentenceCase} className='cursor-pointer px-6 py-2 mt-2 bg-white hover:bg-primary hover:text-white border-2 border-primary transition text-primary rounded-full text-xl'>Sentence case</button>
          <button onClick={upperCase} className='cursor-pointer px-6 py-2 mt-2 bg-white hover:bg-primary hover:text-white border-2 border-primary transition text-primary rounded-full text-xl'>UPPER CASE</button>
          <button onClick={lowerCase} className='cursor-pointer px-6 py-2 mt-2 bg-white hover:bg-primary hover:text-white border-2 border-primary transition text-primary rounded-full text-xl'>lower case</button>
          <button onClick={titleCase} className='cursor-pointer px-6 py-2 mt-2 bg-white hover:bg-primary hover:text-white border-2 border-primary transition text-primary rounded-full text-xl'>Title Case</button>
          <button onClick={mixedCase} className='cursor-pointer px-6 py-2 mt-2 bg-white hover:bg-primary hover:text-white border-2 border-primary transition text-primary rounded-full text-xl'>MiXEd cAsE</button>
          <button onClick={inverseCase} className='cursor-pointer px-6 py-2 mt-2 bg-white hover:bg-primary hover:text-white border-2 border-primary transition text-primary rounded-full text-xl'>iNvErSe cAsE</button>
      </div>
      
      <textarea
        onChange={(e) => {
          setText(e.target.value);
        }}
        className="border-1 border-gray-400 px-4 py-2 text-xl font-light rounded mt-4 outline-primary text-justify"
        value={text}
        type="text"
        placeholder="Enter your text..."
        required
        rows={15}
        cols={30}
        // maxLength={300}
      ></textarea>
      <p>{text.length} characters</p>

        
        
          <div className="flex items-center mt-3 gap-5 w-full">
            <button onClick={()=> setText("")} className='flex gap-4 items-center justify-center cursor-pointer w-full px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded text-xl'><i class="ri-brush-2-line"></i> Reset</button>
            <button onClick={()=>  navigator.clipboard.writeText(text).then(() => alert("Copied!"))} className='flex gap-4 items-center justify-center cursor-pointer w-full px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded text-xl'><i class="ri-clipboard-line"></i> Copy Text</button>
          </div>
      
    </div>
  );
};

export default TextCaseConverter;
