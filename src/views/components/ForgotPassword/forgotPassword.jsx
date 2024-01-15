import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { forgotPasswordApi, sendEmailApi } from '../../../api/loginService';
import Header from '../Login/HeaderForm';

export default function ForgotPassword() {
    const [messageApi, contextHolder] = message.useMessage();
    const [forgotPassword, setforgotPassword] = useState({
        email: null,
        otp: null,
        newPassword: null,
        conFirmPassword: null,
    });

    const [show, setShow] = useState(false);
    const navigate = useNavigate()

    const handleChange = (e) => setforgotPassword({ ...forgotPassword, [e.target.name]: e.target.value });

    const handleSubmit = () => {
        const data = {
            email: forgotPassword.email,
            otp: forgotPassword.otp,
            newPassword: forgotPassword.newPassword,
        }

        if (data.email === '' || data.otp === '' || data.newPassword === '' || data.email === null
            || data.otp === null || data.newPassword === null) return messageApi.open({
                type: 'warning',
                content: 'Vui Lòng Nhập Đầy Đủ Thông Tin!',
            });

        if (data.newPassword !== forgotPassword.conFirmPassword) return messageApi.open({
            type: 'warning',
            content: 'Xác Nhận Mật Khẩu Không Khớp!',
        });

        forgotPasswordApi("auth/verifyAccount", data).then((res) => {
            if (res) {
                messageApi.open({
                    type: 'success',
                    content: 'Đổi Mật Khẩu Thành Công!',
                });
                setTimeout(() => {
                    navigate('/login')
                }, 2000);
            }
        }).catch((err) => {
            messageApi.open({
                type: 'error',
                content: 'Đổi Mật Khẩu Thất Bại, Vui Lòng Kiểm Tra Lại!',
            });
        })
    }

    const sendGmail = () => {
        const data = { email: forgotPassword.email }
        const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (data.email === '' || data.email === null) return messageApi.open({
            type: 'warning',
            content: 'Vui Lòng Nhập Email!',
        });
        if (!filter.test(data.email)) return messageApi.open({
            type: 'warning',
            content: 'Vui Lòng Nhập Email Đúng Định Dạng!',
        });
        sendEmailApi("auth/sendMail", data).then((res) => {
            if (res) {
                messageApi.open({
                    type: 'success',
                    content: 'Gửi Email Thành Công, Vui Lòng Kiểm Tra Email!',
                });
                setShow(true)
            }
        }).catch((err) => {
            messageApi.open({
                type: 'error',
                content: 'Gửi Email Thất Bại, Vui Lòng Kiểm Tra Lại!',
            });
        })
    }
    useEffect(() => {
        if (show && (forgotPassword.otp === '' || forgotPassword.otp === null)) {
            console.log("aa");
            setTimeout(() => {
                setShow(false)
            }, 60000);
        }
    }, [show, forgotPassword.otp])


    return (
        <>
            {contextHolder}
            <div className='py-20 flex align-middle justify-center'>
                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="p-6 space-y-4 mx-6 md:space-y-6 sm:p-8">
                        <div className="mt-8 space-y-6">
                            <Header
                                heading="Quên Mật Khẩu"
                                paragraph="Đã có tài khoản? "
                                linkName="Đăng nhập"
                                linkUrl="/login"
                            />
                            <div className=" mt-6 space-y-4">
                                <div className="cursor-pointer">
                                    <p className="ml-2">Email </p>
                                    <input type="email" name='email' onChange={handleChange} className="ml-2 py-2 px-2 w-[250px] border rounded-md " placeholder='Email' />
                                    <div className='flex justify-between text-right'>
                                        {show ? <p className="ml-2 my-2 text-red-500 " >OTP có hiệu lực trong 1 Phút </p> : <p></p>}
                                        {!show ? <p className="ml-2 my-2 text-blue-500 underline" onClick={sendGmail}>Gửi email </p> : <p></p>}

                                    </div>
                                </div>
                                {show && <div className='mt-0'>
                                    <div className="cursor-pointer">
                                        <p className="ml-2"> Nhập mã OTP </p>
                                        <input type="text" name='otp' onChange={handleChange} className="ml-2 py-2 px-2 w-[250px] border rounded-md " placeholder='OTP' />
                                    </div>
                                    <div className="cursor-pointer">
                                        <p className="ml-2"> Mật Khẩu Mới </p>
                                        <input type="password" name='newPassword' onChange={handleChange} className="ml-2 py-2 px-2 w-[250px] border rounded-md " placeholder='*****' />
                                    </div>
                                    <div className="cursor-pointer">
                                        <p className="ml-2"> Nhập Lại Mật Khẩu  </p>
                                        <input type="password" name='conFirmPassword' onChange={handleChange} className="ml-2 py-2 px-2 w-[250px] border rounded-md " placeholder='*****' />
                                    </div>
                                    <button onClick={handleSubmit} className=' mt-4 p-2 bg-sky-600 hover:bg-sky-400 font-medium rounded-md text-zinc-50 w-28'>Xác Nhận</button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}