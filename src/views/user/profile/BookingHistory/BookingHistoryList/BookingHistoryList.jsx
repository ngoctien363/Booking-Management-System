import { BarsOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Divider, Row, Select, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookingHistoriesAPI } from "../../../../../api/hotelService";
import "./BookingHistoryList.css";
import { setBookingHistoriesRedux } from "../../../../redux/_actions/hotel.actions";

const { Title } = Typography;

export default function BookingHistoryList() {
  const [bookingHistoryList, setBookingHistoryList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userReducer.userId);
  const [status, setStatus] = useState("UNDEFINED")

  const getBookingHistoryList = () => {
    bookingHistoriesAPI(`bookingHistories/${userId}/${status}`)
      .then((res) => {
        setBookingHistoryList(res.data.data);
        dispatch(setBookingHistoriesRedux(res.data.data))
      }).catch((Error) => {
        console.log(Error);
      })

  };

  const handleChange = (value) => {
    setStatus(value)
  };

  useEffect(() => {
    getBookingHistoryList();
  }, [status, userId]);

  return (
    <div>
      <div className="flex justify-between pb-2">
        <Title level={2}>Lịch Sử Đặt Phòng</Title>
        <Select
          defaultValue="Tất cả"
          style={{
            width: 200,
          }}
          onChange={handleChange}
          options={[
            {
              value: "UNDEFINED",
              label: "Tất cả",
            },
            {
              value: "BOOKED",
              label: "Đã đặt",
            },
            {
              value: "USING",
              label: "Đang sử dụng",
            },
            {
              value: "PAID",
              label: "Đã thanh toán",
            },
            {
              value: "CANCELLED",
              label: "Đã huỷ",
            },

          ]}
        />
      </div>

      {bookingHistoryList?.map((item) => (
        <div
          className="rounded-lg shadow-md overflow-hidden mb-2 bg-gray-100 booking-history-card"
          onClick={() => {
            navigate(`/profile/booking-history/${item.id}`);
          }}
        >
          <Title level={3}> <div><HomeOutlined className='text-2xl text-amber-700' /> {item.hotelName}</div></Title>
          <Row gutter={16} align="middle">
            <Col span={4}>
              <img src={item?.imageURL} alt="" className='h-32 w-32' />
            </Col>
            <Col span={20}>
              <Row align="middle">
                <Col flex={1}>
                  <Title level={4}>
                    Room {item.rooms[0].roomNumber} - {item.rooms[0].roomType}
                  </Title>
                  <div className='py-1'>
                    <span className='text-black'><BarsOutlined className='text-base text-amber-700' /> {" "}{item.rooms[0].convenient} </span>
                  </div>
                  <div className='pr-3 text-sm text-gray-700 '><UserOutlined className='text-base text-green-700 ' /> {item?.personQuantity} Người</div>
                  <div className='flex item '>
                    <div>
                      <h5 className='py-1'><LoginOutlined className='text-base text-green-700' /> Nhận Phòng</h5>
                      <h2 className='pl-3 text-sm font-semibold'> {item?.checkInDate} </h2>
                    </div>
                    <div className='pr-5 ml-3'>
                      <h5 className='py-1'><LogoutOutlined className='text-base text-red-700' /> Trả Phòng</h5>
                      <h2 className='border-l pl-3 text-sm font-semibold'>{item?.checkOutDate} </h2>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* {item.rooms.length > 1 ? (
            <>
              <Divider className="mb-0" />
              <Text className="flex justify-center">See more</Text>
              <Divider className="mt-0 mb-2" />
            </>
          ) : (
            <Divider className="mb-2" />
          )} */}

          <Divider className="mb-2" />
          <Row className="flex items-end">
            <Col flex={1}> Tổng:
              {item.rooms.length > 0 && ` ${item.rooms.length} Phòng`}
              <div className="text-lg font-medium">Ngày Thanh Toán: {item?.paymentDate === null ? <span className="text-red-700 text-sm font-normal">Chưa Thanh Toán</span> : <span className="text-green-700 text-sm font-normal">{item?.paymentDate}</span>}</div>
            </Col>
            <Col
              flex={3}
              className="flex flex-col items-end text-lg text-black-500 font-semibold"
            >
              <div> Tổng Tiền: <span className="text-red-500 font-semibold"> $ {" "} {item.totalPrice} </span></div>
            </Col>
          </Row>
          {/* <Row>
            <Col>Payment Date: </Col>
          </Row> */}
        </div>
      ))}
    </div>
  );
}
