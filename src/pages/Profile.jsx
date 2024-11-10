import { useSelector } from "react-redux";
import { DataTime } from "../components/DataTime";

import { EditProfile } from "../components/EditProfile";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { user } = useSelector((state) => state.user);
  const { t } = useTranslation();

  return (
    <div className="container mx-auto flex overflow-y-auto lg:pl-5">
      <DataTime />
      <div className="w-[90%] lg:w-[70%] lg:ml-80 px-10 text-center border-x-2 mx-auto mb-3 dark:text-white">
        <h2 className="text-xl font-bold tracking-widest">
          {t("input.myProfile")}
        </h2>
        <div className="p-10">
          <div className="flex flex-col mb-10 justify-around items-center gap-10 ">
            <div className="flex items-end rounded-full justify-center">
              <img
                className="object-cover rounded-full w-52 h-52 "
                src={user.avatar}
              />

              <div className="-ml-14">
                <EditProfile />
              </div>
            </div>

            <div className="flex gap-7 md:gap-32 md:flex-row lg:gap-40 flex-row">
              <h2 className="capitalize text-md flex flex-col lg:text-2xl tracking-[2px] font-bold">
                <span>{t("input.name")} :</span> <span>{user?.username}</span>
              </h2>
              <p className="flex flex-col capitalize text-md lg:text-2xl tracking-[2px] font-bold">
                <span>{t("input.password")} :</span> <span>••••••</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
