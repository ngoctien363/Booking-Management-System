import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
const ModalForm = ({ test, onClickShowModal, data, indexImage }) => {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0)

    useEffect(() => {
        setOpen(test)
        setIndex(indexImage)
    }, [test, indexImage])

    const cancelModal = () => {
        setOpen(false)
        onClickShowModal()
    }
    return (
        <>

            <Modal
                title={`Xem chi tiết ảnh ${data?.name}`}
                centered
                open={open}
                onOk={() => cancelModal()}
                onCancel={() => cancelModal()}
                width={'50%'}
            >
                <>
                    <div className='relative flex ml-4 mr-4 mt-2 rounded-md overflow-hidden'>
                        <div className='absolute font-bold top-1 left-2'>
                            Image {index + 1}
                        </div>
                        <img className='h-auto max-h-[500px] w-full ' src={data?.imageURLs[index]} alt="" />
                    </div>
                    {data && data.imageURLs.length > 1 &&
                        <div className='overflow-x-auto max-w-full flex ml-4 mr-4 mt-2 rounded-md overflow-hidden '>
                            {data?.imageURLs?.map((image, indexImage) => (
                                <div className='pr-1 '>
                                    <img className='cursor-pointer h-36 w-56 max-w-none' src={image} alt="" onClick={() => setIndex(indexImage)} />
                                </div>
                            ))}
                        </div>
                    }
                </>
            </Modal>
        </>
    );
};
export default ModalForm;