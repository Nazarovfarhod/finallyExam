import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, uploadFile } from "../request";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { UpdateIcon } from "@radix-ui/react-icons";
import { getFormData } from "../myUtils";
import loginSvg from "../../public/login.svg";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setUser } from "../features/userSlice";

function Login() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = getFormData(e.target);

    setLoading(true);

    uploadFile(result.avatar)
      .then((data) => {
        result.avatar = data;
        return register(result);
      })
      .then((res) => {
        toast.success(`Welcome, ${res.username || "Ghost"}`);
        dispatch(setUser({ ...res, avatar: result.avatar }));
        window.location.reload();
      })
      .catch(({ message }) => {
        if (message === "400") {
          toast.error("Bunday Foydalanuvchi allaqachon mavjud");
        } else {
          toast.error(message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-around px-3 dark:bg-slate-900">
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white mb-6">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Your name
              </Label>
              <TextInput
                name="username"
                type="text"
                id="first_name"
                placeholder="Your name"
                required
                className="mt-2 p-2 border rounded-lg w-full dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Password
              </Label>
              <TextInput
                name="password"
                type="password"
                id="password"
                placeholder="Enter password"
                required
                className="mt-2 p-2 border rounded-lg w-full dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <Label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Avatar
              </Label>
              <FileInput id="avatar" name="avatar" className="mt-2 w-full" />
            </div>

            <div className="flex flex-col items-center">
              <Link
                to="/login"
                className="text-blue-500 hover:underline dark:text-blue-400 mb-4"
              >
                Already have an account? Login!
              </Link>

              <div className="flex items-center gap-4 w-full">
                <Link
                  to="/"
                  className="w-full h-12 flex items-center justify-center bg-gray-400 text-white rounded-lg font-semibold transition hover:bg-gray-500"
                >
                  Ghost
                </Link>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex justify-center items-center w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg transition hover:bg-blue-700"
                >
                  {loading ? (
                    <UpdateIcon className="animate-spin" />
                  ) : (
                    "Register"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="hidden md:block ml-8">
          <img src={loginSvg} alt="login-img" className="w-96" />
        </div>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
}

export default Login;
