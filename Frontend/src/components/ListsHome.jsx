import React, { useEffect, useState } from 'react';
import * as api from '../api/index'
import { ListItem } from '../components/ListItem'
const ListsHome = () => {
  const [offer, setOffer] = useState([])
  const [rent, setRent] = useState([])
  const [sale, setSale] = useState([])

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
    <section className='px-3 max-w-6xl mx-auto'>

    </section>
  )
}

export { ListsHome }