import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllArticles } from "../features/articleSlice";
import { deleteArticle, getAllData } from "../request";
import toast from "react-hot-toast";
import { Button, Card } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { TrashIcon } from "@radix-ui/react-icons";

export default function MyArticles() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { allArticles } = useSelector((state) => state.article);
  const { t } = useTranslation();

  function handleDelete(id) {
    setDeleteLoading(true);
    deleteArticle(id)
      .then((message) => {
        toast.success(message);
        window.location.reload();
      })
      .catch(({ message }) => {
        if (message === "403") {
          refreshToken().then(({ access_token }) => {
            dispatch(setUser({ ...user, access_token }));
          });
        } else {
          localStorage.removeItem("user");
          toast.error("Tizimga qayta kirin");
        }
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  }

  useEffect(() => {
    setLoading(true);
    getAllData()
      .then(({ data }) => {
        dispatch(setAllArticles(data));
      })
      .catch(({ message }) => {
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  // Filter articles by user ID
  const userArticles = allArticles?.filter(
    (article) => article.user_id === user.id
  );

  return (
    <div className="container mx-auto px-4 py-6 dark:text-white">
      {loading ? (
        <p className="text-center">{t("input.loading")}</p>
      ) : userArticles && userArticles.length > 0 ? (
        userArticles.map((article) => (
          <div key={article.id} className="mb-5">
            <Card className="w-full lg:max-w-[80%] mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-5 cursor-pointer">
                <div className="flex-shrink-0">
                  <img
                    width={130}
                    height={130}
                    className="rounded-lg"
                    src={article.author.avatar}
                    alt="image of author"
                  />
                </div>
                <div className="flex-1 w-full">
                  <h1 className="text-lg font-medium text-gray-900 dark:text-white">
                    {article.name}
                  </h1>
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {article.title}
                  </h5>
                  <p className="font-normal line-clamp-2 text-gray-700 dark:text-gray-400">
                    {article.description}
                  </p>
                  <h2 className="text-sm text-gray-900 dark:text-white mt-2">
                    <span>{t("input.createdDate")}:</span> {article.createdDate}
                  </h2>
                </div>
              </div>
              <div className="w-full flex justify-end mt-3">
                <Button
                  onClick={() => handleDelete(article.id)}
                  className="w-10 h-10 flex items-center justify-center"
                  size="icon"
                  color="failure"
                  disabled={deleteLoading}
                >
                  <TrashIcon className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          </div>
        ))
      ) : (
        <h2 className="text-center text-xl font-bold mt-10">
          {t("input.noArticle")}
        </h2>
      )}
    </div>
  );
}
