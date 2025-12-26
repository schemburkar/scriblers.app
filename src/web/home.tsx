import React, { ReactNode, ReactElement } from "react";
import {
  Download,
  Monitor,
  Zap,
  Shield,
  Layout,
  ArrowRight,
  LucideProps,
} from "lucide-react";
import { DownloadButtonWrapper } from "./layout";
import { Button } from "@/components/ui/button";

export const Home = () => {
  // Download links - update these with your actual hosted URLs
  const DOWNLOAD_MSI = "#";
  const DOWNLOAD_EXE = "#";

  return (
    <>
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
          className={`text-xl max-w-2xl mx-auto mb-10 dark:text-slate-400 text-slate-600`}
        >
          A lightweight, distraction-free notepad built for writers who demand
          performance. Native speed meets a modern UI.
        </p>

        <div
          className="flex flex-col sm:flex-row items-stretch justify-center gap-4"
          id="download"
        >
          <DownloadButtonWrapper type="msi">
            <Button className="flex gap-3 gr rounded-xl font-bold text-lg w-full sm:w-auto h-full py-4">
              <Download size={22} />
              Download for Windows (.msi)
            </Button>
          </DownloadButtonWrapper>
          <DownloadButtonWrapper type="exe">
            <Button
              variant={"outline"}
              className={`flex  gap-3  px-8 py-4 rounded-xl font-bold text-lg w-full sm:w-auto h-full transition-all`}
            >
              Setup.exe
            </Button>
          </DownloadButtonWrapper>
        </div>
        <p className="mt-4 text-sm text-slate-500 flex items-center justify-center gap-2">
          <Monitor size={14} /> Coming soon to Microsoft Store
        </p>
      </header>

      {/* Feature Grid */}
      <section className={`py-24 dark:bg-slate-800/50 bg-white`}>
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
                  <span className={"dark:text-slate-300 text-slate-700"}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`aspect-video rounded-md flex items-center justify-center  shadow-2xl`}
          >
            <span className="text-slate-500 font-mono italic">
              <img
                src="/dark-app.png"
                className="not-dark:hidden p-1 rounded-md"
              />
              <img
                src="/light-app.png"
                className="dark:hidden p-1 rounded-md"
              />
            </span>
          </div>
        </div>
      </section>
    </>
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
