import { useContext, useState } from "react";
import FormAction from "./FormAction"
import InputType from "./InputType";
import FormExtra from "./FormExtra";
import Header from "./HeaderForm";
import { useLocation, useNavigate } from "react-router-dom";
import { loginApi } from "../../../api/loginService";
import { AuthContext } from "../context/AuthContext";
import { setNameUserRedux, setUserIdRedux } from "../../redux/_actions/user.actions";
import { useDispatch } from 'react-redux';
import { message } from "antd";
import useEffectOnce from "../../../common/customHook/useEffectOne";

const loginFields = [
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
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "current-password",
        isRequired: true,
        placeholder: "Password"
    }
]
let fieldsState = {};
loginFields.forEach(field => fieldsState[field.id] = '');
function LoginForm() {
    const [loginState, setLoginState] = useState(fieldsState);
    const location = useLocation()
    const navigate = useNavigate()
    const dispatchRedux = useDispatch();

    const { from } = location.state || { from: { pathname: '/dashboard' } }

    const { loading, error, dispatch } = useContext(AuthContext);

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value })
    }

    useEffectOnce(() => {
        if(error){
            message.error("Tên đăng nhập hoặc mật khẩu không đúng!")
            dispatch({ type: "LOGIN_FAILURE", payload: null });
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = async () => {
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await loginApi("auth/signin", loginState)

            dispatchRedux(setUserIdRedux(res.data.data.id));
            dispatchRedux(setNameUserRedux(res.data.data.name));
            
            localStorage.setItem("token", JSON.stringify(res.data.data.token));
            localStorage.setItem("refreshToken", JSON.stringify(res.data.data.refreshToken));
            localStorage.setItem("role", JSON.stringify(res.data.data.role));
            if (loginState.email === "admin@gmail.com") {

                dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });
                navigate(from)
                window.location.reload();
            } else {
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });
                navigate("/")
            }
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err });
        }

    }
    return (
        <div className='py-20 flex align-middle justify-center'>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <Header
                            heading="Đăng nhập vào tài khoản"
                            paragraph="Bạn chưa có tài khoản? "
                            linkName="Đăng ký"
                            linkUrl="/signup"
                        />
                        <div className="-space-y-px">
                            {
                                loginFields.map(field =>
                                    <InputType
                                        key={field.id}
                                        handleChange={handleChange}
                                        value={loginState[field.id]}
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
                        </div>

                        <FormExtra />
                        <FormAction loading={loading} handleSubmit={handleSubmit} text="Đăng Nhập" />
                        {/* {error && <CheckDanger mess={"Lỗi"} tit={"Tên đăng nhập hoặc mật khẩu không đúng!"} />} */}
                    </form>
                </div>
            </section>
        </div>
    )
}
export default LoginForm