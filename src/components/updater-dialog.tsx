import { check, type Update as UpdateInfo } from "@tauri-apps/plugin-updater";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CheckCircle2, CircleDashedIcon, DownloadIcon } from "lucide-react";
import { DialogDescription, DialogHeader } from "./ui/dialog";

type UpdateState = {
  status: "pending" | boolean;
  version: string;
  info?: UpdateInfo;
};
export const UpdaterDialog = () => {
  const [update, setUpdate] = useState<UpdateState>({
    status: "pending",
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
    if (update.status == "pending") setTimeout(doUpdate, 5000);
  }, [update.status]);

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

  return (
    <>
      <DialogHeader>Checking for updates</DialogHeader>

      {update.status == "pending" ? (
        <CircleDashedIcon className="animate-spin " />
      ) : update.status ? (
        <>
          <p>
            <DownloadIcon className="inline stroke-sky-600 mr-2" /> A new
            version (v
            {update.version}) is available.
          </p>
          {update.info != undefined && !!update.info.date && (
            <DialogDescription>
              App will update from {update.info.currentVersion} to{" "}
              {update.info.version} ({new Date(update.info.date).toDateString()}{" "}
              {new Date(update.info.date).toLocaleTimeString()})
            </DialogDescription>
          )}
          <Button
            disabled={isDownloading}
            title={`Download and Install. App will restart`}
            onClick={handleUpdate}
            className="h-full   animate-in fade-in slide-in-from-top-1 text-xs"
          >
            Download and Install
          </Button>
          <DialogDescription>App wil restart automatically</DialogDescription>
        </>
      ) : (
        <>
          <p>
            <CheckCircle2 className="inline stroke-green-600" /> You are up to
            date!
          </p>
          <Button
            onClick={() =>
              setUpdate({ status: "pending", version: "", info: undefined })
            }
            variant={"outline"}
          >
            Check for updates
          </Button>
        </>
      )}
    </>
  );
};
