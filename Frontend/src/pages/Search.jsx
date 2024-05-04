

const Search = () => {
  return(
    <section className="flex flex-col md:flex-row">
      <div className="p-7 md:min-h-screen border-b-2 border-slate-700 md:border-slate-700 border-r-2">
        <form>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Busqueda:</label>
            <input 
              type="text" 
              name="search" 
              placeholder="Buscar..."
              className="boder p-3 rounded-lg w-full"
              />
          </div>
        </form>
      </div>
      <div className="">
        <h1>Propiedades:</h1>
      </div>
    </section>
  )
}

export { Search }