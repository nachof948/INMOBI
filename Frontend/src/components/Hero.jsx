import React from 'react';
import { Link } from 'react-router-dom' 

const Hero = () => {
  return(
    <section className='flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto'>
      <h1 className='text-slate-700 font-bold text-4xl lg:text-6xl'>
        Encontra tu proximo <span className='text-slate-500'>hogar</span> 
        <br/>
        con facilidad
      </h1>
      <div className="text-gray-700 text-sm sm:text-lg">
        INMOBI es el mejor lugar para encontrar tu proximo hogar para vivir.
        <br />
        Tenenos una gran variedad de propiedades para que puedas elegir.
      </div>
      <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
        Empecemos...
      </Link>
    </section>
  )
}

export { Hero }