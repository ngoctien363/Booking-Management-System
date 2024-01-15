import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Checkbox, Form, Modal, Space, Table, Tag, message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import { deleteHotelsAPI, getHasAvailableRoomsAPI } from '../../../api/hotelService';
import ModelHotel from './ModelHotel';
import "./hotelStyle.css"
import Button from '../../components/shared/ButtonCustom/Button';
import { getAllData } from './../../../api/genericService';
import { useNavigate } from 'react-router-dom';

const HotelManagement = props => {
    const [data, setData] = useState([]);
    const [hotelHasRoom, setHotelHasRoom] = useState([]);
    const [hotelNoRooms, setHotelNoRooms] = useState([]);
    const [isOpen, setIsopen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState("");
    const [form] = Form.useForm();
    const navigate = useNavigate();

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
          title: "Tên khách sạn",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Địa chỉ",
          dataIndex: "address",
          key: "address",
        },
        {
          title: "Mô tả",
          dataIndex: "description",
          key: "description",
        },
        {
          title: "Điểm đến",
          dataIndex: "destination",
          key: "destination",
        },
        {
          title: "Trạng thái",
          dataIndex: "isActive",
          key: "isActive",
          render: (text) => <Checkbox checked={text}></Checkbox>,
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
              {hotelNoRooms.some((hotel) => hotel.id === record.id) && (
                <Tag color="geekblue" onClick={handleAddNewRoom}>
                  Thêm Phòng
                </Tag>
              )}
            </Space>
          ),
        },
      ];

      const handleAddNewRoom = () => {
        navigate('/rooms')
      }

      const onOpenModel = () => {
        setIsopen(true);
      };
    
      const onClickOpenModal = useCallback(
        (record = {}) => {
          const formControl = {
            id: record.id,
            name: record.name,
            address: record.address,
            description: record.description,
            // image: record.image,
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
    
      const getDataHotel = () => {
        setIsLoading(true)
        getAllData(`hotels`).then((res) => {
              setData(res.data.data);
              setIsLoading(false)      
        }).catch((err) => {
          setIsLoading(false)
        });
      };
    
      const onClickDelete = (values) => {
        Modal.confirm({
          title: "Xác nhận",
          icon: <ExclamationCircleOutlined />,
          content: "Bạn chắc chắn muốn xóa khách sạn này?",
          okText: "OK",
          cancelText: "Hủy",
          onOk: () => handleDelete(values),
          confirmLoading: isLoading,
        });
      };
    
      const handleDelete = (value) => {
        deleteHotelsAPI(`hotels/${value.id}`).then((res) => {
          message.success("Xoá thành công");
          getDataHotel();
        }).catch(() => { message.error("Khách sạn hiện đang được đặt! Không thể xóa") });
      };

      const getAvailableRoom = () => {
        getHasAvailableRoomsAPI(`hotels/getHasAvailableRooms`).then((res) => {
          setHotelHasRoom(res.data.data);
        }).catch((Error) => {
          console.log(Error);
        })
      }
      const validateAvailableHotel = () => {
        const hotelsWithNoRooms = data.filter((hotel) => {
          const hasAvailableRooms = hotelHasRoom.some((room) => room.id === hotel.id);
          return !hasAvailableRooms;
        });
        setHotelNoRooms(hotelsWithNoRooms)
      };
      
    
      useEffect(() => {
        getDataHotel();
        getAvailableRoom();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      useEffect(() => {
        if(hotelHasRoom){
          validateAvailableHotel()
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[hotelHasRoom])


  return (
    <div>
        <div className='flex justify-between'>
            <p className="text-2xl text-gray-900" style={{margin: '5px'}}>Quản lý khách sạn</p>
            <Button onClick={onOpenModel} style={{margin: '5px'}}>Thêm mới</Button>
        </div>
        <Table columns={columns} dataSource={data} rowKey={"id"} loading={isLoading} size="small" />
        <ModelHotel
          isOpen={isOpen}
          onClose={() => {
            setIsopen(false);
            setId("");
          }}
          IdItem={id}
          title={id ? "Chỉnh sửa khách sạn" : "Thêm mới khách sạn"}
          reloadData={() => getDataHotel()}
          form={form}
        />
    </div>
  )
}

HotelManagement.propTypes = {}

export default HotelManagement