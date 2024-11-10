import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeUser } from "../features/userSlice";
import {
  ExitIcon,
  FileTextIcon,
  Pencil2Icon,
  PersonIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import SelectLang from "./SelectLang";
import { useTranslation } from "react-i18next";

export function MyNavbar() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.user);
  return (
    <Navbar
      rounded="40px"
      className="border-b-4 rounded-t-none rounded-b-xl dark:text-white"
    >
      <div className="hidden dark:block">
        <Link to="/" className="!p-0">
          <img
            className="!p-0 !m-0"
            src="../../public/dark-mode-fn.png"
            alt=""
            width={75}
            height={60}
          />
        </Link>
      </div>
      <div className="block dark:hidden">
        <Link to="/" className="!p-0">
          <img
            className="!p-0 !m-0"
            src="../../public/lite-mode-fn.png"
            alt=""
            width={75}
            height={60}
          />
        </Link>
      </div>
      <div className="flex gap-2 lg:gap-5 md:order-2">
        <span>
          <DarkThemeToggle />
        </span>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            user ? (
              <Avatar alt="User settings" img={user.avatar} rounded />
            ) : (
              <p className="bg-slate-200 px-3 py-1 text-lg font-semibold rounded-full dark:text-black">
                G
              </p>
            )
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {user ? user.username : "Ghost"}
            </span>
          </Dropdown.Header>
          <Dropdown.Item className="!p-0 flex justify-center"> </Dropdown.Item>
          {user && (
            <Dropdown.Item className="flex items-center justify-between gap-3">
              <Link to="/profile">{t("navbar.profile")}</Link> <PersonIcon />
            </Dropdown.Item>
          )}
          {user && (
            <Dropdown.Item
              className="flex items-center justify-between gap-3"
              onClick={() => {
                toast.success("Siz muvaffaqiyatli logOut qildingiz.");
                localStorage.removeItem("user");
                dispatch(removeUser(null));
              }}
            >
              {t("navbar.logOut")} <ExitIcon />
            </Dropdown.Item>
          )}
          {user === null && (
            <Dropdown.Item>
              <Link className="flex items-center gap-3" to="/register">
                {" "}
                {t("navbar.logIn")} <ExitIcon />
              </Link>
            </Dropdown.Item>
          )}
        </Dropdown>
        <SelectLang />
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Link to="/" className="flex items-center gap-1">
          <FileTextIcon /> {t("navbar.home")}
        </Link>
        <Link to="/newArticle" className="flex items-center gap-1">
          <Pencil2Icon />
          {t("navbar.write")}
        </Link>
        {user && (
          <Link to="/myArticles" className="flex items-center gap-1">
            {" "}
            <ReaderIcon />
            {t("navbar.myArticle")}
          </Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
