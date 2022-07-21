import React from "react";
import { Course } from "@types";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import CollapsibleTable from "@components/Home/CollapsibleTable";
import { Period } from "./Period";
import { StyledTableRow, StyledTableCell } from "../Content";

export function DesktopTable(props: { gradesIndex: string[]; periods: string[] | undefined; coursesByPeriod: Map<string, Course[]>; }) {
  const { gradesIndex, periods, coursesByPeriod } = props;
  return <CollapsibleTable>
    <TableHead>
      <StyledTableRow>
        <StyledTableCell />
        <StyledTableCell>Período</StyledTableCell>
        {gradesIndex.map((_, key) => (
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
          gradesIndex={gradesIndex} />
      ))}
    </TableBody>
  </CollapsibleTable>;
}
