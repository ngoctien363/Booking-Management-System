import React, { useEffect, useState } from "react";
import { getAllData, updateDataAPI } from "../../../api/genericService";
import { Form, Select, Table, Typography, message } from "antd";
import { BOOKED, CANCEL, PAID, USING } from "../../../common/constant";



const BookingManagement = (props) => {
  const [dataBooking, setDataBooking] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;

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
      title: "Nhận Phòng",
      dataIndex: "checkInDate",
        key: "checkInDate",
    },
    {
      title: "Trả Phòng",
      dataIndex: "checkOutDate",
        key: "checkOutDate",
    },
    {
      title: "Tên Khách Sạn",
      dataIndex: "hotelName",
        key: "hotelName",
    },
    {
      title: "Số Lượng Phòng",
      dataIndex: "roomQuantity",
        key: "roomQuantity",
    },
    {
      title: "Số Ngày Ở",
      dataIndex: "duration",
        key: "duration",
    },
    {
      title: "Khách Hàng",
      dataIndex: "customer",
        key: "customer",
    },
    {
      title: "Tổng Tiền",
      dataIndex: "totalPrice",
        key: "totalPrice",
      render: (text) => (
        <strong>
          {text} {"$"}
        </strong>
      ),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      editable: true,
      render: (text) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            text === PAID
              ? "bg-green-100 text-green-800"
              : text === USING
              ? "bg-yellow-100 text-yellow-800"
              : text === CANCEL
              ? "bg-red-100 text-red-800"
              : text === BOOKED
              ? "bg-blue-100 text-blue-800"
              : ""
          }`}
        >
          {" "}
          {text}
        </span>
      ),
    },
    {
      title: "Thao Tác",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Lưu
            </Typography.Link>
            <Typography.Link onClick={cancel}>Hủy</Typography.Link>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== "" || checkDisableEdit(record) }
            onClick={() => edit(record)}
          >
            Chỉnh sửa
          </Typography.Link>
        );
      },
    },
  ];

  const checkDisableEdit = (record) => {
    if(record.status === PAID || record.status === CANCEL){
        return true
    }
  }

  const edit = (record) => {
    form.setFieldsValue({
      status: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataBooking];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        updateDataAPI(`bookingHistories/${item.id}/${row.status}`)
          .then((res) => {
            if (res.data.data) {
              getData();
              setDataBooking(newData);
              message.success("Cập nhật thành công");
            }
          })
          .catch((err) => {
            message.error("Lỗi! Không Thể Thay Đổi Trạng Thái");
            // message.error("Phòng Đã Được Thanh Toán! Không Thể Thay Đổi Trạng Thái");
          });
        setEditingKey("");
      } else {
        newData.push(row);
        setDataBooking(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const getData = () => {
    getAllData(`bookingHistories`)
      .then((res) => {
        if (res) {
          const _res = res.data.data.map((item, index) => ({
            key: index,
            id: item.id,
            checkInDate: item.checkInDate,
            checkOutDate: item.checkOutDate,
            customer: item.customer,
            duration: item.duration,
            email: item.email,
            hotelName: item.hotelName,
            roomQuantity: item.roomQuantity,
            status: item.status,
            totalPrice: item.totalPrice,
          }));
          setDataBooking(_res);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getData();
  }, []);

  const mergedColumns = columns.map((col, key) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        key: key,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-xl text-gray-900" style={{ margin: "5px" }}>
          Quản lý đặt phòng
        </p>
      </div>
      <div>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={dataBooking}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      </div>
    </div>
  );
};

BookingManagement.propTypes = {};

export default BookingManagement;

const StatusBooking = [
  {
    value: "CANCELLED",
    label: "Đã huỷ",
  },
  {
    value: "PAID",
    label: "Đã thanh toán",
  },
  {
    value: "USING",
    label: "Đang sử dụng",
  },
  {
    value: "BOOKED",
    label: "Đã đặt",
  },
];

const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Select
            showSearch
            style={{
              width: 200,
            }}
            placeholder="Chọn trạng thái"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            value={record.status}
            options={StatusBooking}
          />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
