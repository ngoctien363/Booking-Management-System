import { BarsOutlined, EnvironmentOutlined, HomeOutlined, LikeOutlined, LoginOutlined, LogoutOutlined, MenuUnfoldOutlined, UserOutlined, WhatsAppOutlined, WifiOutlined } from '@ant-design/icons';
import { Modal, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { paymentAPI } from '../../../../api/hotelService';
import { getUserById } from '../../../../api/userService';
import { useNavigate } from 'react-router-dom';

export default function PaymentModal({ isOpen, onClickShowPaymentModal, data, dataDate, quantityRoom }) {
    const userId = useSelector((state) => state.userReducer.userId);
    const [dataUser, setDataUser] = useState({})
    const [open, setOpen] = useState(false);
    const [personCount, setPersonCount] = useState(0)
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const cancelModal = () => {
        setOpen(false)
        onClickShowPaymentModal()
    }

    const getUserInfo = () => {
        getUserById(userId)
            .then((res) => {
                setDataUser(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const TotalDay = () => {
        let aDateParts = dataDate?.checkInDate.split('-');
        let bDateParts = dataDate?.checkOutDate.split('-');
        let a = new Date(aDateParts[2], aDateParts[1] - 1, aDateParts[0]);
        let b = new Date(bDateParts[2], bDateParts[1] - 1, bDateParts[0]);
        let timeDifference = b.getTime() - a.getTime();
        let daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference
    }

    const totalPrice = () => {
        let countPerson = 0
        if (quantityRoom.SINGLE_ROOM > 0) countPerson += (quantityRoom.SINGLE_ROOM * 50) * TotalDay()
        if (quantityRoom.DOUBLE_ROOM > 0) countPerson += (quantityRoom.DOUBLE_ROOM * 100) * TotalDay()
        if (quantityRoom.FAMILY_ROOM > 0) countPerson += (quantityRoom.FAMILY_ROOM * 150) * TotalDay()
        if (quantityRoom.SPECIAL_ROOM > 0) countPerson += (quantityRoom.SPECIAL_ROOM * 250) * TotalDay()
        if (quantityRoom.SUITE_ROOM > 0) countPerson += (quantityRoom.SUITE_ROOM * 200) * TotalDay()
        setPersonCount(countPerson)
    }

    useEffect(() => {
        setOpen(isOpen)
        totalPrice()
        TotalDay()
    }, [isOpen])

    useEffect(() => {
        if (userId !== null) {
            getUserInfo()
        }
    }, [userId])

    const okModal = () => {
        const payment = {
            hotelId: data.id,
            userId: userId,
            checkInDate: dataDate?.checkInDate,
            personQuantity: dataDate?.personQuantity,
            checkOutDate: dataDate?.checkOutDate,
            rooms: quantityRoom
        }
        paymentAPI(`bookingHistories/bookingRooms`, payment)
            .then((res) => {
                messageApi.open({
                    type: 'success',
                    content: 'Xác Nhận Đặt Phòng Thành Công!',
                });
                setTimeout(() => {
                    navigate("/profile/booking-history")
                }, 2000);
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            {contextHolder}
            <Modal
                title={<h2>Xác Nhận Đặt Phòng</h2>}
                centered
                open={open}
                okText="Xác Nhận Đặt Phòng"
                cancelText="Hủy"
                onOk={() => okModal()}
                onCancel={() => cancelModal()}
                width={'60%'}
            >
                <div className="grid grid-flow-row-dense grid-cols-3  ">
                    <div className='p-1'>
                        <div className='border rounded-md px-1'>
                            <h5 className='py-1'><HomeOutlined className='text-base text-amber-700' /> Căn Hộ Cao Cấp</h5>
                            <h2 className='text-xl font-semibold'><HomeOutlined className='text-base text-amber-700' />{data?.name} </h2>
                            <span className='py-1 text-black'><BarsOutlined className='text-base text-amber-700' /> {data?.description} </span>
                            <div className='py-2 text-base text-gray-700 font-medium'><EnvironmentOutlined className='text-green-700 ' /> {data?.address} - {data?.destination}</div>
                            <div className='flex pb-2'>
                                <div className='pr-3 text-sm text-gray-700 '><LikeOutlined className='text-base text-blue-700 ' /> 100 Đánh Giá</div>
                                <div className='pr-3 text-sm text-gray-700 '><WhatsAppOutlined className='text-base text-green-700 ' /> 0339372465</div>
                                <div className='pr-3 text-sm text-gray-700 '><WifiOutlined className='text-base text-red-700 ' /> Wifi Free</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 p-1">
                        <div className='border rounded-md px-2'>
                            <div className='flex items-center py-[34px]'>
                                <div className='h-20 w-20 rounded-full bg-cover' style={{ backgroundImage: `url(https://res.cloudinary.com/dax8xvyhi/image/upload/v1700795002/tezswzzswt8sn4sd0maf.jpg)` }}></div>
                                <h2 className='pl-4 text-xl font-semibold'><UserOutlined className='text-base text-orange-700 ' /> {dataUser?.surname} {dataUser?.name} </h2>
                            </div>
                        </div>
                    </div>
                    <div className='p-1'>
                        <div className='border rounded-md px-1'>
                            <div className='border-b'>
                                <h5 className='py-1'><MenuUnfoldOutlined className='text-base text-amber-700' /> Chi Tiết Đặt Phòng</h5>
                                <div className='flex item justify-between'>
                                    <div>
                                        <h5 className='py-1 pl-3'><LoginOutlined className='text-base text-green-700' /> Nhận Phòng</h5>
                                        <h2 className='pl-3 text-sm font-semibold'> {dataDate?.checkInDate} </h2>

                                    </div>
                                    <div className='pr-5'>
                                        <h5 className='py-1 pl-3'><LogoutOutlined className='text-base text-red-700' /> Trả Phòng</h5>
                                        <h2 className='border-l pl-3 text-sm font-semibold'>{dataDate?.checkOutDate} </h2>
                                    </div>
                                </div>
                                <div className='py-2'>
                                    <div className='text-gray-700'><EnvironmentOutlined className='text-base  font-medium text-green-700 ' /> Tổng thời gian lưu trú</div>
                                    <div className='text-base pl-3 text-gray-700 font-medium'>{TotalDay()} Đêm</div>
                                </div>
                            </div>
                            <div className='pt-2'>
                                <div className='py-2'>
                                    <div className='text-gray-700'><UserOutlined className='text-base  font-medium text-green-700 ' /> Bạn đã chọn</div>
                                    {quantityRoom?.SINGLE_ROOM > 0 && <div className='text-sm pl-5 text-gray-700 font-medium'> + {quantityRoom?.SINGLE_ROOM} Phòng Đơn</div>}
                                    {quantityRoom?.DOUBLE_ROOM > 0 && <div className='text-sm pl-5 text-gray-700 font-medium'> + {quantityRoom?.DOUBLE_ROOM} Phòng Đôi</div>}
                                    {quantityRoom?.FAMILY_ROOM > 0 && <div className='text-sm pl-5 text-gray-700 font-medium'> + {quantityRoom?.FAMILY_ROOM} Phòng Gia Đình</div>}
                                    {quantityRoom?.SUITE_ROOM > 0 && <div className='text-sm pl-5 text-gray-700 font-medium'> + {quantityRoom?.SUITE_ROOM} Phòng Thương Gia</div>}
                                    {quantityRoom?.SPECIAL_ROOM > 0 && <div className='text-sm pl-5 text-gray-700 font-medium'> + {quantityRoom?.SPECIAL_ROOM} Phòng Đặc Biệt</div>}
                                    <div className='text-base pl-3 pt-2 text-gray-700 font-medium'> Cho {dataDate?.personQuantity} Người</div>
                                    <div className='flex items-center justify-between my-4 pr-2 pt-2 border-t'>
                                        <div className='text-base pl-3 text-gray-700 font-medium'>Tổng Tiền</div>
                                        <div className='text-base pl-3 text-gray-700 font-medium'>{personCount}$</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 p-1">
                        <div className='border rounded-md px-2'>
                            <h2 className='text-xl font-semibold'><HomeOutlined className='text-base text-amber-700' /> Thông Tin Chi Tiết Của Bạn </h2>
                            <div className=' flex mb-4'>
                                <div className=" mt-6 space-y-4">
                                    <div className="cursor-pointer">
                                        <p className="ml-2">Last name </p>
                                        <input type="text" disabled value={dataUser?.surname} className="ml-2 py-2 px-2 w-[250px] border rounded-md " />
                                    </div>
                                    <div className="cursor-pointer">
                                        <p className="ml-2"> Phone number </p>
                                        <input type="text" disabled value={dataUser?.phone} className="ml-2 py-2 px-2 w-[250px] border rounded-md " />
                                    </div>
                                </div>
                                <div className=" px-14 mt-6 space-y-4">
                                    <div className="cursor-pointer">
                                        <p className="ml-2">First name</p>
                                        <input type="text" disabled value={dataUser?.name} className="ml-2 py-2 px-2 w-[250px] border rounded-md" />
                                    </div>
                                    <div className="cursor-pointer">
                                        <p className="ml-2">Email </p>
                                        <input type="text" disabled value={dataUser?.email} className="ml-2 py-2 px-2 w-[250px] border rounded-md" />
                                    </div>
                                </div>
                            </div>
                            {/* <div className='flex justify-end'>
                                <button className='mr-2 mb-4 p-2 bg-sky-600 hover:bg-sky-400 font-medium rounded-md text-zinc-50 w-28'>Thanh Toán</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </Modal>
        </ >
    )
}
