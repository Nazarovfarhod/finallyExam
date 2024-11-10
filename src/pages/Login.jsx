import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../request";
import { Avatar, Button, TextInput } from "flowbite-react";
import { UpdateIcon } from "@radix-ui/react-icons";
import { getFormData } from "../myUtils";
import registerSvg from "../../public/register.svg";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setUser } from "../features/userSlice";
import { useTranslation } from "react-i18next";

function Login() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const userLogin = JSON.parse(localStorage.getItem("userLogin"));

  //send user data
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = getFormData(e.target);
    setLoading(true);
    login(result)
      .then((res) => {
        toast.success(`Welcome, ${res.username || "Ghost"}`);
        dispatch(setUser({ ...res, avatar: userLogin.avatar }));
        window.location.reload();
      })
      .catch(({ message }) => {
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (user === null) {
    return (
      <div
        className={
          "flex min-h-lvh  items-center justify-between md:flex-row md:justify-around px-3 dark:bg-slate-900"
        }
      >
        <div className="hidden w-full md:flex flex-col items-center justify-center">
          <img
            src={registerSvg}
            alt="login-img"
            className="w-[400px] md:w-[500px]"
          />
        </div>
        <div className="w-full rounded-3xl border-t-2 p-2 md:border-none md:p-0">
          <form
            onSubmit={handleSubmit}
            className="mx-0 flex w-full flex-col gap-5 md:mx-auto md:w-[60%]"
          >
            <div>
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("input.name")}
                </label>
                <TextInput
                  name="username"
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your name"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t("input.password")}
              </label>
              <TextInput
                name="password"
                type="password"
                id="password"
                className="bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="password kiriting"
                required
              />
            </div>
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <Link
                  to="/register"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  Agar akkauntingiz bolmasa Registratsiya qiling!
                </Link>
              </div>
            </div>
            <Link
              to="/"
              className="w-full text-center bg-slate-400 py-3 rounded-lg text-white font-semibold"
            >
              Ghost
            </Link>
            <Button
              type="submit"
              className="flex justify-center  items-center"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <UpdateIcon className={"animate-spin"} />
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
}

export default Login;
