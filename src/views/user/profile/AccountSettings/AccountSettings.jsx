import React, { useEffect, useState } from "react";
import { Button, Form, Input, Row, Col, message, Typography } from "antd";
import "./AccountSettings.css";
import { getUserById, updateUser } from "../../../../api/userService";
import { useSelector } from "react-redux";

const ProfileField = [
  {
    label: "Email",
    field: "email",
    value: "123@gmail.com",
  },
  {
    label: "Số Điện Thoại",
    field: "phone",
    value: "123456789",
  },
  {
    label: "Họ",
    field: "surname",
    value: "First name",
  },
  {
    label: "Tên",
    field: "name",
    value: "Last name",
  },
];

export default function AccountSettings() {
  const [form] = Form.useForm();
  const userId = useSelector((state) => state.userReducer.userId);

  const getUserInfo = () => {
    getUserById(userId)
      .then((res) => {
        form.setFieldsValue(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinish = (values) => {
    updateUser(userId, values)
      .then((res) => {
        form.setFieldsValue(res.data.data);
        message.success("Update user information successfully");
      })
      .catch((error) => {
        console.log(error);
        message.error("Error");
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Row>
      <Col span={18}>
        <Typography.Title level={2}>Cài đặt tài khoản</Typography.Title>
        <Form form={form} name="info" layout="vertical" onFinish={onFinish}>
          {ProfileField.map((item) => (
            <Form.Item label={item.label} name={item.field} key={item.field}>
              <Input size="large" />
            </Form.Item>
          ))}
          <Form.Item>
            <Button
              type="primary"
              size="large"
              className="update-btn"
              htmlType="submit"
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
