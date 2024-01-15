import { HomeOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchRedux } from '../../../redux/_actions/hotel.actions';
import dayjs from 'dayjs';

export default function SearchForm({ setFormSearch }) {
    const { RangePicker } = DatePicker;
    const dispatch = useDispatch();
    const dateFormat = 'DD-MM-YYYY';
    
      const currentDate = dayjs()
      const tomorrowDate = currentDate.add(1, 'day');
    const [search, setSearch] = useState({
        destination: null,
        checkInDate: currentDate.format(dateFormat),
        checkOutDate: tomorrowDate.format(dateFormat),
        personQuantity: 0
    })

    const handleForm = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setSearch((prevNewUser) => ({
            ...prevNewUser,
            [name]: value,
        }));
    };

    const onChange = (value, dateString) => {
        setSearch((item) => ({ ...item, checkInDate: dateString[0] }))
        setSearch((item) => ({ ...item, checkOutDate: dateString[1] }))
    }
    const onSubmit = () => {
        setFormSearch(search)
        dispatch(setSearchRedux(search))
    }
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const onChangeDesc = (value) => {
        setSearch((item) => ({ ...item, destination: value }))
    };

    useEffect(() => {
        dispatch(setSearchRedux(search))
    }, [dispatch, search])
    

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().startOf('day');
      };

    return (
        <div className='max-w-4xl m-auto py-5 '>
            <div className='border flex items-center justify-between search bg-white'>
                <div >
                    <div className='flex w-full h-full items-center'>
                        <div className='relative flex items-stretch mr-5 l:mr-0  group w-full p-2 rounded-md '>
                            <div className='mr-3 w-9'>
                                <SearchOutlined className='leading-none inline-flex items-center justify-center h-full w-full transform' />
                            </div>
                            <span className='flex flex-col w-full truncate group'>
                                <label className='pl-3 truncate text-s leading-tight font-medium text-gray-950 focus:text-blue-900'>Điểm Đến</label>
                                <Select
                                    showSearch
                                    bordered={false}
                                    placeholder="Chọn Điểm Đến"
                                    optionFilterProp="children"
                                    onChange={onChangeDesc}
                                    filterOption={filterOption}
                                    style={{ width: '200px' }}
                                    options={[
                                        {
                                            value: '',
                                            label: 'Tất Cả',
                                        },
                                        {
                                            value: 'Quy Nhon',
                                            label: 'Quy Nhơn',
                                        },
                                        {
                                            value: 'Da Nang',
                                            label: 'Đà Nẵng',
                                        },
                                        {
                                            value: 'Sai Gon',
                                            label: 'Sài Gòn',
                                        },
                                        {
                                            value: 'Ha Noi',
                                            label: 'Hà Nội',
                                        },
                                        {
                                            value: 'Nha Trang',
                                            label: 'Nha Trang',
                                        },
                                    ]}
                                />
                            </span>
                        </div>
                    </div>
                </div>
                <div className='flex gap-1 px-1 items-center justify-between'>
                    <div>
                        <div className='flex items-center justify-between'>
                            <label className='pl-3 text-gray-600 font-medium'>Nhận Phòng</label>
                            <label className='pr-16 text-gray-600 font-medium'>Trả Phòng</label>
                        </div>
                        <Space direction="vertical" size={20}>
                            <RangePicker 
                                bordered={false} 
                                onChange={onChange}
                                disabledDate={disabledDate}
                                format={'DD-MM-YYYY'}
                                defaultValue={[dayjs(search.checkInDate, dateFormat), dayjs(search.checkOutDate, dateFormat)]} 
                                placeholder={["Nhận Phòng", "Trả Phòng"]}/>
                        </Space>
                    </div>
                    <div >
                        <div className='flex w-full h-full items-center'>
                            <div className='relative flex items-stretch mr-5 l:mr-0 group w-full p-2 rounded-md '>
                                <div className='mr-3 w-9'>
                                    <HomeOutlined className='leading-none inline-flex items-center justify-center h-full w-full transform' />
                                </div>
                                <span className='flex flex-col w-full truncate group'>
                                    <label className='truncate text-s leading-tight font-medium text-gray-950 focus:text-blue-900'>Khách</label>
                                    <input name='personQuantity' onChange={handleForm} className='w-full border-none font-normal focus:outline-none placeholder-gray-500 truncate pr-8 text-m leading-normal' placeholder="Nhập số lượng!" />
                                </span>
                                <Button onClick={() => onSubmit()} icon={<SearchOutlined />}
                                    className='absolute right-0 top-4 bottom-1 w-24 flex justify-center items-center text-grey-900 px-2 py-2 bg-sky-600  hover:text-white font-medium rounded-lg text-zinc-50'
                                >Tìm Kiếm</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
