"use client";
import { List } from "@mui/material";
import LinkButtonListItem from "./_components/common/button/link-button-list-item";
import Header from "./_components/common/pages/header";
import SubHeader from "./_components/common/pages/sub-header";

export default function HomePage() {
  return (
    <>
      <Header title="メニュー" />
      <SubHeader height={40}>運営</SubHeader>
      <List disablePadding>
        <LinkButtonListItem
          buttonName="アイテムサイズ計測"
          path="size_measurements"
        />
        <LinkButtonListItem
          buttonName="クリーニングコスト登録"
          path="cleaning_costs"
        />
      </List>
      <SubHeader height={40}>返却検品</SubHeader>
      <List disablePadding>
        <LinkButtonListItem
          buttonName="返却検品前登録"
          path="before_inspection"
        />
        <LinkButtonListItem
          buttonName="返却検品中操作"
          path="inspecting_items"
        />
        <LinkButtonListItem buttonName="返却検品管理" path="inspection_group" />
        <LinkButtonListItem buttonName="忘れ物登録" path="lost_articles" />
      </List>
      <SubHeader height={40}>コーデ作成</SubHeader>
      <List disablePadding>
        <LinkButtonListItem buttonName="コーデピック" path="/coorde_pick" />
      </List>
      <SubHeader height={40}>アイテム管理</SubHeader>
      <List disablePadding>
        <LinkButtonListItem buttonName="アイテム登録" path="item_register" />
        <LinkButtonListItem buttonName="アイテム詳細表示" path="/item_detail" />
        <LinkButtonListItem
          buttonName="アイテムステータス一括変更"
          path="item_status"
        />
        <LinkButtonListItem buttonName="廃棄登録" path="wasted_reason" />
        <LinkButtonListItem buttonName="廃棄判定" path="judge_throw_away" />
      </List>
      <SubHeader height={40}>棚管理</SubHeader>
      <List disablePadding>
        <LinkButtonListItem buttonName="棚移動" path="item_location" />
        <LinkButtonListItem buttonName="棚卸し" path="stocktaking" />
      </List>
    </>
  );
}
