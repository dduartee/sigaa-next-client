import React from "react";
import { Course } from "@types";
import {
  Collapse,
  IconButton, Typography
} from "@material-ui/core";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";
import { StyledTableRow, StyledTableCell } from "../Content";
import { CourseTable } from "./CourseTable";

export function PeriodMobile(props: {
  period: string;
  coursesByPeriod: Map<string, Course[]>;
  gradesIndex: string[];
}) {
  const { period, coursesByPeriod, gradesIndex } = props;
  const courses = coursesByPeriod.get(period) ?? [];
  const [openPeriod, setOpenPeriod] = React.useState<boolean>(true);
  return (
    <>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell>
          <IconButton size="small" onClick={() => setOpenPeriod(!openPeriod)}>
            {openPeriod ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell>
          <Typography>{period}</Typography>
        </StyledTableCell>
        <StyledTableCell />
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: 0, border: 0 }}
          colSpan={10}
        >
          <Collapse in={openPeriod} timeout="auto" unmountOnExit sx={{ overflow: "visible" }}>
            {courses?.map((course, key) => <CourseTable key={key} course={course} gradesIndex={gradesIndex} />
            )}
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}
