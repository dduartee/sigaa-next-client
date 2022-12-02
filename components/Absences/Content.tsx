import { StyledTableRow, StyledTableCell } from "@components/Grades/Content";
import CollapsibleTable from "@components/Home/CollapsibleTable";
import {
  Box,
  Collapse,
  IconButton,
  TableBody,
  TableHead,
  Typography,
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import { Bond, Course } from "@types";
import React from "react";
import "moment-timezone";
import { generateScheduleData } from "@components/Schedules/Content";
import { formatDate } from "@components/Lessons/Content";
export default function Absences(props: { bond: Bond | null }) {
  const courses = props.bond?.courses ?? [];
  return (
    <Box display="flex" flexWrap={"wrap"} justifyContent={"center"}>
      <CourseTableDesktop courses={courses} />
    </Box>
  );
}

function CourseTableDesktop(props: { courses: Course[] }): JSX.Element {
  return (
    <Box m={1} mb={3}>
      <CollapsibleTable>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell width="1rem" />
            <StyledTableCell>Matéria</StyledTableCell>
            <StyledTableCell>Faltas</StyledTableCell>
            <StyledTableCell>Máximo</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {props.courses.map((course, key) => {
            return <CourseRowDesktop course={course} key={key} />;
          })}
        </TableBody>
      </CollapsibleTable>
    </Box>
  );
}

function CourseRowDesktop(props: { course: Course }): JSX.Element {
  const { course } = props;
  const [open, setOpen] = React.useState(false);
  if (!course.absences) return <></>;
  const { startDate, endDate } = generateScheduleData(
    course.schedule ?? ""
  )[0][0];
  return (
    <>
      <StyledTableRow>
        <StyledTableCell>
          <Box width="1rem">
            {course.absences.total !== 0 ? (
              <IconButton size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            ) : (
              <IconButton size="small" />
            )}
          </Box>
        </StyledTableCell>
        <StyledTableCell>{course.title}</StyledTableCell>
        <StyledTableCell>
          <Typography
            fontSize={"1rem"}
            textAlign={"center"}
            color={
              Math.round(course.absences.max * 0.7) <= course.absences.total
                ? "error"
                : ""
            }
          >
            {course.absences.total}
          </Typography>
        </StyledTableCell>
        <StyledTableCell>
          <Typography fontSize={"1rem"} textAlign={"center"}>
            {course.absences.max}
          </Typography>
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
          colSpan={10}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, mb: 3 }}>
              <Typography variant="caption" gutterBottom component="div">
                Faltas registradas{" "}
                {`(${startDate.getHours()}:${startDate.getMinutes()} - ${endDate.getHours()}:${endDate.getMinutes()})`}
              </Typography>
              <CollapsibleTable>
                <TableBody>
                  {course.absences.list?.map((absence, key) => {
                    if (absence.numOfAbsences == 0) return <></>;

                    return (
                      <StyledTableRow key={key}>
                        <StyledTableCell>
                          <Typography fontSize={"1rem"}>
                            {formatDate(absence.date)}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Typography fontSize={"1rem"}>
                            {absence.numOfAbsences}
                          </Typography>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </CollapsibleTable>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}