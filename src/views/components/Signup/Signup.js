import { useState } from 'react';
import FormAction from '../Login/FormAction';
import Header from '../Login/HeaderForm';
import InputType from '../Login/InputType';
import { signUpApi } from '../../../api/loginService';
import { useNavigate } from 'react-router';
import { message } from 'antd';
import useEffectOnce from './../../../common/customHook/useEffectOne';

const signupFields = [
    {
        labelText: "Họ",
        labelFor: "surname",
        id: "surname",
        name: "surname",
        type: "text",
        autoComplete: "surname",
        isRequired: true,
        placeholder: "Họ"
    },
    {
        labelText: "Tên",
        labelFor: "name",
        id: "name",
        name: "name",
        type: "text",
        autoComplete: "name",
        isRequired: true,
        placeholder: "Tên"
    },
    {
        labelText: "SĐT",
        labelFor: "phone",
        id: "phone",
        name: "phone",
        type: "phone",
        autoComplete: "phone",
        isRequired: true,
        placeholder: "Nhập số điện thoại"
    },
    {
        labelText: "Email",
        labelFor: "email",
        id: "email",
        name: "email",
        type: "email",
        autoComplete: "email",
        isRequired: true,
        placeholder: "Email"
    },
    {
        labelText: "Mật khẩu",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "current-password",
        isRequired: true,
        placeholder: "Mật khẩu"
    },
    // {
    //     labelText: "Confirm Password",
    //     labelFor: "confirm-password",
    //     id: "confirm-password",
    //     name: "confirm-password",
    //     type: "password",
    //     autoComplete: "confirm-password",
    //     isRequired: true,
    //     placeholder: "Confirm Password"
    // }
]

let fieldsState = {};

signupFields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
    const [signupState, setSignupState] = useState(fieldsState);
    const [handleErr, setHandleErr] = useState("");
    const navigate = useNavigate()

    const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        createAccount()
    }

    // Validate phone number
    const isValidPhone = (phone) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    };

    useEffectOnce(() => {
        if (handleErr) {
            setHandleErr(null)
            return message.error("Email đã tồn tại!")
        }
    })

    //handle Signup API Integration here
    const createAccount = () => {
        const formSignUp = { ...signupState, active: true }
        if (!isValidPhone(signupState.phone)) {
            return message.warning("Số điện thoại phải bao gồm 10 chữ số");
          }
        
        signUpApi("auth/signup", formSignUp).then((res) => {
            if (res) {
                navigate("/login")
            }
        }).catch((err) => {
            setHandleErr(err)
        })
    }

    return (
        <div className='py-20 flex align-middle justify-center'>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <Header
                            heading="Đăng ký tài khoản"
                            paragraph="Đã có tài khoản? "
                            linkName="Đăng nhập"
                            linkUrl="/login"
                        />
                        <div>
                            {
                                signupFields.map(field =>
                                    <InputType
                                        key={field.id}
                                        handleChange={handleChange}
                                        value={signupState[field.id]}
                                        labelText={field.labelText}
                                        labelFor={field.labelFor}
                                        id={field.id}
                                        name={field.name}
                                        type={field.type}
                                        isRequired={field.isRequired}
                                        placeholder={field.placeholder}
                                    />

                                )
                            }
                            <FormAction handleSubmit={handleSubmit} text="Đăng ký" />
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}