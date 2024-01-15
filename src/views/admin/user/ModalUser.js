import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Form, Input, Modal, Row, message } from "antd";
import { createDataAPI, getDataById, updateDataAPI } from "../../../api/genericService";
const ModalUser = (props) => {
    const { isOpen, title, form, onClose, reloadData } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});

    const IdItem = form.getFieldValue("id");
    const handleCancel = () => {
        onClose();
        form.resetFields();
    };

    const onCheckboxChange = async (e) => {
        await setIsChecked(e.target.checked);
    };

    const getDataUser = () => {
        setIsLoading(true);
        getDataById(`admin/${IdItem}`).then((res) => {
            if (res.data.data) {
                setIsChecked(res.data.data.active);
                setDataUpdate(res.data.data);
                form.setFieldsValue(res.data.data);
            }
        });
        setIsLoading(false);
    };

    useEffect(() => {
        if (IdItem) {
            getDataUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [IdItem]);

    const handleUpdate = (values) => {
        const formControl = {
            name: values.name,
            surname: values.surname,
            email: values.email,
            phone: values.phone,
            active: isChecked,
        };
        updateDataAPI(`admin/${IdItem}`, formControl)
            .then((res) => {
                if (res.data.data) {
                    reloadData();
                    message.success("Update successfully");
                    handleCancel();
                }
            })
            .catch(() => {
                message.error("Error");
            });
    };

    const handleCreate = (values) => {
        const formControl = {
            name: values.name,
            surname: values.surname,
            email: values.email,
            phone: values.phone,
            active: isChecked,
            password: "12345678"
        };
        createDataAPI(`auth/signup`, formControl)
            .then((res) => {
                if (res.data.data) {
                    reloadData();
                    message.success("Create successfully");
                    handleCancel();
                }
            })
            .catch(() => {
                message.error("Error");
            });
    };

    const onFinish = (values) => {
        if (values.id) {
            handleUpdate(values);
        } else {
            handleCreate(values);
        }
    };

    return (
        <div>
            <Modal
                title={title}
                open={isOpen}
                className="form-create"
                width={1500}
                onCancel={handleCancel}
                footer={[
                    <Button form="myForm" key="back" onClick={handleCancel}>
                        Đóng
                    </Button>,
                    <Button
                        className="bg-sky-500/100"
                        style={{ color: "white" }}
                        form="myForm"
                        key="submit"
                        htmlType="submit"
                        loading={isLoading}
                    >
                        Lưu
                    </Button>,
                ]}
            >
                <Form id="myForm" form={form} onFinish={onFinish}>
                    <Row gutter={24}>
                        <Col span={10}>
                            <Form.Item
                                label="Họ"
                                name="surname"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập trường này!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item hidden={true} name="id">
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Tên"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập trường này!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Trạng thái" name="active">
                                <Checkbox checked={isChecked} onChange={onCheckboxChange} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={10}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập trường này!",
                                    },
                                    {
                                        type: "email",
                                    }
                                ]}
                            >
                                <Input placeholder="username@gmail.com"/>
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item
                                label="SĐT"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập trường này!",
                                    },
                                    {
                                        type: 'string',
                                        min: 10,
                                      },
                                ]}
                            >
                                <Input placeholder="Số điện thoại có 10 số!"/>
                            </Form.Item>
                        </Col>
                        { IdItem && <Col span={4}>
                            <Form.Item label="Quyền" name="role">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${dataUpdate.role === "USER" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                    {dataUpdate.role}
                                </span>
                            </Form.Item>
                        </Col>}
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

ModalUser.propTypes = {};

export default ModalUser;
