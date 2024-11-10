import { getData } from "../request";
import { setArticle, setTotalArticles } from "../features/articleSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { UpdateIcon } from "@radix-ui/react-icons";
import { DataTime } from "../components/DataTime";
import { useTranslation } from "react-i18next";
import { FilterByCategory } from "../components/FilterBuCategoru";

export default function Home() {
  let [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { articles, filtredArticle } = useSelector((state) => state.article);
  const { totalArticles } = useSelector((state) => state.article);
  const { t } = useTranslation();
  const category = filtredArticle ? filtredArticle.category : "";

  function handleAddToSkip() {
    setSkip((prev) => (skip = prev + 10));
    if (totalArticles <= skip + 10) {
      setSkip(0);
    }
  }

  useEffect(() => {
    setLoading(true);
    getData({ skip, category })
      .then(({ data, total }) => {
        dispatch(setArticle(data));
        dispatch(setTotalArticles(total));
      })
      .catch(({ message }) => {
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [skip, category]);

  return (
    <div className="container mx-auto flex overflow-y-auto lg:pl-5">
      <DataTime />
      <div className="w-full h-full md:pl-10 lg:ml-40">
        <p className="w-full text-center font-semibold dark:text-white mb-3">
          {t("input.navigateData")}
        </p>

        <div className="max-w-[70%] pb-2 mb-3 border-b mx-auto">
          <FilterByCategory />
        </div>

        {loading ? (
          <div className="flex w-full justify-center h-96 my-10 items-center gap-3 dark:text-white">
            <UpdateIcon className="animate-spin" />
            {t("input.loading")}
          </div>
        ) : (
          articles?.map((article) => {
            return (
              <div key={article.id}>
                <Link to={`singleArticle/${article.id}`}>
                  <Card className="max-w-[70%] mx-auto mb-3">
                    <div className=" flex w-full flex-col md:flex-row  items-center gap-5 cursor-pointer">
                      <div>
                        <img
                          width={130}
                          height={130}
                          className="rounded-lg pt-2"
                          src={article.author.avatar}
                          alt="image of author"
                        />
                      </div>
                      <div>
                        <h1 className="flex flex-row justify-center gap-3 mb-3 font-semibold text-lg tracking-tight text-gray-900 dark:text-white">
                          <span className="font-semibold">
                            {t("input.author")}
                          </span>{" "}
                          : {article.author.name}
                        </h1>
                        <h5 className="text-2xl font-bold tracking-tight mb-2 text-gray-900 dark:text-white">
                          <span className="font-bold">{t("input.title")}</span>{" "}
                          : {article.title}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                          <span className="font-bold">
                            {t("input.description")}
                          </span>{" "}
                          : {article.description}
                        </p>
                        <h2 className="tracking-tight flex justify-end mt-5 font-semibold text-gray-900 dark:text-white">
                          {t("input.createdDate")} : {article.createdDate}
                        </h2>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            );
          })
        )}
        <div className="w-full flex items-center my-5 justify-center">
          <div className="flex flex-col max-w-[50%] font-semibold text-center gap-2 dark:text-white">
            <p>{t("input.paginationText")}</p>
            <Button
              outline
              gradientDuoTone="cyanToBlue"
              onClick={handleAddToSkip}
            >
              {totalArticles && totalArticles > skip + 10
                ? t("input.navigateButton1")
                : t("input.navigateButton2")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
