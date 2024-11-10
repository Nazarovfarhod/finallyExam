import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { removeUser } from "../features/userSlice";
import toast from "react-hot-toast";

export function LogOutModal() {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>{t("navbar.logOut")}</Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {t("modal.confirmLogout")}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setOpenModal(false);
                  localStorage.removeItem("user");
                  dispatch(removeUser(null));
                  toast.success(t("toast.logoutSuccess"));
                }}
              >
                {t("modal.confirmButton")}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                {t("modal.cancelButton")}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
