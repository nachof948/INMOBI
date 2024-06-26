import { useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { listGet } from '../redux/actions/listing'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, EffectFade } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaParking,
} from 'react-icons/fa';
import { CopiedUrl } from "../components/CopiedUrl";



const Listing = () => {
  
  SwiperCore.use([Navigation]);

  const { id } = useParams()
  const { list } = useSelector((state) => state.listing)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listGet(id))
  } ,[dispatch, id])

  return(
    <main>
        <Swiper navigation modules={[EffectFade]} effect="fade">
          {list.imageUrls.map((url) => (
            <SwiperSlide key={url}>
              <img className="h-[550px] w-full object-cover" src={url} alt="Casa" />
            </SwiperSlide>
          ))}
        </Swiper>
        <CopiedUrl />
        <div className="flex flex-col max-w-4xl p-3 mx-auto my-7 gap-4">
          <p className="text-3xl font-semibold">
            {list.name}{' - '}
            US$
            {list.offer 
              ? list.discountPrice.toLocaleString('en-US')
              : list.regularPrice.toLocaleString('en-US')}
            {list.type === 'rent' && '/mes'}
          </p>
          <p className="flex items-center mt-2 gap-2 text-slate-600 text-xl">
            <FaMapMarkedAlt className="text-green-700 text-2xl"/>
            {list.adress}
          </p>
          <div className="flex gap-4">
            <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
              {list.type === 'rent' ? 'Para alquilar' : 'Para vender'}
            </p>
            {list.offer && (
              <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                US${+list.regularPrice - +list.discountPrice} OFF
              </p>
            )}
          </div>
          <div>
            <p className="text-lg text-slate-800"><span className="font-semibold text-xl">Descripción{' '}-</span>{' '}{list.description}</p>
          </div>
          <ul className="flex items-center flex-wrap gap-5 whitespace-nowrap text-green-700 font-semibold">
            <li className="flex items-center gap-2">
              <FaBed className="text-3xl" />
              {list.bedrooms > 1 ? `${list.bedrooms} Habitaciones` : `${list.bedrooms} Habitacion`} 
            </li>
            <li className="flex items-center gap-2">
              <FaBath className="text-3xl" />
              {list.bathrooms > 1 ? `${list.bathrooms} Baños` : `${list.bathrooms} Baño`} 
            </li>
            <li className="flex items-center gap-2">
              <FaParking className="text-3xl" />
              {list.parking ? `Con Cochera` : `Sin Cochera`} 
            </li>
            <li className="flex items-center gap-2">
              <FaChair className="text-3xl" />
              {list.furnished ? `Amueblada` : `Sin Amueblar`} 
            </li>
          </ul>
{/*           <button type="button" className="uppercase mt-3 bg-slate-600 w-full p-3 text-white rounded-md hover:opacity-85">Agregar un comentario</button>
          <Comments /> */}
        </div>
    </main>
  )
}

export { Listing }