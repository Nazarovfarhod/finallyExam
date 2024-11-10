import { UpdateIcon } from "@radix-ui/react-icons";
import { getFormData } from "../myUtils";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  Label,
  Textarea,
  TextInput,
  Datepicker,
  Select,
  Button,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { addArticle, collectItem, getCategory, refreshToken } from "../request";
import { setUser } from "../features/userSlice";
import { useTranslation } from "react-i18next";

export default function NewArticle() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [categorys, setCategorys] = useState(null);
  const [addingArticle, setAddingArticle] = useState(null);
  const [crudLoading, setCrudLoading] = useState(false);
  const { t } = useTranslation();

  // Fetch categories
  useEffect(() => {
    getCategory()
      .then(({ data }) => {
        const allCategory = collectItem(data, "category");
        setCategorys(allCategory);
      })
      .catch(({ message }) => {
        toast.error(message);
      });
  }, []);

  // Handle form submit
  function handleSubmit(e) {
    e.preventDefault();
    const article = getFormData(e.target);
    setAddingArticle(article);
    e.target.reset();
  }

  // Handle article addition
  useEffect(() => {
    if (addingArticle) {
      setCrudLoading(true);
      addArticle({
        ...addingArticle,
        author: { avatar: user.avatar, name: user.username },
      })
        .then((message) => {
          toast.success(message);
          setAddingArticle(null);
        })
        .catch(({ message }) => {
          if (message === "403") {
            refreshToken()
              .then(({ access_token }) => {
                dispatch(setUser({ ...user, access_token }));
              })
              .catch(({ message }) => {
                dispatch(setUser(null));
                toast.info(message);
              });
          } else {
            toast.error(message);
          }
        })
        .finally(() => {
          setCrudLoading(false);
        });
    }
  }, [addingArticle, user, dispatch]);

  return (
    <div className="container mx-auto px-4 dark:text-white">
      <h2 className="text-xl mb-10 lg:text-2xl text-center font-bold">
        {t("input.creatArticleTitle")}
      </h2>
      <div className="flex justify-center gap-2 flex-col items-center md:flex-row">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col h-[500px] overflow-auto items-center justify-start"
        >
          <h3 className="text-xl text-center font-bold mb-3">
            {t("input.creatArticleDes")}
          </h3>

          <div className="max-w-96 flex gap-2 items-center mb-2 w-full">
            <div className="w-full">
              <Label className="ml-2" htmlFor="date">
                {t("input.createdDate")}
              </Label>
              <Datepicker name="createdDate" id="date" required />
            </div>
            <div className="w-full">
              <div className="block">
                <Label htmlFor="category" value={t("input.category")} />
              </div>
              <Select name="category" id="category" required>
                {categorys?.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </Select>
            </div>
          </div>
          <div className="max-w-96 w-full">
            <Label
              htmlFor="title"
              className="block mb-2 ml-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {t("input.title")}
            </Label>
            <TextInput
              id="title"
              name="title"
              placeholder={t("input.placholderTitle")}
              required
            />
          </div>
          <div className="max-w-96 mb-3 w-full">
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label
                  className="ml-2"
                  htmlFor="description"
                  value={t("input.description")}
                />
              </div>
              <Textarea
                id="description"
                name="description"
                placeholder={t("input.placholderDescription")}
                required
                rows={2}
              />
            </div>
          </div>
          <div className="max-w-96 mb-5 w-full">
            <Label
              htmlFor="readTime"
              className="block mb-2 ml-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {t("input.readTime")}
            </Label>
            <TextInput
              name="readTime"
              id="readTime"
              required
              placeholder={t("input.placholderCreatData")}
            />
          </div>
          <Button type="submit" disabled={crudLoading}>
            {crudLoading ? (
              <UpdateIcon className="animate-spin" />
            ) : (
              t("input.writeButton")
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
