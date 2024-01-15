import React, { useEffect, useState } from "react";
import { Col, Divider, Row, Typography, Button } from "antd";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const { Title } = Typography;


export default function BookingHistoryDetail() {
  const [bookingHistoryDetail, setBookingHistoryDetail] = useState();
  const { id } = useParams();
  const historiesRedux = useSelector(state => state.hotelReducer.histories);


  useEffect(() => {
    if (historiesRedux && historiesRedux.length > 0) {
      const data = historiesRedux.find((history) => history?.id === id)
      setBookingHistoryDetail(data)
    }
  }, [id, historiesRedux]);
  return (
    <div>
      <Row className="flex items-center justify-between">
        <Title level={2}>{bookingHistoryDetail?.hotelName}</Title>
        <div className="flex items-center">
          <span className="text-base text-gray">
            {bookingHistoryDetail?.bookingDate}
          </span>
          <Divider className="h-5 y" type="vertical" />
          <span className="text-lg text-blue-600 font-bold">
            {bookingHistoryDetail?.status}
          </span>
        </div>
      </Row>
      <Divider className="mt-1" />
      {bookingHistoryDetail?.rooms?.map((room) => (
        <div className="">
          <Row align="middle">
            <Col flex={1}>
              <Title level={4}>
                Room {room.roomNumber} - {room.roomType}
              </Title>
              <div className="text-base">• {room.convenient}</div>
              <div className="text-base">
                •{" "}
                {room.maxPersonNum > 1
                  ? `${room.maxPersonNum} guests`
                  : "1 guest"}
              </div>
            </Col>
            <Col flex={1}>
              <div className="flex justify-end text-base">
                <span className="font-medium">
                  $ {room?.price}/ Đêm
                </span>

              </div>
            </Col>
          </Row>
          <Divider />
        </div>
      ))}

      <Row className="flex items-end">
        <Col flex={1}> Tổng:
          {` ${bookingHistoryDetail?.rooms.length} Phòng`}
          <div className="text-lg font-medium">Ngày Thanh Toán: {bookingHistoryDetail?.paymentDate === null ? <span className="text-red-700 text-sm font-normal">Chưa Thanh Toán</span> : <span className="text-green-700 text-sm font-normal">{bookingHistoryDetail?.paymentDate}</span>}</div>
        </Col>
        <Col
          flex={3}
          className="flex flex-col items-end text-lg text-black-500 font-semibold"
        >
          <div> Tổng Tiền: <span className="text-red-500 font-semibold"> $ {" "} {bookingHistoryDetail?.totalPrice} </span></div>
        </Col>
      </Row>
      <Row>
        <Col flex={1} className="flex justify-end mt-4">
          <Row gutter={8}>
            <Col>
              <Button type="primary" className="update-btn">
                Liên Hệ
              </Button>
            </Col>
            <Col>
              <Button>Đặt Lại</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}