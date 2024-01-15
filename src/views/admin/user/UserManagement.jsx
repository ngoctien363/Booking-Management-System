import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Badge, Form, Modal, Space, Table, Tag, message } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { deleteDataAPI, getAllData, getDataSearch } from "../../../api/genericService";
import ModalUser from "./ModalUser";
import Button from "../../components/shared/ButtonCustom/Button";
import Search from "antd/es/input/Search";

const UserManagement = (props) => {
  const [data, setData] = useState([]);
  const [isOpen, setIsopen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
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
      title: "Họ",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
      render: (text) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            text === "USER"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      render: (text) => <Badge status={text ? "success" : "error"} text={text ? "Active" : "Offline"} />,
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

  const onSearch = (value, _e, info) => {
    setIsLoading(true);
    getDataSearch(`admin`, value)
      .then((res) => {
        setData(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const onClickOpenModal = useCallback(
    (record = {}) => {
      const formControl = {
        id: record.id,
        name: record.name,
        surname: record.surname,
        email: record.email,
        phone: record.phone,
        active: record.active,
        role: record.role,
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

  const getDataHotel = () => {
    setIsLoading(true);
    getAllData(`admin`)
      .then((res) => {
        setData(res.data.data);
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
      content: "Bạn chắc chắn muốn xóa người dùng này?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: () => handleDelete(values),
      confirmLoading: isLoading,
    });
  };

  const handleDelete = (value) => {
    deleteDataAPI(`admin/${value.id}`).then((res) => {
      message.success("SUCCESS");
      getDataHotel();
    });
  };

  useEffect(() => {
    getDataHotel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SearchUser = useMemo(() => {
    return (
      <div>
        <Search
          placeholder="Tìm kiếm theo họ, tên và email"
          onSearch={onSearch}
          enterButton="Tìm kiếm"
          style={{
            width: 500,
          }}
        />
      </div>
    );
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-2xl text-gray-900" style={{ margin: "5px" }}>
          Quản lý người dùng
        </p>
        {SearchUser}
        <Button onClick={onOpenModel} style={{ margin: "5px" }}>
          Thêm mới
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey={"id"}
        size="small"
        loading={isLoading}
      />
      <ModalUser
        isOpen={isOpen}
        onClose={() => {
          setIsopen(false);
          setId("");
        }}
        IdItem={id}
        title={id ? "Chỉnh sửa người dùng" : "Thêm mới người dùng"}
        reloadData={() => getDataHotel()}
        form={form}
      />
    </div>
  );
};

UserManagement.propTypes = {};

export default UserManagement;
