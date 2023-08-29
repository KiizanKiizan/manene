import { TInspectionGroup } from "@/app/api/inspection-groups/getInspectionGroupsIndex";
import dynamic from "next/dynamic";
import InspectionGroupRow from "./inspection-group-row";
const List = dynamic(() => import("@mui/material").then((mod) => mod.List), {
  ssr: false,
});

type TProps = {
  inspectionGroups: TInspectionGroup[];
  onClickEndRegistration: (id: number) => void;
  isLoadingEndRegistration: boolean;
  onClickInspect: (id: number) => void;
  isLoadingInspect: boolean;
};

export default function InspectionGroupList({
  inspectionGroups,
  onClickEndRegistration,
  isLoadingEndRegistration,
  onClickInspect,
  isLoadingInspect,
}: TProps) {
  return (
    <List>
      {inspectionGroups.map((group) => {
        return (
          <InspectionGroupRow
            key={group.id}
            inspectionGroup={group}
            onClickEndRegistration={onClickEndRegistration}
            isLoadingEndRegistration={isLoadingEndRegistration}
            onClickInspect={onClickInspect}
            isLoadingInspect={isLoadingInspect}
          />
        );
      })}
    </List>
  );
}
