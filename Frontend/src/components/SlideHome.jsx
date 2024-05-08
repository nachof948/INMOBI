import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../api/index'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, EffectFade } from 'swiper/modules';
import {ListItem} from '../components/ListItem'
import 'swiper/swiper-bundle.css';

const SlideHome = () => {
  const [offer, setOffer] = useState([])
  const [rent, setRent] = useState([])
  const [sale, setSale] = useState([])

  SwiperCore.use([Navigation])

  useEffect(() => {
    const fetchOffer = async () =>{
      try {
        const { data } = await api.getOfferSearch()
        setOffer(data)
        fetchRent()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchRent = async () =>{
      try {
        const { data } = await api.getRentSearch()
        setRent(data)
        fetchSale()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchSale = async () =>{
      try {
        const { data } = await api.getSaleSearch()
        setSale(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOffer()
  } ,[])
  return(
    <section className='pb-10'>
      <Swiper navigation modules={[EffectFade]} effect="fade">
        {offer.map((off) => (
          <SwiperSlide>
            <div style={{background:`url(${off.imageUrls[0]}) center no-repeat`, backgroundSize:'cover'}} className="h-[700px]" key={off._id}></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="px-3 mx-auto max-w-7xl">
      <div className="flex flex-col gap-4 mt-4">
        <h1 className='text-2xl font-bold text-slate-700'>Ofertas recientes</h1>
        <Link to={'/search?offer=true'}>Mostrar mas ofertas</Link>
        <div className="flex items-center gap-4">
          {offer.map((off) =>(
            <ListItem list={off} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <h1 className='text-2xl font-bold text-slate-700'>Alquileres recientes</h1>
        <Link to={'/search?type=rent'}>Mostrar mas alquileres</Link>
        <div className="flex items-center gap-4">
          {rent.map((rent) =>(
            <ListItem list={rent} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <h1 className='text-2xl font-bold text-slate-700'>En venta recientes</h1>
        <Link to={'/search?type=sale'}>Mostrar mas propiedades en venta</Link>
        <div className="flex items-center gap-4">
          {sale.map((sale) =>(
            <ListItem list={sale} />
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}

export { SlideHome }