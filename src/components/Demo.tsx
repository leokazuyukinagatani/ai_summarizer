import { useEffect, useState } from "react";
//@ts-ignore
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

type Article = {
  url: string;
  summary: string;
};
export function Demo() {
  const [article, setArticle] = useState<Article>({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState<Article[]>([]);

  const [copied, setCopied] = useState();
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data } = await getSummary({
      articleUrl: article.url,
    });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      console.log(newArticle);
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };
  const handleChangeArticleUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticle({
      ...article,
      url: e.currentTarget.value,
    });
  };

  const handleCopy = (copyUrl) => {
    navigator.clipboard.writeText(copyUrl);
    setCopied(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  useEffect(() => {
    const articles = localStorage.getItem("articles");
    if (!articles) {
      return;
    }
    const articlesFromLocalStorage = JSON.parse(articles);
    if (!articlesFromLocalStorage) {
      return;
    }
    setAllArticles(articlesFromLocalStorage);
  }, []);
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
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              className="link_card"
              onClick={() => {
                setArticle(item);
              }}
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Display results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img
            src={loader}
            alt="loader"
            className="w-20 h-20 object-contain animate-spin"
          />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that wasn't supposed to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
