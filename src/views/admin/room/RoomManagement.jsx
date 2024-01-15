import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Checkbox,
  Form,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { deleteDataAPI, getAllData, getDataById } from "../../../api/genericService";
import Button from "../../components/shared/ButtonCustom/Button";
import ModalRoom from "./ModalRoom";
import { CheckWarning } from "../../components/shared/alert/Alert";

const RoomManagement = (props) => {
  const [data, setData] = useState([]);
  const [dataHotel, setDataHotel] = useState([]);
  const [isOpen, setIsopen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [form] = Form.useForm();

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      title: "Số phòng",
      dataIndex: "roomNumber",
      key: "roomNumber",
    },
    {
      title: "Tiện ích",
      dataIndex: "convenient",
      key: "convenient",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Loại phòng",
      dataIndex: "roomType",
      key: "roomType",
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (text) => <Checkbox checked={text}></Checkbox>,
    },
    {
      title: "Sức chứa/người",
      dataIndex: "maxPersonNumber",
      key: "maxPersonNumber",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => <strong>{"$"} {text}</strong>,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle" style={{ cursor: "pointer" }}>
          <Tag color="green" onClick={() => onClickUpdate(record)}>
            Sửa
          </Tag>
          <Tag color="volcano" onClick={() => onClickDelete(record)}>
            Xóa
          </Tag>
        </Space>
      ),
    },
  ];

  const onOpenModel = () => {
    setIsopen(true);
  };

  const onClickOpenModal = useCallback(
    (record = {}) => {
      const formControl = {
        id: record.id,
        roomNumber: record.roomNumber,
        convenient: record.convenient,
        description: record.description,
        roomType: record.roomType,
        price: record.price,
        isActive: record.isActive,
      };
      form.setFieldsValue(formControl);
      setIsopen(true);
    },
    [form]
  );

  const onClickUpdate = useCallback(
    (value) => {
      setId(value.id);
      onClickOpenModal(value);
    },
    [onClickOpenModal]
  );

  const getDataRoomsById = (id) => {
    setIsLoading(true);
    getDataById(`rooms/${id ? id : hotelId}`)
      .then((res) => {
        if(res){
          setData(res.data.data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const onClickDelete = (values) => {
    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn chắc chắn muốn xóa phòng này?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: () => handleDelete(values),
      confirmLoading: isLoading,
    });
  };

  const handleDelete = (value) => {
    deleteDataAPI(`rooms/${value.id}`).then((res) => {
      message.success("Xóa thành công");
      getDataRoomsById();
    }).catch(() => { message.error("Phòng hiện đang được đặt! Không thể xóa") });
  };

  const getDataHotel = () => {
    setIsLoading(true);
    getAllData(`hotels`)
      .then((res) => {
        if (res) {
          const _res = res.data.data.map((item, index) => ({
            value: item.id,
            label: item.name,
          }));
          setDataHotel(_res);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handleChangeHotel = (value) => {
    getDataRoomsById(value);
    setHotelId(value);
  };

  useEffect(() => {
    getDataHotel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-2xl text-gray-900" style={{ margin: "5px" }}>
          Quản lý phòng
        </p>
        <div style={{ margin: "5px" }}>
          <Select
            showSearch
            style={{
              width: 200,
            }}
            onChange={handleChangeHotel}
            placeholder="Chọn khách sạn"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={dataHotel}
          />
        </div>
        <Button disabled={hotelId ? false : true} onClick={onOpenModel} style={{ margin: "5px" }}>
          Thêm mới
        </Button>
      </div>
      {hotelId ? <Table
        columns={columns}
        dataSource={data}
        rowKey={"id"}
        size="small"
        loading={isLoading}
      /> : <div className="mx-20 my-10"><CheckWarning mess={"Chú ý!"} tit={"Chọn khách sạn để tìm phòng"} /></div>}
      <ModalRoom
        isOpen={isOpen}
        onClose={() => {
          setIsopen(false);
          setId("");
        }}
        hotelId={hotelId}
        IdItem={id}
        title={id ? "Chỉnh sửa phòng" : "Thêm mới phòng"}
        reloadData={() => getDataRoomsById()}
        form={form}
      />
    </div>
  );
};

RoomManagement.propTypes = {};

export default RoomManagement;
