"use client";

import { AppBar, Typography } from "@mui/material";
import MenuAccordion from "./components/common/accordion/menu-accordion";
import LinkButton from "./components/common/button/link-button";

export default function HomePage() {
  return (
    <>
      <AppBar position="static">
        <Typography variant="h6" m={1.5}>
          メニュー
        </Typography>
      </AppBar>
      <MenuAccordion title={"運営"}>
        <LinkButton buttonName={"アイテムサイズ計測"} path="" />
        <LinkButton buttonName={"クリーニングコスト登録"} path="" />
      </MenuAccordion>
      <MenuAccordion title={"返却検品"}>
        <LinkButton buttonName={"返却検品登録"} path="" />
        <LinkButton buttonName={"返却検品中操作"} path="" />
        <LinkButton buttonName={"返却検品管理"} path="" />
        <LinkButton buttonName={"忘れ物登録"} path="" />
      </MenuAccordion>
      <MenuAccordion title={"コーデ作成"}>
        <LinkButton buttonName={"コーデバリデーション"} path="" />
        <LinkButton buttonName={"コーデピック"} path="/coorde_pick" />
      </MenuAccordion>
      <MenuAccordion title={"アイテム管理"}>
        <LinkButton buttonName={"アイテム登録"} path="" />
        <LinkButton buttonName={"アイテム詳細表示"} path="" />
        <LinkButton buttonName={"アイテムステータス一括変更"} path="" />
        <LinkButton buttonName={"廃棄登録"} path="" />
        <LinkButton buttonName={"廃棄判定"} path="" />
      </MenuAccordion>
      <MenuAccordion title={"棚管理"}>
        <LinkButton buttonName={"棚移動"} path="" />
        <LinkButton buttonName={"棚卸し"} path="" />
      </MenuAccordion>
    </>
  );
}
