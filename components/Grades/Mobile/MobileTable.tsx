import React from "react";
import { Course } from "@types";
import CollapsibleTable from "@components/Home/CollapsibleTable";
import { StyledTableRow, StyledTableCell } from "../Content";
import { PeriodMobile } from "./PeriodMobile";
import { TableHead, TableBody } from "@mui/material";
import { ICourseDTOProps } from "@DTOs/CourseDTO";

/**
 * Uma tabela para cada matéria, com o index a esquerda e o nome da matéria no head
 */
export function MobileTable(props: { gradesIndex: string[]; periods: string[]; coursesByPeriod: Map<string, ICourseDTOProps[]>; }) {
  const { gradesIndex, periods, coursesByPeriod } = props;
  return (
    <CollapsibleTable>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell />
          <StyledTableCell>Período</StyledTableCell>
          <StyledTableCell />
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {periods?.map((period, key) => (
          <PeriodMobile
            period={period}
            key={key}
            coursesByPeriod={coursesByPeriod}
            gradesIndex={gradesIndex} />
        ))}
      </TableBody>
    </CollapsibleTable>
  );
}
