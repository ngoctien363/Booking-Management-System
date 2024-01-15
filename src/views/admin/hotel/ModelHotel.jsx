import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Form, Input, Modal, Row, Select, message, } from "antd";
import TextArea from "antd/es/input/TextArea";
import { createHotelsAPI, getByIdHotelsAPI, updateHotelsAPI, } from "../../../api/hotelService";
import UploadWidget from "../../components/upload/UploadWidget";
const ModelHotel = (props) => {
  const { isOpen, title, form, onClose, reloadData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [dataHotel, setDataHotel] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [dataSelected, setDataSelected] = useState("");

  const IdItem = form.getFieldValue("id");

  const dataDestination = [
    {
      value: 'Quy Nhon',
      label: 'Quy Nhơn',
    },
    {
      value: 'Da Nang',
      label: 'Đà Nẵng',
    },
    {
      value: 'Sai Gon',
      label: 'Sài Gòn',
    },
    {
      value: 'Ha Noi',
      label: 'Hà Nội',
    },
    {
      value: 'Nha Trang',
      label: 'Nha Trang',
    },
  ];

  const handleCancel = () => {
    onClose();
    form.resetFields();
    setImageUrl([]);
  };

  const onCheckboxChange = async (e) => {
    setIsChecked(e.target.checked);
  };

  const getDataHotel = () => {
    setIsLoading(true);
    getByIdHotelsAPI(`hotels/${IdItem}`).then((res) => {
      if (res.data.data) {
        setIsChecked(res.data.data.isActive);
        setImageUrl(res.data.data.imageURLs);
        setDataHotel(res.data.data);
        form.setFieldsValue(res.data.data);
      }
    });
    setIsLoading(false);
  };

  useEffect(() => {
    if (IdItem) {
      getDataHotel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [IdItem]);

  const handleUploadImg = (urls, infoImgs) => {
    if (IdItem) {
      // Handle when updating
      const existingImages = dataHotel?.imageURLs || [];
      const uniqueUrls = urls.filter((url) => !existingImages.includes(url));
  
      // setImageUrl([...existingImages, ...uniqueUrls]);
      setImageUrl((prevUrls) => [...prevUrls, ...uniqueUrls]);
    } else {
      // Handle when creating new images
      setImageUrl((prevUrls) => [...prevUrls, ...urls]);
    }
  };
  
  

  const handleUpdate = (values) => {
    const formControl = {
      name: values.name,
      address: values.address,
      description: values.description,
      imageURLs: imageUrl ? imageUrl : [],
      isActive: isChecked,
      destination: dataSelected ? dataSelected : dataHotel.destination,
    };
    if(imageUrl.length){
      updateHotelsAPI(`hotels/${IdItem}`, formControl)
      .then((res) => {
        if (res.data.data) {
          reloadData();
          message.success("Cập nhật thành công");
          handleCancel();
        }
      })
      .catch(() => {
        message.error("Error");
      });
    }
    else {
      message.warning("Vui lòng thêm ít nhất 1 hình ảnh!")
    }
  };

  const handleCreate = (values) => {
    const formControl = {
      name: values.name,
      address: values.address,
      description: values.description,
      imageURLs: imageUrl ? imageUrl : [],
      isActive: isChecked,
      destination: dataSelected,
    };
    if(imageUrl.length){
    createHotelsAPI(`hotels`, formControl)
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
    } else {
      message.warning("Vui lòng thêm ít nhất 1 hình ảnh!")
    }
  };

  const onFinish = (values) => {
    if (values.id) {
      handleUpdate(values);
    } else {
      handleCreate(values);
    }
  };

  const removeImageByIndex = (index) => {
    const updatedImageUrl = [...imageUrl];
    updatedImageUrl.splice(index, 1);
    setImageUrl(updatedImageUrl);
  };

  // Handle select Destination
  const handleChangeData = (value) => {
    setDataSelected(value);
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
            <Col span={12}>
              <Form.Item hidden={true} name="id">
                <Input />
              </Form.Item>

              <Form.Item
                label="Tên khách sạn"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống trường này!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống trường này!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
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
                <TextArea rows={4} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Điểm đến"
                name="destination"
                rules={[
                  { required: true, message: "Không được để trống trường này!" },
                ]}
              >
                <Select
                  showSearch
                  style={{
                    width: 200,
                  }}
                  onChange={handleChangeData}
                  placeholder="Chọn điểm đến"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={dataDestination}
                />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="Trạng thái" name="isActive">
                <Checkbox checked={isChecked} onChange={onCheckboxChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col>
              <Form.Item label="Hình ảnh" name="imageURLs">
                <UploadWidget handleGetUrl={handleUploadImg} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            {" "}
            {imageUrl &&
              imageUrl.map((imgUrl, indx) => (
                <Col span={3} key={indx}>
                  <figure className="relative max-w-xs my-3 show-image">
                    <img src={imgUrl} alt={indx} className="rounded-lg" />
                    <span
                      className="absolute top-0 bottom-0 right-0"
                      onClick={() => removeImageByIndex(indx)}
                    >
                      <svg
                        className="fill-current h-6 w-6 text-red-500"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <title>Xóa</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                      </svg>
                    </span>
                  </figure>
                </Col>
              ))}
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

ModelHotel.propTypes = {};

export default ModelHotel;
