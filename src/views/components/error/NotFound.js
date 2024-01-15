import React from 'react';
import { Result } from 'antd';
import Button from '../shared/ButtonCustom/Button';
import { useNavigate } from 'react-router-dom';

const NotFound = (props) => {
  const { customIcon, ...rest } = props;
  const navigate = useNavigate()
  const handleBack = () => {
    navigate('/admin/hotel')
  }
  return (
    <Result
      status="404"
      title="404"
      icon={customIcon}
      subTitle={'Not found'}
      extra={<Button onClick={handleBack}>Back Home</Button>}
      {...rest}
    />
  );
};

export default NotFound;
