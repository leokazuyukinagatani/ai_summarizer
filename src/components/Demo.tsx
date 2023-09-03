import { useState } from "react";
//@ts-ignore
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

export function Demo() {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data } = await getSummary({
      articleUrl: article.url,
    });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      console.log(newArticle);
      setArticle(newArticle);
    }
  };
  const handleChangeArticleUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticle({
      ...article,
      url: e.currentTarget.value,
    });
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          action=""
          onSubmit={(e) => handleSubmit(e)}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Paste your link here"
            value={article.url}
            onChange={(e) => handleChangeArticleUrl(e)}
            required
            className="url_input peer"
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↵
          </button>
        </form>
        {/* Browse URL History */}
      </div>
      {/* Display results */}
    </section>
  );
}
