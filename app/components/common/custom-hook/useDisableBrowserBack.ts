import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function useDisableBrowserBack() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const handleClickOpenDialog = () => {
    setIsDialogOpen(true);
    history.pushState("", "", pathname);
  };

  const handleClickCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const blockBrowserBack = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  useEffect(() => {
    addEventListener("popstate", blockBrowserBack);
    return () => {
      removeEventListener("popstate", blockBrowserBack);
    };
  }, [blockBrowserBack]);
  return {
    isDialogOpen,
    handleClickCloseDialog,
    handleClickOpenDialog,
  };
}
