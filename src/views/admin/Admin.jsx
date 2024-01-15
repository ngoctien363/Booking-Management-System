import {
  AppstoreOutlined,
  BankOutlined,
  DashboardOutlined,
  StarTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useContext, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/AuthContext";
import { isAuthed } from "../routes/handleToken";
import HotelManagement from "./hotel/HotelManagement";
import UserManagement from "./user/UserManagement";
import RoomManagement from "./room/RoomManagement";
import Dashboard from "./dashboard/Dashboard";
import Sider from "antd/es/layout/Sider";
import { Content, Footer } from "antd/es/layout/layout";
import BookingManagement from "./booking/BookingManagement";
// import NotFound from "../components/error/NotFound"

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
  getItem("Trang chủ", "/dashboard", <DashboardOutlined />),
  getItem("Quản lý đặt phòng", "/booking", <StarTwoTone />),
  getItem("Quản lý khách sạn", "/hotel", <BankOutlined />),
  getItem("Quản lý người dùng", "/user", <UserOutlined />),
  getItem("Quản lý phòng", "/rooms", <AppstoreOutlined />),
];

const Admin = (props) => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [defaultKey, setDefaultKey] = useState(JSON.parse(localStorage.getItem('submenu')));
  const onClick = ({ key }) => {
    navigate(key);
  };
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Handle url for admin role
  const ProtectedRoute = ({ redirectTo = "/", children }) => {
    const userRole = JSON.parse(localStorage.getItem("role"));
    const { user } = useContext(AuthContext);
    if (!user || userRole !== "ADMIN" || !isAuthed()) {
      return <Navigate to={redirectTo} />;
    }
    return children;
  };

  return (
    <Layout style={{
      minHeight: '100vh',
    }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} className="ant-layout-sider-light">
        <Menu
          mode="inline"
          defaultSelectedKeys={["/dashboard"]}
          defaultOpenKeys={[defaultKey]}
          onClick={onClick}
          items={items}
          activeKey={defaultKey}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Routes>
            <Route
              path="/booking"
              element={
                <ProtectedRoute>
                  <BookingManagement />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Routes>
            <Route
              path="/hotel"
              element={
                <ProtectedRoute>
                  <HotelManagement />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Routes>
            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Routes>
            <Route
              path="/rooms"
              element={
                <ProtectedRoute>
                  <RoomManagement />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          DC4-TIP ©2023 Created by DC4-TIP's Team
        </Footer>
      </Layout>
    </Layout>
  );
};

Admin.propTypes = {};

export default Admin;
