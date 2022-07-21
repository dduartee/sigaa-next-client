import React from "react";
import { Course } from "@types";
import { Box, IconButton, TableBody, TableHead } from "@material-ui/core";
import CollapsibleTable from "@components/Home/CollapsibleTable";
import { StyledTableRow, StyledTableCell } from "../Content";
import { GradeRowMobile } from "./GradeRowMobile";

export function CourseTable(props: { course: Course; gradesIndex: string[]; }): JSX.Element {
  const { course, gradesIndex } = props;
  const [openCourse, setOpenCourse] = React.useState<boolean>(true);
  return <Box m={1} width="100%" mb={3}>
    <CollapsibleTable>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell>
            <IconButton size="small" onClick={() => setOpenCourse(!openCourse)}>
              {/*openCourse ? <KeyboardArrowUp /> : <KeyboardArrowDown />*/}
            </IconButton>
          </StyledTableCell>
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
