"use client";
import { AppBar, Button } from "@mui/material";
import Link from "next/link";

type TProps = {
  title: string;
};

export default function Header({ title }: TProps) {
  return (
    <AppBar position="static" elevation={0}>
      <Link href={"/"} passHref>
        <Button
          style={{
            color: "white",
            marginTop: "8px",
            marginBottom: "8px",
            marginLeft: "12px",
            marginRight: "12px",
            fontSize: "1.25rem",
            fontWeight: 500,
          }}
        >
          {title}
        </Button>
      </Link>
    </AppBar>
  );
}
