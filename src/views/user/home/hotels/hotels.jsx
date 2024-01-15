import { LikeOutlined } from '@ant-design/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setHotelIdRedux } from '../../../redux/_actions/hotel.actions';

export default function Hotels({ data }) {

    const dispatch = useDispatch();

    const onLickHotelId = (id) => {
        dispatch(setHotelIdRedux(id))
    }
    return (
        <div className='max-w-4xl m-auto py-5 h-full'>
            {data?.map((item) => (
                <Link to={"hotel/details"} onClick={() => onLickHotelId(item.id)} key={item.id}>
                    <div className='rounded-lg shadow-md  overflow-hidden mb-2 bg-gray-100 cursor-pointer'>
                        <div className='flex justify-between'>
                            <div className='flex'>
                                <img src={item?.imageURL} alt="" className='h-48 w-48' />
                                <div className='pl-6  '>
                                    <h1 className='text-2xl font-medium'>{item.name}</h1>
                                    <h2 className='text-lg pt-2'>{item.description}</h2>
                                    <h2 className='text-lg pt-2 text-green-600 '>{item.address}  - {item.destination}</h2>
                                    <ul className='pt-2'>
                                        {item.rooms?.singleRoom && <li className='pr-4'>{item.rooms?.singleRoom} Phòng Đơn</li>}
                                        {item.rooms?.doubleRoom && <li className='pr-4'>{item.rooms?.doubleRoom} Phòng Đôi</li>}
                                        
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <div className='text-right pr-4 '>
                                    <LikeOutlined className='text-2xl pt-2 pb-2 text-sky-600' />
                                    <h2 className='text-xs pt-2 pb-2'>456 Evaluate</h2>
                                </div>
                                <div className='text-right pr-4 pt-9'>
                                    <h2 className='flex text-xs pt-2 pb-2 text-end'>2 Nights | 2 Guests</h2>
                                    <button className='px-2 py-2 bg-sky-600 hover:bg-sky-400 font-medium rounded-lg text-zinc-50'>Xem chi tiết</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
