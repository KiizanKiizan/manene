"use client";
import { Button } from "@mui/material";
import Link from "next/link";

type TProps = {
  buttonName: string;
  path: string;
};

export default function LinkButton({ buttonName, path }: TProps) {
  return (
    <Link href={path}>
      <Button fullWidth={true} sx={{ justifyContent: "flex-start" }}>
        {buttonName}
      </Button>
    </Link>
  );
}
