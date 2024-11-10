import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function SingleArticle() {
  const { id } = useParams();
  const { articles } = useSelector((state) => state.article);

  if (articles) {
    const article = articles.find((article) => +article.id === +id);
    return (
      <div
        key={article.id}
        className="container overflow-hidden grid gap-2 lg:gap-5 p-5 rounded-3xl bg-white mx-auto max-w-[70%] lg:py-10 lg:grid-flow-row lg:px-10 lg:h-[530px] lg:grid-cols-2 dark:bg-slate-700 dark:text-white"
      >
        <div className="flex flex-col lg:gap-3 items-center">
          <img
            src={article.author?.avatar}
            alt=""
            width={300}
            height={500}
            className="rounded-full"
          />
          <p className="text-md lg:text-lg font-semibold">
            {article.author?.name}
          </p>
          <p>Maqola turi : {article.category}</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl mb-3 text-center font-semibold lg:text-3xl lg:font-bold lg:mb-10">
            {article.title}
          </h2>
          <p className="text-center lg:text-lg lg:tracking-widest mb-5 overflow-y-auto lg:max-w-96 max-h-[343px]">
            {article.description} Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Autem dicta officia velit doloribus quo iste a, in
            ut amet, necessitatibus ducimus praesentium laborum culpa omnis
            facilis suscipit consequatur libero iure.
          </p>
          <p>O'qish vaqti : {article.readTime}</p>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
}
