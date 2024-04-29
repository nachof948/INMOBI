

const CreateListing = () => {
  return(
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Publica una propiedad</h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input type="text" name="name" placeholder="Nombre" className="border p-3 rounded-lg" maxLength={'62'} minLength={'10'} required />
          <textarea type="text" name="description" placeholder="Descripcion" className="border p-3 rounded-lg resize-none" required />
          <input type="text" name="address" placeholder="Direccion" className="border p-3 rounded-lg" maxLength={'62'} minLength={'10'} required />
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="sale" className="w-5 h-5" />
              <span className="font-semibold text-lg">Vender</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="rent" className="w-5 h-5" />
              <span className="font-semibold text-lg">Alquilar</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="parking" className="w-5 h-5" />
              <span className="font-semibold text-lg">Estacionamiento</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="furnished" className="w-5 h-5" />
              <span className="font-semibold text-lg">Amueblado</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="offer" className="w-5 h-5" />
              <span className="font-semibold text-lg">Oferta</span>
            </div>
          </div>
          <div className=" flex items-center gap-6 flex-wrap">
            <div className=" flex items-center gap-2">
              <input type="number" name="bedrooms" min={'1'} max={'10'} required className="p-3 border border-gray-300 rounded-lg"/>
              <span className="font-semibold text-lg">Habitaciones</span>
            </div>
            <div className=" flex items-center gap-2">
              <input type="number" name="bathrooms" min={'1'} max={'10'} required className="p-3 border border-gray-300 rounded-lg"/>
              <span className="font-semibold text-lg">Baños</span>
            </div>
            <div className=" flex items-center gap-2">
              <input type="number" name="regularPrice" min={'1'} max={'10'} required className="p-3 border border-gray-300 rounded-lg"/>
              <div className="flex flex-col items-center">
                <span className="font-semibold text-lg">Precio Regular</span>
                <span className="text-xs">($ / Mes)</span>
              </div>
            </div>
            <div className=" flex items-center gap-2">
              <input type="number" name="discountPrice" min={'1'} max={'10'} required className="p-3 border border-gray-300 rounded-lg"/>
              <div className="flex flex-col items-center">
                <span className="font-semibold text-lg">Precio Descontado</span>
                <span className="text-xs">($ / Mes)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">Imagenes:
          <span className="font-normal text-gray-600 ml-2">La primera imagen será la portada (max 6).</span>
          </p>
          <div className="flex items-center gap-4">
            <input className="p-3 border border-gray-300 rounded w-full" type="file" name="images" accept="image/*" multiple />
            <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">Subir</button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Publicar la propiedad</button>
        </div>
      </form>
    </main>
  )
}

export { CreateListing }