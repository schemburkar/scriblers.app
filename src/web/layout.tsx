import { Sun, Moon } from "lucide-react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div
      className={`min-h-screen dark:bg-slate-950 dark:text-white bg-slate-50 text-slate-900 transition-colors duration-300 font-sans`}
    >
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <img className="size-8" src="/Square71x71Logo.png" />

          <span className="text-2xl font-bold tracking-tight">Scriblers</span>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => document.documentElement.classList.toggle("dark")}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800  transition-colors"
          >
            <Sun className="not-dark:hidden" size={20} />{" "}
            <Moon className="dark:hidden" size={20} />
          </button>
          <a
            href="#download"
            className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-xl font-medium transition-all"
          >
            Download
          </a>
        </div>
      </nav>

      <Outlet />

      <footer
        className={`border-t  dark:border-slate-800 dark:text-slate-500 border-slate-200 text-slate-400  py-12 text-center`}
      >
        <p>Built with ❤️ for writers and developers.</p>
        <p className="text-xs mt-2 italic">
          Scriblers by{" "}
          <a
            target="_blank"
            className="hover:underline"
            href="https://x.com/shubhan3009"
          >
            x.com/shubhan3009
          </a>
        </p>
      </footer>
    </div>
  );
};
