import { check, type Update as UpdateInfo } from "@tauri-apps/plugin-updater";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { DownloadIcon } from "lucide-react";

type UpdateState = {
  status: boolean;
  version: string;
  info?: UpdateInfo;
};
export const Updater = () => {
  const [update, setUpdate] = useState<UpdateState>({
    status: false,
    version: "",
    info: undefined,
  });
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const doUpdate = async () => {
      try {
        const update = await check();
        if (update) {
          setUpdate({ status: true, version: update.version, info: update });
        } else {
          setUpdate({ status: false, version: "", info: undefined });
        }
      } catch (e) {}
    };
    setTimeout(doUpdate, 5000);
  }, []);

  const handleUpdate = async () => {
    setIsDownloading(true);
    try {
      await update.info?.downloadAndInstall();
      // On Windows the application is automatically exited when the install step is executed due to a limitation of Windows installers.
      // await relaunch();
    } catch (e) {
      alert("Failed to update due to unknown errors, please try again later");
      setIsDownloading(false);
    }
  };

  if (!update || !update.status) return;
  return (
    <Button
      disabled={isDownloading}
      title={`New version available (v${update.version}) - Click to download and install`}
      onClick={handleUpdate}
      className="h-full rounded-t-none bg-sky-800 text-white hover:bg-sky-900 cursor-pointer!"
    >
      <DownloadIcon className="animate-pulse" /> Update available
    </Button>
  );
};
