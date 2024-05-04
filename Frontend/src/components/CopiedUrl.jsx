import { useState } from 'react';
import { FaShare } from 'react-icons/fa';

const CopiedUrl = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopied = () =>{
    navigator.clipboard.writeText(window.location.href);
    setCopied(true)
    setTimeout(() =>{
      setCopied(false)
    }, 2000)
  }

  return(
    <div className='absolute top-[150px] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
    <FaShare
      className="text-slate-500"
      onClick={handleCopied}
    />
    {copied && (
      <p className='absolute top-[65px] right-[30px] w-fit text-nowrap z-10 rounded-md bg-green-300 p-2 text-xl'>
        Link copiado!
      </p>
    )}
  </div>
  )
}

export { CopiedUrl }