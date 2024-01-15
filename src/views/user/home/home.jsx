import React, { useEffect, useState } from 'react'
import SearchForm from './searchForm/searchForm'
import './home.css'
import Hotels from './hotels/hotels'
import { getHasAvailableRoomsAPI } from '../../../api/hotelService';

export default function Home() {
    const [data, setData] = useState([])
    const [formSearch, setFormSearch] = useState({
        destination: null,
        checkInDate: null,
        checkOutDate: null,
        personQuantity: null
    })

    const getAllHotels = () => {
        if (formSearch.checkInDate === null && formSearch.checkOutDate === null && formSearch.destination === null && formSearch.personQuantity === null) {
            getHasAvailableRoomsAPI(`hotels/getHasAvailableRooms`)
                .then((res) => {
                    setData(res.data.data);
                }).catch((Error) => {
                    console.log(Error);
                })
        } else {
            getHasAvailableRoomsAPI(`hotels/getHasAvailableRooms`, formSearch)
                .then((res) => {
                    setData(res.data.data);
                }).catch((Error) => {
                    console.log(Error);
                })
        }
    }
    useEffect(() => {
        getAllHotels()
    }, [formSearch]);

    return (
        <div className='mx-auto h-screen'>
            <div className='h-40 w-full'>
                <SearchForm setFormSearch={setFormSearch} />
            </div>
            <div className='mt-4 min-h-screen w-full bg-white rounded-tl-3xl rounded-tr-3xl'>
                <Hotels data={data} />
            </div>
        </div>
    )
}
