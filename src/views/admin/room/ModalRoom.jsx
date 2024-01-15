import React, { useEffect, useMemo, useState } from "react";
import { createDataAPI, getDataById, updateDataAPI } from "../../../api/genericService";
import { Checkbox, Form, Input, Modal, Button, message, Select } from "antd";
import { DOUBLE_ROOM, FAMILY_ROOM, SINGLE_ROOM, SPECIAL_ROOM, SUITE_ROOM } from "../../../common/constant";

const ModalRoom = (props) => {
  const { isOpen, title, form, onClose, reloadData, hotelId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [dataHotel, setDataHotel] = useState({});
  const [roomType, setRoomType] = useState("");
  const IdItem = form.getFieldValue("id");
  const room = form.getFieldValue("roomType");
  const roomOption = [ 
    { value: "SINGLE_ROOM", label: "Phòng đơn" },
    { value: "DOUBLE_ROOM", label: "Phòng đôi" },
    { value: "FAMILY_ROOM", label: "Phòng gia đình" },
    { value: "SUITE_ROOM", label: "Phòng suite" },
    { value: "SPECIAL_ROOM", label: "Phòng đặc biệt" },
  ]

  const handleCancel = () => {
    onClose();
    form.resetFields();
  };

  const renderValueOfRoomType = useMemo(() => {
    switch (room) {
      case SINGLE_ROOM:
        setRoomType("SINGLE_ROOM")
        break;
      case DOUBLE_ROOM:
        setRoomType("DOUBLE_ROOM")
        break;
      case FAMILY_ROOM:
        setRoomType("FAMILY_ROOM")
        break;
      case SUITE_ROOM:
        setRoomType("SUITE_ROOM")
        break;
      case SPECIAL_ROOM:
        setRoomType("SPECIAL_ROOM")
        break;
    
      default:
        break;
    }
  },[room])

  const getDataRoomsById = (id) => {
    setIsLoading(true);
    getDataById(`rooms/${id ? id : hotelId}`)
      .then((res) => {
        if (res) {
          const currItem = res.data.data.filter(f => f.id === IdItem)
          setIsChecked(currItem[0].isActive)
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const getDataHotelById = () => {
    getDataById(`hotels/${hotelId}`)
      .then((res) => {
        setDataHotel(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isOpen && hotelId) {
      getDataRoomsById();
      getDataHotelById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelId, isOpen]);

  const handleCreate = (values) => {
    const formControl = [
      {
        roomNumber: values.roomNumber,
        convenient: values.convenient,
        description: values.description,
        roomType: roomType || undefined,
        // price: values.price,
        isActive: isChecked,
      },
    ];
    createDataAPI(`rooms/${hotelId}`, formControl)
      .then((res) => {
        if (res.data.data) {
          reloadData();
          message.success("Thêm thành công");
          handleCancel();
        }
      })
      .catch(() => {
        message.error("Error");
      });
  };
  const handleUpdate = (values) => {
    const formControl = {
        id: IdItem,
        roomNumber: values.roomNumber,
        convenient: values.convenient,
        description: values.description,
        roomType: roomType ? roomType : renderValueOfRoomType || undefined,
        // price: values.price,
        isActive: isChecked,
      };
    updateDataAPI(`rooms/${hotelId}`, formControl)
      .then((res) => {
        if (res.data.data) {
          reloadData();
          message.success("Cập nhật thành công");
          handleCancel();
        }
      })
      .catch(() => {
        message.error("Lỗi");
      });
  };

  const onFinish = (values) => {
    if (values.id) {
      handleUpdate(values);
    } else {
      handleCreate(values);
    }
  };

  const onCheckboxChange = async (e) => {
    await setIsChecked(e.target.checked);
  };
  
  const handleChangeRoom = async (value) => {
    await setRoomType(value);
  };
  

  return (
    <div>
      <Modal
        title={title}
        open={isOpen}
        className="form-create"
        width={600}
        onCancel={handleCancel}
        footer={[
          <Button form="myForm" key="back" onClick={handleCancel}>
            Hủy
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
        <Form
          id="myForm"
          form={form}
          onFinish={onFinish}
          scrollToFirstError
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item hidden={true} name="id">
            <Input />
          </Form.Item>

          <Form.Item label="Tên khách sạn">
            <Input value={dataHotel.name} disabled={true} />
          </Form.Item>
          <Form.Item
            label="Số phòng"
            name="roomNumber"
            rules={[
              {
                required: true,
                message: "Không được để trống trường này!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tiện ích"
            name="convenient"
            rules={[
              {
                required: true,
                message: "Không được để trống trường này!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: true,
                message: "Không được để trống trường này!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Loại phòng"
            name="roomType"
            rules={[
              {
                required: true,
                message: "Không được để trống trường này!",
              },
            ]}
          >
            <Select
            showSearch
            style={{
              width: 200,
            }}
            onChange={handleChangeRoom}
            placeholder="Chọn phòng"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={roomOption}
          />
          </Form.Item>

          {/* <Form.Item
            label="Price"
            name="price"
          >
            <Input  addonAfter={"$"} />
          </Form.Item> */}

          <Form.Item label="Trạng thái" name="isActive">
            <Checkbox checked={isChecked} onChange={onCheckboxChange} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

ModalRoom.propTypes = {};

export default ModalRoom;
