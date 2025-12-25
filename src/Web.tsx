import "./App.css";
import React, { useState, useEffect, ReactNode, ReactElement } from "react";
import {
  Download,
  Monitor,
  Zap,
  Shield,
  Layout,
  Moon,
  Sun,
  ArrowRight,
  LucideProps,
} from "lucide-react";

const ScriblersLanding = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Download links - update these with your actual hosted URLs
  const DOWNLOAD_MSI = "#";
  const DOWNLOAD_EXE = "#";

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-slate-950 text-white dark" : "bg-slate-50 text-slate-900"} transition-colors duration-300 font-sans`}
    >
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className=" p-2 rounded-lg">
            <img className="size-8" src="src/assets/Square71x71Logo.png" />
            {/*<Layout size={24} className="text-white" />*/}
          </div>
          <span className="text-2xl font-bold tracking-tight">Scriblers</span>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800  transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <a
            href="#download"
            className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-full font-medium transition-all"
          >
            Download
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-8 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-sky-600 dark:text-sky-400 px-4 py-1.5 rounded-full text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          Powered by Tauri 2.0 & Rust
        </div>
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Blazing-fast{" "}
          <span className="text-sky-700 dark:text-sky-500">tabbed</span>{" "}
          writing.
        </h1>
        <p
          className={`text-xl max-w-2xl mx-auto mb-10 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
        >
          A lightweight, distraction-free notepad built for writers who demand
          performance. Native speed meets a modern UI.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          id="download"
        >
          <a
            href={DOWNLOAD_MSI}
            className="flex items-center gap-3 bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-xl font-bold text-lg w-full sm:w-auto transition-transform active:scale-95"
          >
            <Download size={22} />
            Download for Windows (.msi)
          </a>
          <a
            href={DOWNLOAD_EXE}
            className={`flex items-center gap-3 border ${isDarkMode ? "border-slate-700 hover:bg-slate-800" : "border-slate-300 hover:bg-slate-100"} px-8 py-4 rounded-xl font-bold text-lg w-full sm:w-auto transition-all`}
          >
            Direct .exe
          </a>
        </div>
        <p className="mt-4 text-sm text-slate-500 flex items-center justify-center gap-2">
          <Monitor size={14} /> Coming soon to Microsoft Store
        </p>
      </header>

      {/* Feature Grid */}
      <section
        className={`py-24 ${isDarkMode ? "bg-slate-800/50" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Zap className="text-yellow-400" />}
              title="Native Performance"
              desc="Tiny binary and low RAM usage via Rust core. Starts instantly, every time."
            />
            <FeatureCard
              icon={<Layout className="text-blue-400" />}
              title="Smart Switcher"
              desc="High-performance Ctrl+Tab dialog with visual previews and smooth scrolling."
            />
            <FeatureCard
              icon={<Shield className="text-green-400" />}
              title="Privacy-Focused"
              desc="Fully offline. No tracking, no data collection, and no content analysis."
            />
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Designed for Focus.</h2>
            <ul className="space-y-6">
              {[
                "Auto-Save: Background persistence to never lose work.",
                "System-aware light and dark mode toggles.",
                "Seamless tab management: open, close, and duplicate.",
                "Clean, distraction-free TypeScript-powered UI.",
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="mt-1 bg-blue-500/20 p-1 rounded">
                    <ArrowRight size={16} className="text-sky-500" />
                  </div>
                  <span
                    className={isDarkMode ? "text-slate-300" : "text-slate-700"}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`aspect-video rounded-2xl border ${isDarkMode ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-slate-200"} flex items-center justify-center shadow-2xl`}
          >
            <span className="text-slate-500 font-mono italic">
              [ App Screenshot Placeholder ]
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`border-t ${isDarkMode ? "border-slate-800 text-slate-500" : "border-slate-200 text-slate-400"} py-12 text-center`}
      >
        <p>Built with ❤️ for writers and developers.</p>
        <p className="text-xs mt-2 italic">Scriblers by x.com/shubhan3009</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  desc,
}: {
  icon: ReactElement<LucideProps>;
  title: ReactNode;
  desc: ReactNode;
}) => (
  <div className="flex flex-col items-center text-center">
    <div className="mb-6 p-4 rounded-2xl bg-slate-500/10">
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="opacity-70 leading-relaxed">{desc}</p>
  </div>
);

export default ScriblersLanding;
