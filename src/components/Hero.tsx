import logo from "../assets/logo.svg";

export function Hero() {
  function handleGithub() {
    window.open("https://github.com/leokazuyukinagatani");
  }
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3 ">
        <img src={logo} alt="sumz_log" className="w-28 object-contain" />
        <button type="button" onClick={handleGithub} className="black_btn">
          Github
        </button>
      </nav>

      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with Summize, and open-source article summarizer
        that transform lengthy articles into clear and concise summaries
      </h2>
    </header>
  );
}
