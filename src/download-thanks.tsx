import {
  AlertTriangle,
  AlertTriangleIcon,
  CheckCircle,
  CheckCircle2Icon,
  CheckCircleIcon,
  Clock4,
  Monitor,
  MoreHorizontalIcon,
} from "lucide-react";

export default function ThankYouPage() {
  return (
    <>
      {/* Main Content */}

      <header className="max-w-7xl mx-auto px-8 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-sky-600 dark:text-sky-400 px-4 py-1.5 rounded-full text-sm font-medium mb-8">
          <CheckCircleIcon />
        </div>
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Thank you for downloading{" "}
          <span className="text-sky-700 dark:text-sky-500">Scriblers</span>!
        </h1>
        <p
          className={`text-xl max-w-2xl mx-auto mb-10 dark:text-slate-400 text-slate-600"}`}
        >
          Your download should start automatically
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          id="download"
        ></div>
      </header>

      <main className="flex-1 flex flex-col items-center  px-4 min-h-180">
        <div className="max-w-4xl w-full border-border border rounded-lg shadow-lg p-12 flex flex-col gap-2 ">
          <h2 className="text-3xl  font-bold mb-3 text-center">
            <AlertTriangleIcon className="size-8 text-yellow-500  dark:text-yellow-400 inline" />{" "}
            Windows SmartScreen & Unknown Publisher
          </h2>
          <p className="text-lg text-accent-foreground mb-6 ">
            Because Scriblers is an indie project, you may see security prompts
            from <span className="font-semibold">Windows SmartScreen</span> or{" "}
            <span className="font-semibold">User Account Control</span> when
            installing.
          </p>
          <div className="bg-sky-600 dark:bg-sky-950 border border-yellow-300/20 rounded-md p-4 mb-6 text-sidebar-primary-foreground  text-left flex">
            <CheckCircle2Icon className="w-6 h-6 mr-3 text-sidebar-primary-foreground" />
            <span>
              <strong>Rest assured:</strong> If you downloaded from our official
              website, it’s safe to proceed with the setup.
            </span>
          </div>
          <p className="text-lg text-left mb-6">
            Here’s what to expect and how to proceed:
          </p>

          {/* Step-by-step Instructions */}

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircleIcon className="w-5 h-5 text-sky-400" />
              <span className="font-semibold ">
                SmartScreen: "Windows protected your PC"
              </span>
            </div>
            <ol className="ml-8  list-decimal flex flex-col gap-2">
              <li>
                Click <span className="font-medium ">More info</span> if
                required.
              </li>
              <li>
                Choose <span className="font-medium ">Keep</span> from the{" "}
                <MoreHorizontalIcon className="inline" /> menu.
              </li>
              <li>
                Click <span className="font-medium ">Run anyway</span> to
                continue.
              </li>
            </ol>
          </div>
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircleIcon className="w-5 h-5 text-sky-400" />
              <span className="font-semibold ">Unknown Publisher Warning</span>
            </div>
            <ol className="ml-8  list-decimal flex flex-col gap-2">
              <li>Verify the filename matches your download.</li>
              <li>
                Click <span className="font-medium ">Yes</span> to start the
                installation.
              </li>
            </ol>
          </div>

          <p className="text-gray-400 text-xs mt-4"></p>
          <p className="mt-4 text-sm text-slate-500 flex items-center justify-center gap-2">
            <Clock4 size={14} /> We’re working to add digital signatures in
            future releases for a seamless install.
          </p>
        </div>
      </main>

      {/* Footer */}
    </>
  );
}
