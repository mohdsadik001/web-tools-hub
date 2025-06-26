import React, { useEffect, useState } from 'react'

const MultipleWhiteSpaceRemover = () => {
    const [text, setText] = useState("");
    const removeExtraSpaces = ()=> {
        const cleanText = text.replace(/\s+/g, ' ').trim();
        setText(cleanText)
}

  return (
    <div className="mt-16 flex flex-col px-6 md:px-16 lg:px-24 xl:px-32 py-4">
        <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">Multiple White Space Remover</p>
        <div className="w-24 h-0.5 bg-primary rounded-full"></div>
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
      ></textarea>
      <p>{text.length} characters</p>
    <div>

            <button onClick={removeExtraSpaces} className='flex gap-4 items-center justify-center cursor-pointer w-full px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded text-xl'><i className="ri-scissors-cut-line"></i> Remove Multiple Spaces</button>
    </div>

         <div className="flex items-center mt-3 gap-5 w-full">
            <button onClick={()=> setText("")} className='flex gap-4 items-center justify-center cursor-pointer w-full px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded text-xl'><i className="ri-brush-2-line"></i> Reset</button>
            <button onClick={()=>  navigator.clipboard.writeText(text).then(() => alert("Copied!"))} className='flex gap-4 items-center justify-center cursor-pointer w-full px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded text-xl'><i className="ri-clipboard-line"></i> Copy Text</button>
          </div>
    </div>
  )
}

export default MultipleWhiteSpaceRemover