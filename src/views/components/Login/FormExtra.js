import { Link } from "react-router-dom";

export default function FormExtra() {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
        <label htmlFor="remember-me" className="ml-2 block text-sm dark:text-white">
          Ghi nhớ tôi
        </label>
      </div>

      <div className="text-sm">
        <Link to="/forgotPassword" className="font-medium text-sky-400/100 hover:text-sky-400/75">
          Quên mật khẩu?
        </Link>
      </div>
    </div>

  )
}