import React from "react";
import { Route, Routes, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Menu, Row, Col } from "antd";
import {
  SyncOutlined,
  HistoryOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./Profile.css";
import ChangePassword from "./ChangePassword/ChangePassword";
import AccountSettings from "./AccountSettings/AccountSettings";
import BookingHistoryList from "./BookingHistory/BookingHistoryList/BookingHistoryList";
import BookingHistoryDetail from "./BookingHistory/BookingHistoryDetail/BookingHistoryDetail";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Cài Đặt Tài Khoản", "/profile/account-settings", <SettingOutlined />),
  getItem("Lịch Sử Đặt Phòng", "/profile/booking-history", <HistoryOutlined />),
  getItem("Đổi Mật Khẩu", "/profile/change-password", <SyncOutlined />),
];

export default function Profile() {
  const navigate = useNavigate();
  const param = window.location.pathname;
  
  const onClick = ({ key }) => {
    navigate(key);
  };

  return (
    <>
      <Row className="layout">
        <Col span={12} offset={6}>
          <Row gutter={48}>
            <Col span={6}>
              <Menu
                onClick={onClick}
                defaultSelectedKeys={[`${param}`]}
                defaultOpenKeys={[`${param}`]}
                items={items}
              />
            </Col>
            <Col span={18}>
              <Routes>
                <Route path="/account-settings" element={<AccountSettings />} />
                <Route path="/booking-history" element={<BookingHistoryList />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/booking-history/:id" element={<BookingHistoryDetail />} />
              </Routes>
            </Col>
          </Row>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}
