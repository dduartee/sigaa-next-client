import React, { useEffect } from "react";
import { Course } from "@types";
import CollapsibleTable from "@components/Home/CollapsibleTable";
import { Period } from "./Period";
import { StyledTableRow, StyledTableCell } from "../Content";
import { TableHead, TableBody } from "@mui/material";

export function DesktopTable(props: { gradesIndex: string[]; periods: string[] | undefined; coursesByPeriod: Map<string, Course[]>; }) {
  const { gradesIndex, periods, coursesByPeriod } = props;
  const [reordenateGradesIndex, setReordenateGradesIndex] = React.useState<string[]>([]);
  useEffect(() => {
    const reordenateGradesIndex = gradesIndex.sort((a, b) => {
      const aNum = parseInt((a.match(/\d+/) || [])[0] ?? "");
      const bNum = parseInt((b.match(/\d+/) || [])[0] ?? "");
      if (isNaN(aNum)) return 1; // coloca elementos sem número no final
      if (isNaN(bNum)) return -1; // coloca elementos sem número no final
      return aNum - bNum;
    });
    setReordenateGradesIndex(reordenateGradesIndex);
  }, [gradesIndex])
  return <CollapsibleTable>
    <TableHead>
      <StyledTableRow>
        <StyledTableCell />
        <StyledTableCell>Período</StyledTableCell>
        {reordenateGradesIndex.map((_, key) => (
          <StyledTableCell key={key} width={"100%"}></StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
    <TableBody>
      {periods?.map((period, key) => (
        <Period
          period={period}
          key={key}
          coursesByPeriod={coursesByPeriod}
          gradesIndex={reordenateGradesIndex} />
      ))}
    </TableBody>
  </CollapsibleTable>;
}
