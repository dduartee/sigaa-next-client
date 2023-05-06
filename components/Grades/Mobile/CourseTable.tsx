import React from "react";
import { Course } from "@types";
import CollapsibleTable from "@components/Home/CollapsibleTable";
import { StyledTableRow, StyledTableCell } from "../Content";
import { GradeRowMobile } from "./GradeRowMobile";
import { Box, TableHead, TableBody } from "@mui/material";

export function CourseTable(props: { course: Course; gradesIndex: string[]; }): JSX.Element {
  const { course, gradesIndex } = props;
  return <Box m={1} width="100%" mb={3}>
    <CollapsibleTable>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell width="1rem"></StyledTableCell>
          <StyledTableCell>
            {course.title}
          </StyledTableCell>
          <StyledTableCell></StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {gradesIndex.map((index, key) => {
          return (
            <GradeRowMobile
              grades={course.grades || []}
              gradesIndex={gradesIndex}
              index={index}
              key={key} />
          );
        })}
      </TableBody>
    </CollapsibleTable>
  </Box>;
}
