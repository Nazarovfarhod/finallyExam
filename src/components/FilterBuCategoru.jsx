import { Button, Label, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { collectItem, getCategory } from "../request";
import { getFormData } from "../myUtils";
import { useDispatch } from "react-redux";
import { setFiltredArticle } from "../features/articleSlice";

export function FilterByCategory() {
  const { t } = useTranslation();
  const [categorys, setCategorys] = useState(null);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const filteredValue = getFormData(e.target);
    console.log(filteredValue);
    dispatch(setFiltredArticle(filteredValue));
  }

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

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="countries" value={t("input.filterCategory")} />
      </div>
      <div className=" flex gap-5 items-center">
        <Select name="category" className="w-full" id="countries" required>
          {categorys?.map((category) => {
            return <option key={category}>{category}</option>;
          })}
        </Select>
        <Button type="submit">{t("input.filterButton")}</Button>
      </div>
    </form>
  );
}
