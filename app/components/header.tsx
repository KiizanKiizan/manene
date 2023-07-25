"use client";
import { AppBar, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { AppBarTitle } from "./common/context-provider/app-bar-context-provider";
import { usePathname } from "next/navigation";
import { getPathnameTitle } from "../model/shared/pathname";

export default function Header() {
  const { title, setTitle } = useContext(AppBarTitle);
  const pathname = usePathname();
  useEffect(() => {
    setTitle(getPathnameTitle(pathname) ?? "");
  }, [pathname, setTitle]);
  return (
    <AppBar position="static">
      <Typography variant="h6" m={1.5}>
        {title}
      </Typography>
    </AppBar>
  );
}
