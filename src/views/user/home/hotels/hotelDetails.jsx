import { HomeOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { DatePicker, Space, Table, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getHotelByIdAPI, getRoomsByIdHotelAPI } from '../../../../api/hotelService';
import { DOUBLE_ROOM, FAMILY_ROOM, SINGLE_ROOM, SPECIAL_ROOM, SUITE_ROOM } from '../../../../common/constant';
import ModalForm from '../../../components/shared/modal/modal';
import PaymentModal from '../../../components/shared/modal/paymentModal';

const dateFormat = 'DD-MM-YYYY';

export default function HotelDetails() {
    const columns = [
        {
            title: 'Loại Phòng',
            dataIndex: 'roomType',
            key: 'roomType',
            render: (text) => (<>
                {text === SINGLE_ROOM ? <span className='text-green-700 font-medium'>Phòng Đơn</span> :
                    text === DOUBLE_ROOM ? <span className='text-orange-700 font-medium'>Phòng Đôi</span> :
                        text === FAMILY_ROOM ? <span className='text-pink-600 font-medium'>Phòng Gia Đình</span> :
                            text === SUITE_ROOM ? <span className='text-yellow-500 font-medium'>Phòng Thương Gia</span> :
                                text === SPECIAL_ROOM ? <span className='text-blue-500 font-medium'>Phòng Đặc Biệt</span> :
                                    <span>Phòng Khác</span>}
            </>),
        },
        {
            title: 'Phòng Trống',
            dataIndex: 'availableRooms',
            key: 'availableRooms',
        },
        {
            title: 'Tiện Ích',
            dataIndex: 'convenient',
            key: 'convenient',
        },
        {
            title: 'Số Người',
            dataIndex: 'maxPersonNumber',
            key: 'maxPersonNumber',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <span className='text-red-700 font-medium'>{price}$ / Đêm</span>,
        },
        {
            title: 'Đặt Phòng',
            dataIndex: '',
            key: '',
            render: (room) => (
                <div className='flex items-center justify-center '>
                    <button className='mr-2 py-1 px-2 border rounded-md' onClick={() => onClickRoomQuantity(0, room?.roomType, room?.availableRooms)}><MinusOutlined /></button>
                    <input type="text"
                        disabled
                        value={room?.roomType === SINGLE_ROOM ? quantityRoom.SINGLE_ROOM :
                            room?.roomType === DOUBLE_ROOM ? quantityRoom.DOUBLE_ROOM :
                                room?.roomType === FAMILY_ROOM ? quantityRoom.FAMILY_ROOM :
                                    room?.roomType === SPECIAL_ROOM ? quantityRoom.SPECIAL_ROOM :
                                        room?.roomType === SUITE_ROOM ? quantityRoom.SUITE_ROOM : 0}
                        max={room?.roomType === SINGLE_ROOM ? room?.availableRooms :
                            room?.roomType === DOUBLE_ROOM ? room?.availableRooms :
                                room?.roomType === FAMILY_ROOM ? room?.availableRooms :
                                    room?.roomType === SPECIAL_ROOM ? room?.availableRooms :
                                        room?.roomType === SUITE_ROOM ? room?.availableRooms : 0}
                        name={room?.roomType === SINGLE_ROOM ? "SINGLE_ROOM" :
                            room?.roomType === DOUBLE_ROOM ? "DOUBLE_ROOM" :
                                room?.roomType === FAMILY_ROOM ? "FAMILY_ROOM" :
                                    room?.roomType === SPECIAL_ROOM ? "SPECIAL_ROOM" :
                                        room?.roomType === SUITE_ROOM ? "SUITE_ROOM" : ""}
                        className='py-1 px-1 max-w-[50px] border rounded-md text-center'
                    />
                    <button className='ml-2 py-1 px-2 border rounded-md' onClick={() => onClickRoomQuantity(1, room?.roomType, room?.availableRooms)}><PlusOutlined /></button>
                </div>
            )
        },
    ];

    const [messageApi, contextHolder] = message.useMessage();
    const { RangePicker } = DatePicker;
    const HotelIdRedux = useSelector(state => state.hotelReducer.hotelId);
    const searchRedux = useSelector(state => state.hotelReducer.searchForm);
    const [data, setData] = useState(null)
    const [roomData, setRoomData] = useState([])
    const [open, setOpen] = useState(false);
    const [openPayment, setOpenPayment] = useState(false);
    const [indexImage, setIndexImage] = useState(0)
    const userId = useSelector((state) => state.userReducer.userId);
    const [search, setSearch] = useState({
        checkInDate: searchRedux?.checkInDate || '',
        checkOutDate: searchRedux?.checkOutDate || '',
        personQuantity: searchRedux?.personQuantity || 0
    })
    const [quantityRoom, setQuantityRoom] = useState(
        {
            SINGLE_ROOM: 0,
            DOUBLE_ROOM: 0,
            FAMILY_ROOM: 0,
            SPECIAL_ROOM: 0,
            SUITE_ROOM: 0,
        },
    )

    const onClickRoomQuantity = (value, roomType, availableRooms) => {
        let roomKey = "";
        if (roomType === SINGLE_ROOM) roomKey = "SINGLE_ROOM"
        if (roomType === DOUBLE_ROOM) roomKey = "DOUBLE_ROOM"
        if (roomType === FAMILY_ROOM) roomKey = "FAMILY_ROOM"
        if (roomType === SPECIAL_ROOM) roomKey = "SPECIAL_ROOM"
        if (roomType === SUITE_ROOM) roomKey = "SUITE_ROOM"
        if (value === 1) {
            if (availableRooms > quantityRoom[roomKey]) {
                return setQuantityRoom((room) => ({ ...room, [roomKey]: quantityRoom[roomKey] + 1 }));
            }
            return messageApi.open({
                type: 'warning',
                content: 'Vượt quá số phòng trống!',
            });
        } else {
            if (quantityRoom[roomKey] > 0) {
                return setQuantityRoom((room) => ({ ...room, [roomKey]: quantityRoom[roomKey] - 1 }));
            }
            return messageApi.open({
                type: 'warning',
                content: 'Không thể giảm số phòng trống!',
            });
        }
    }


    const onClickShowModal = (index) => {
        setOpen(!open)
        setIndexImage(index)
    }

    const onClickShowPaymentModal = () => {
        if (userId === null) return messageApi.open({
            type: 'warning',
            content: 'Vui Lòng Đăng Nhập Trước Khi Xác Nhận Thanh Toán!',
        });

        if (search.checkInDate === null || search.checkOutDate === null ||
            search.checkInDate === '' || search.checkOutDate === '') {
            return messageApi.open({
                type: 'warning',
                content: 'Vui Lòng Chọn Ngày Nhận Phòng và Ngày Trả Phòng!',
            });

        }

        if (search.personQuantity === 0 || search.personQuantity === undefined) {
            return messageApi.open({
                type: 'warning',
                content: 'Vui lòng chọn số người!',
            });

        }
        if (quantityRoom.DOUBLE_ROOM === 0 && quantityRoom.SINGLE_ROOM === 0
            && quantityRoom.FAMILY_ROOM === 0 && quantityRoom.SPECIAL_ROOM === 0
            && quantityRoom.SUITE_ROOM === 0) {
            return messageApi.open({
                type: 'warning',
                content: 'Vui Lòng Chọn Phòng Trước Khi Thanh Toán!',
            });
        }
        if (quantityRoom.DOUBLE_ROOM < 0 || quantityRoom.SINGLE_ROOM < 0
            || quantityRoom.FAMILY_ROOM < 0 || quantityRoom.SPECIAL_ROOM < 0
            || quantityRoom.SUITE_ROOM < 0) {
            return messageApi.open({
                type: 'warning',
                content: 'Bạn Nhập Sai Số Đặt Phòng Vui Lòng Nhập Lại!',
            });
        }

        let countPerson = 0

        if (quantityRoom.SINGLE_ROOM > 0) countPerson += quantityRoom.SINGLE_ROOM * 2
        if (quantityRoom.DOUBLE_ROOM > 0) countPerson += quantityRoom.DOUBLE_ROOM * 4
        if (quantityRoom.FAMILY_ROOM > 0) countPerson += quantityRoom.FAMILY_ROOM * 6
        if (quantityRoom.SPECIAL_ROOM > 0) countPerson += quantityRoom.SPECIAL_ROOM * 12
        if (quantityRoom.SUITE_ROOM > 0) countPerson += quantityRoom.SUITE_ROOM * 8

        if (search.personQuantity > countPerson) {
            return messageApi.open({
                type: 'warning',
                content: 'Số người không tương ứng với số phòng!',
            });
        }

        setOpenPayment(!openPayment)
    }

    const getHotelById = () => {
        getHotelByIdAPI(`hotels/${HotelIdRedux}`)
            .then((res) => {
                setData(res.data.data);
            }).catch((Error) => {
                console.log(Error);
            })
    }

    const getRoomsByIdHotel = () => {
        if (search.checkInDate === null && search.checkOutDate == null && search.personQuantity === 0) {
            getRoomsByIdHotelAPI(`rooms/getAvailableRooms/${HotelIdRedux}`)
                .then((res) => {
                    setRoomData(res.data.data);
                }).catch((Error) => {
                    console.log(Error);
                })
        } else {
            getRoomsByIdHotelAPI(`rooms/getAvailableRooms/${HotelIdRedux}`, search)
                .then((res) => {
                    setRoomData(res.data.data);
                }).catch((Error) => {
                    console.log(Error);
                })
        }

    }

    useEffect(() => {
        getHotelById()
        getRoomsByIdHotel()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [HotelIdRedux]);

    useEffect(() => {
        getRoomsByIdHotel()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const onChange = (value, dateString) => {
        setSearch((item) => ({ ...item, checkInDate: dateString[0] }))
        setSearch((item) => ({ ...item, checkOutDate: dateString[1] }))
    }
    const onChangePersonQuantity = (value) => {
        if(value.target.value < 0) {
            return messageApi.open({
                type: 'warning',
                content: 'Số Khách Không Hợp Lệ',
            });
        }
        setSearch((item) => ({ ...item, personQuantity: value.target.value }))
    }
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().startOf('day');
    };

    useEffect(() => {
        if (searchRedux !== null) {
            setSearch(() => ({ checkInDate: searchRedux?.checkInDate, checkOutDate: searchRedux?.checkOutDate, personQuantity: searchRedux?.personQuantity }))
        }
    }, [HotelIdRedux, searchRedux]);
    return (
        <div className=' bg-white w-full py-7'>
            {contextHolder}
            <div className='min-h-screen'>
                <div className='max-w-4xl m-auto py-5 rounded-lg shadow-md overflow-hidden bg-gray-200 mb-4'>
                    <div className='flex justify-between'>
                        <div className='pl-4'>
                            <h1 className='text-2xl font-medium'>{data?.name}</h1>
                            <h5 className='text-sm pt-2'>{data?.address}</h5>
                        </div>
                        <div className='text-right pr-4 '>
                        </div>
                    </div>
                    <div className='flex ml-4 mr-4 mt-2 rounded-md overflow-hidden cursor-pointer'>
                        {data && data?.imageURLs?.length <= 2 &&
                            <img className='h-auto max-h-[380px] w-full pl-2' src={data?.imageURLs[0]} alt="" onClick={() => onClickShowModal(0)} />
                        }
                        {data && data?.imageURLs?.length > 2 &&
                            <>
                                <div className='w-1/3'>
                                    <img className='h-[190px] w-full  pb-1' src={data?.imageURLs[0]} alt="" onClick={() => onClickShowModal(0)} />
                                    <img className='h-[190px] w-full pt-1' src={data?.imageURLs[1]} alt="" onClick={() => onClickShowModal(1)} />
                                </div>
                                <div className='w-2/3'>
                                    <img className='h-auto max-h-[380px] w-full pl-2' src={data?.imageURLs[2]} alt="" onClick={() => onClickShowModal(2)} />
                                </div>
                            </>
                        }
                    </div>
                    {data && data?.imageURLs?.length >= 7 ?
                        <div className='flex ml-4 mr-4 mt-2 rounded-md overflow-hidden cursor-pointer'>
                            <>
                                <div className='w-1/3 pr-1'>
                                    <img className='h-36 w-full' src={data?.imageURLs[3]} alt="" onClick={() => onClickShowModal(3)} />
                                </div>
                                <div className='w-1/3 pr-1'>
                                    <img className='h-36 w-full' src={data?.imageURLs[4]} alt="" onClick={() => onClickShowModal(4)} />
                                </div>

                                <div className='w-1/3 pr-1'>
                                    <img className='h-36 w-full' src={data?.imageURLs[5]} alt="" onClick={() => onClickShowModal(5)} />
                                </div>
                            </>
                            {data && data?.imageURLs?.length > 7 ?
                                <div className='w-1/3 relative ' onClick={() => onClickShowModal(6)}>
                                    <img className='h-36 w-full' src="https://res.cloudinary.com/dax8xvyhi/image/upload/v1700795002/tezswzzswt8sn4sd0maf.jpg" alt="" />
                                    <div className='absolute bg-slate-800 opacity-60 h-full w-full top-0'>
                                    </div>
                                    <span className='absolute font-medium text-gray-400 text-lg top-[65px] left-[90px]' >+{data?.imageURLs.length}</span>
                                </div>
                                :
                                <div className='w-1/3 pr-1'>
                                    <img className='h-36 w-full' src={data?.imageURLs[6]} alt="" />
                                </div>
                            }
                        </div>
                        : <></>
                    }

                    <div className='flex justify-between mt-4'>
                        <div className='pl-4'>
                            <h1 className='text-2xl font-medium'>Phòng trống</h1>
                        </div>
                        <div className='text-right pr-4 mt-3'>
                            <div className='flex items-center  rounded shadow-md bg-white'>
                                <div>
                                    <div className='flex items-center justify-between'>
                                        <label className='pl-3 text-gray-600 font-medium'>Nhận Phòng</label>
                                        <label className='pr-16 text-gray-600 font-medium'>Trả Phòng</label>
                                    </div>
                                    <Space direction="vertical" size={20}>
                                        <RangePicker bordered={false} onChange={onChange} format={dateFormat} disabledDate={disabledDate}
                                            defaultValue={[dayjs(searchRedux?.checkInDate, dateFormat), dayjs(searchRedux?.checkOutDate, dateFormat)]}
                                            placeholder={["Nhận Phòng", "Trả Phòng"]} />
                                    </Space>
                                </div>
                                <div >
                                    <div className='flex w-full h-full items-center'>
                                        <div className=' flex items-stretch mr-5 l:mr-0 group w-full p-2 rounded-md '>
                                            <div className='mr-3 w-9'>
                                                <HomeOutlined className='leading-none inline-flex items-center justify-center h-full w-full transform' />
                                            </div>
                                            <span className='flex flex-col w-full truncate group text-left'>
                                                <label className='truncate text-s leading-tight font-medium text-gray-950 focus:text-blue-900'>Khách</label>
                                                <input min={0} defaultValue={searchRedux?.personQuantity} type='number' onChange={onChangePersonQuantity} className='w-40 border rounded-md px-2 py-1 font-normal focus:outline-none placeholder-gray-500 truncate  text-m leading-normal' placeholder="Nhập số lượng!" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='m-4 '>
                        {roomData && roomData?.length > 0 && <Table columns={columns} dataSource={roomData} pagination={{ position: ["none", "none"] }} />}
                        <div className='flex text-right items-center flex-row-reverse'>
                            <button onClick={() => onClickShowPaymentModal()} className=' mt-4 p-2 bg-sky-600 hover:bg-sky-400 font-medium rounded-md text-zinc-50 w-28'>Đặt Ngay</button>
                        </div>
                    </div>
                </div>
                <ModalForm test={open} onClickShowModal={() => onClickShowModal()} data={data} indexImage={indexImage} />
                <PaymentModal isOpen={openPayment} onClickShowPaymentModal={() => onClickShowPaymentModal()} data={data} dataDate={search} quantityRoom={quantityRoom} />
            </div>
        </div >
    )
}
