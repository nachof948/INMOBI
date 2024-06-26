import { useEffect, useState } from "react"
import { UploadImageList } from "../components/UploadImageList"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from 'react-router-dom'
import * as api from '../api/index'
import { listGet, listUpdate } from "../redux/actions/listing"

const UpdateListing = () => {
  const { id } = useParams()
  const {user} = useSelector((state) => state.auth)
  const { list } = useSelector((state) => state.listing)

  const dispatch = useDispatch()

  const [error, setError] = useState('')
  const navegar = useNavigate()

  const checkboxStyle = 'w-5 h-5 cursor-pointer'
  const spanStyle = 'font-semibold text-lg'
  const [formData, setFormData] = useState({
    imageUrls:[],
    name:'',
    description:'',
    adress:'',
    type:'',
    bedrooms:'',
    bathrooms:'',
    regularPrice:'',
    discountPrice:'',
    offer:false,
    parking: false,
    furnished: false,
    userRef:''
  })

  useEffect(() => {
    dispatch(listGet(id))
  } ,[dispatch, id])

  useEffect(() => {
    if (list) {
      setFormData({
        ...formData,
        name: list.name || '',
        description: list.description || '',
        adress: list.adress || '',
        type: list.type || '',
        bedrooms: list.bedrooms || '',
        bathrooms: list.bathrooms || '',
        regularPrice: list.regularPrice || '',
        discountPrice: list.discountPrice || '',
        offer: list.offer || false,
        parking: list.parking || false,
        furnished: list.furnished || false,
        imageUrls: list.imageUrls || [],
        userRef: user?.result?._id || '',
      })
    }
  }, [list, user?.result?._id])

  const handleImageUrlsChange = (updatedImageUrls) => {
    setFormData({...formData, imageUrls: updatedImageUrls});
  };

  
  const handleChange = (e) =>{
    //Cambiar el valor de sale a rent o viceversa
    if(
      e.target.name === 'sale' || 
      e.target.name === 'rent'
    ) {
      setFormData({
        ...formData,
        type: e.target.name,
      })
    }

    //True or False
    if(
      e.target.name === 'parking' || 
      e.target.name === 'furnished' || 
      e.target.name === 'offer'
    ){
      setFormData({
        ...formData,
        [e.target.name]: e.target.checked,
      })
    }

    //Para completa con strings o number
    if(
      e.target.type === 'number' || 
      e.target.type === 'text' || 
      e.target.type === 'textarea'
    ){
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    }
  }  

  const handleSubmit= async (e) =>{
    e.preventDefault();
    if(formData.imageUrls < 1) {return setError('Debes subir al menos una imagen')}
    
    if(+formData.regularPrice < +formData.discountPrice) {return (setError('El precio descontado debe ser menor al regular'))}
     try{
      await dispatch(listUpdate(id, formData))
      navegar(`/publicacion/${id}`)
    }catch(error){
      console.log(error)
    }
  }
  return(
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Editar una propiedad</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input 
            type="text" 
            name="name" 
            placeholder="Nombre" 
            className="border p-3 rounded-lg" 
            maxLength={'62'} 
            minLength={'10'} 
            required 
            onChange={handleChange}
            value={formData.name}
            />
          <textarea 
            type="text" 
            name="description" 
            placeholder="Descripcion" 
            className="border p-3 rounded-lg resize-none" 
            required 
            onChange={handleChange}
            value={formData.description}
            />
          <input 
            type="text" 
            name="adress" 
            placeholder="Direccion" 
            className="border p-3 rounded-lg" 
            maxLength={'62'} 
            minLength={'10'} 
            required 
            onChange={handleChange}
            value={formData.adress}
            />
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex gap-2 items-center">
              <input 
                type="checkbox" 
                name="sale" 
                className={checkboxStyle} 
                onChange={handleChange} 
                checked={formData.type === 'sale'}/>
              <span className={spanStyle}>Vender</span>
            </div>
            <div className="flex gap-2 items-center">
              <input 
                type="checkbox" 
                name="rent" 
                className={checkboxStyle} 
                onChange={handleChange}
                checked={formData.type ==='rent'}
                />
              <span className={spanStyle}>Alquilar</span>
            </div>
            <div className="flex gap-2 items-center">
              <input 
                type="checkbox" 
                name="parking" 
                className={checkboxStyle} 
                onChange={handleChange}
                checked={formData.parking}
                />
              <span className={spanStyle}>Estacionamiento</span>
            </div>
            <div className="flex gap-2 items-center">
              <input 
                type="checkbox" 
                name="furnished" 
                className={checkboxStyle} 
                onChange={handleChange}
                checked={formData.furnished}
                />
              <span className={spanStyle}>Amueblado</span>
            </div>
            <div className="flex gap-2 items-center">
              <input 
                type="checkbox" 
                name="offer" 
                className={checkboxStyle} 
                onChange={handleChange}
                checked={formData.offer}
                />
              <span className={spanStyle}>Oferta</span>
            </div>
          </div>
          <div className=" flex items-center gap-6 flex-wrap">
            <div className=" flex items-center gap-2">
              <input 
                type="number" 
                name="bedrooms" 
                min={'1'} 
                max={'10'} 
                required 
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bedrooms}
                />
              <span className={spanStyle}>Habitaciones</span>
            </div>
            <div className=" flex items-center gap-2">
              <input 
                type="number" 
                name="bathrooms" 
                min={'1'} 
                max={'10'} 
                required 
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bathrooms}
                />
              <span className={spanStyle}>Baños</span>
            </div>
            <div className=" flex items-center gap-2">
              <input 
                type="number" 
                name="regularPrice"
                min={'50'} 
                max={'1000000'} 
                required 
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.regularPrice}
                />
              <div className="flex flex-col items-center">
                <span className={spanStyle}>Precio Regular</span>
                <span className="text-xs">($ / Mes)</span>
              </div>
            </div>
            {formData.offer && (
              <div className=" flex items-center gap-2">
                <input 
                  type="number" 
                  name="discountPrice" 
                  min={'0'} 
                  max={'1000000'} 
                  required 
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.discountPrice}
                  />
                <div className="flex flex-col items-center">
                  <span className={spanStyle}>Precio Descontado</span>
                  <span className="text-xs">($ / Mes)</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">Imagenes:
          <span className="font-normal text-gray-600 ml-2">La primera imagen será la portada (max 6).</span>
          </p>
          <UploadImageList onImageChange={handleImageUrlsChange} imageUrl={formData.imageUrls} onImageRemove={handleImageUrlsChange}/>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"> Editar la propiedad</button>
          {error && <p className="text-red-700">{error}</p>}
        </div>
      </form>
    </main>
  )
}

export { UpdateListing }