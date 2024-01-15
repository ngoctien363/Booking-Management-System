import React, { useState } from "react";
import { Button, Form, Input, Row, Col, Typography, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { changePasswordAPI } from "../../../../api/userService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChangePasswordFormField = [
  {
    label: "Mật Khẩu Cũ",
    field: "oldPassword",
  },
  {
    label: "Mật Khẩu Mới",
    field: "newPassword",
  },
  {
    label: "Xác Nhận Mật Khẩu Mới",
    field: "confirmPassword",
  },
];

export default function ChangePassword() {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const userId = useSelector((state) => state.userReducer.userId);
  const navigate = useNavigate();

  const onFinish = (values) => {
    if (values.newPassword !== values.confirmPassword) {
      setErrorMessage("New password & Confirm password mis-matched.");
      return;
    }
    changePasswordAPI(userId, values)
      .then((res) => {
        if (res) {
          message.success("Change password successfully");
          navigate("/login");
        }
      })
      .catch((error) => {
        setErrorMessage("Wrong password.");
        console.log(error);
      });
  };

  return (
    <Row>
      <Col span={18}>
        <Typography.Title level={2}>Đổi mật khẩu</Typography.Title>
        <Form
          form={form}
          name="changePassword"
          layout="vertical"
          onFinish={onFinish}
        >
          {ChangePasswordFormField.map((item) => (
            <Form.Item label={item.label} name={item.field} key={item.field}>
              <Input.Password
                size="large"
                required
                placeholder={item.label}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          ))}
          {errorMessage ? <Form.Item className="text-red-600">{errorMessage}</Form.Item> : null}
          <Form.Item>
            <Button
              type="primary"
              size="large"
              className="update-btn"
              htmlType="submit"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
