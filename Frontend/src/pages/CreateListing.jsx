import { getDownloadURL, getStorage, uploadBytesResumable, ref } from "firebase/storage"
import { useState, useEffect } from "react"
import { app } from "../firebase"
import { UploadImageList } from "../components/UploadImageList"


const CreateListing = () => {
  const checkboxStyle = 'w-5 h-5 cursor-pointer'
  const spanStyle = 'font-semibold text-lg'
  const [formData, setFormData] = useState({
    imagesUrls:[],
  })
  
  const handleImageChange = (imagesUrls) =>{
    setFormData({...formData, imagesUrls: imagesUrls})
  }
  console.log(formData)

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
              <input type="checkbox" name="sale" className={checkboxStyle} />
              <span className={spanStyle}>Vender</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="rent" className={checkboxStyle} />
              <span className={spanStyle}>Alquilar</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="parking" className={checkboxStyle} />
              <span className={spanStyle}>Estacionamiento</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="furnished" className={checkboxStyle} />
              <span className={spanStyle}>Amueblado</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="offer" className={checkboxStyle} />
              <span className={spanStyle}>Oferta</span>
            </div>
          </div>
          <div className=" flex items-center gap-6 flex-wrap">
            <div className=" flex items-center gap-2">
              <input type="number" name="bedrooms" min={'1'} max={'10'} required className="p-3 border border-gray-300 rounded-lg"/>
              <span className={spanStyle}>Habitaciones</span>
            </div>
            <div className=" flex items-center gap-2">
              <input type="number" name="bathrooms" min={'1'} max={'10'} required className="p-3 border border-gray-300 rounded-lg"/>
              <span className={spanStyle}>Baños</span>
            </div>
            <div className=" flex items-center gap-2">
              <input type="number" name="regularPrice" min={'1'} max={'10'} required className="p-3 border border-gray-300 rounded-lg"/>
              <div className="flex flex-col items-center">
                <span className={spanStyle}>Precio Regular</span>
                <span className="text-xs">($ / Mes)</span>
              </div>
            </div>
            <div className=" flex items-center gap-2">
              <input type="number" name="discountPrice" min={'1'} max={'10'} required className="p-3 border border-gray-300 rounded-lg"/>
              <div className="flex flex-col items-center">
                <span className={spanStyle}>Precio Descontado</span>
                <span className="text-xs">($ / Mes)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">Imagenes:
          <span className="font-normal text-gray-600 ml-2">La primera imagen será la portada (max 6).</span>
          </p>
          <UploadImageList onImageChange={handleImageChange} />
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Publicar la propiedad</button>
        </div>
      </form>
    </main>
  )
}

export { CreateListing }