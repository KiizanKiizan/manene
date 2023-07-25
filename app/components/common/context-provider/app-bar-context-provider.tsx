"use client";
import { getPathnameTitle } from "@/app/model/shared/pathname";
import { usePathname } from "next/navigation";
import React, { createContext, useState } from "react";
export type TProps = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

export const AppBarTitle = createContext<TProps>({
  title: "",
  setTitle: () => undefined,
});

export default function AppBarContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [title, setTitle] = useState<string>(getPathnameTitle(pathname));
  return (
    <AppBarTitle.Provider value={{ title, setTitle }}>
      {children}
    </AppBarTitle.Provider>
  );
}
