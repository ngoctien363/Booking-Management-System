import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import React from 'react'

export default function BookingPopover() {
  return (
    <>
      <div className=''>
        <div className='flex items-center justify-between mb-2'>
          <h3 className='mr-3 text-base font-semibold'>Phòng Đơn: </h3>
          <div className='flex items-center justify-center '>
            <button className='mr-2 py-1 px-4 border rounded-md'><MinusOutlined /></button>
            <input type="number" className='py-1 px-1 max-w-[60px] border rounded-md text-center' />
            <button className='ml-2 py-1 px-4 border rounded-md'><PlusOutlined /></button>
          </div>
        </div>
        <div className='flex items-center justify-between mb-2'>
          <h3 className='mr-3 text-base font-semibold'>Phòng Đôi: </h3>
          <div className='flex items-center justify-center'>
            <button className='mr-2 py-1 px-4 border rounded-md'><MinusOutlined /></button>
            <input type="number" className='py-1 px-1 max-w-[60px] border rounded-md text-center' />
            <button className='ml-2 py-1 px-4 border rounded-md'><PlusOutlined /></button>
          </div>
        </div>
        {/* <div className='flex items-center justify-between mb-2'>
          <h3 className='mr-3 text-base font-semibold'>Phòng Gia Đình: </h3>
          <div className='flex items-center justify-center'>
            <button className='mr-2 py-1 px-4 border rounded-md'><MinusOutlined /></button>
            <input type="number" className='py-1 px-1 max-w-[60px] border rounded-md text-center' />
            <button className='ml-2 py-1 px-4 border rounded-md'><PlusOutlined /></button>
          </div>
        </div> */}
        {/* <div className='flex items-center justify-between mb-2'>
          <h3 className='mr-3 text-base font-semibold'>Phòng Thương Gia: </h3>
          <div className='flex items-center justify-center'>
            <button className='mr-2 py-1 px-4 border rounded-md'><MinusOutlined /></button>
            <input type="number" className='py-1 px-1 max-w-[60px] border rounded-md text-center' />
            <button className='ml-2 py-1 px-4 border rounded-md'><PlusOutlined /></button>
          </div>
        </div> */}
        <div className='flex items-center justify-between mb-2'>
          <h3 className='mr-3 text-base font-semibold'>Số Người: </h3>
          <div className='flex items-center justify-center'>
            <button className='mr-2 py-1 px-4 border rounded-md'><MinusOutlined /></button>
            <input type="number" className='py-1 px-1 max-w-[60px] border rounded-md text-center' />
            <button className='ml-2 py-1 px-4 border rounded-md'><PlusOutlined /></button>
          </div>
        </div>
      </div>
      <div className='flex items-end justify-end mb-4'>
        <button className=' mt-4 p-2 bg-sky-600 hover:bg-sky-400 font-medium rounded-md text-zinc-50 w-28'>Xác Nhận</button>
      </div>
    </>
  )
}
