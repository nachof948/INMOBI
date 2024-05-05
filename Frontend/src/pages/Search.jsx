

const Search = () => {
  return(
    <section className="flex flex-col md:flex-row">
      <div className="p-7 md:min-h-screen border-b-2 border-b-slate-700  md:border-r-2 border-r-slate-600 ">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Busqueda:</label>
            <input 
              type="text" 
              name="search" 
              placeholder="Buscar..."
              className="boder p-3 rounded-lg w-full"
              />
          </div>
          <div className="flex gap-4 flex-wrap items-center">
            <label className="text-lg">Tipo:</label>
            <div className=" flex items-center gap-2 font-semibold">
              <input type="checkbox" name="all" className="w-4 h-4" />
              <span>Alquilar & Comprar</span>
            </div>
            <div className=" flex items-center gap-2 font-semibold">
              <input type="checkbox" name="rent" className="w-4 h-4" />
              <span>Alquilar</span>
            </div>
            <div className=" flex items-center gap-2 font-semibold">
              <input type="checkbox" name="sell" className="w-4 h-4" />
              <span>Comprar</span>
            </div>
            <div className=" flex items-center gap-2 font-semibold">
              <input type="checkbox" name="offer" className="w-4 h-4" />
              <span>Oferta</span>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap items-center">
            <label className="text-lg">Comodidades:</label>
            <div className=" flex items-center gap-2 font-semibold">
              <input type="checkbox" name="parking" className="w-4 h-4" />
              <span>Estacionamiento</span>
            </div>
            <div className=" flex items-center gap-2 font-semibold">
              <input type="checkbox" name="furnished" className="w-4 h-4" />
              <span>Amueblado</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label>Ordenar</label>
            <select name="sort_order" 
              className="border rounded-lg p-3">
              <option>Precio alto a bajo</option>
              <option>Precio bajo a alto</option>
              <option>Recientes</option>
              <option>Antiguas</option>
            </select>
          </div>
          <button className="bg-slate-700 p-3 text-white uppercase rounded-lg hover:opacity-90">Buscar</button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold border border-b-slate-900 p-3 mt-5 text-slate-700 ">Propiedades:</h1>
      </div>
    </section>
  )
}

export { Search }