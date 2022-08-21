import React, { useEffect } from "react";
import { Course, SumOfGrades, WeightedAverage } from "@types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import {
  Box, Collapse,
  IconButton, Typography
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import { StyledTableRow, StyledTableCell } from "../Content";

export function CourseRow(props: { course: Course; gradesIndex: string[]; }) {
  const { course, gradesIndex } = props;
  const [subGrade, setSubGrade] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    course.grades?.map((gradeGroup) => {
      if (gradeGroup.subGrades?.length !== 0)
        setSubGrade(true);
    });
  }, [course.grades]);
  return (
    <>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell>
          {subGrade ? (
            <IconButton size="medium" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          ) : (
            <IconButton size="medium" onClick={() => setOpen(!open)} />
          )}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {course.title}
        </StyledTableCell>
        {gradesIndex.map((index, key) => {
          const gradeGroup = course?.grades?.find(
            (gradeGroup) => gradeGroup.name === index
          );
          return (
            <StyledTableCell align="center" key={key}>
              <span style={{ fontSize: "1.0rem" }}>
                {gradeGroup ? gradeGroup?.value?.toPrecision(2) : " "}
              </span>
            </StyledTableCell>
          );
        })}
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
          colSpan={10}
        >
          <Collapse in={open && subGrade} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="caption" gutterBottom component="div">
                Notas individuais
              </Typography>
              <Table>
                <TableHead>
                  <StyledTableRow>
                    {course?.grades?.map((gradeGroup) => gradeGroup.subGrades?.map((grade, key) => {
                      const weights = [] as number[];
                      if (gradeGroup?.type === "weighted-average") {
                        const subGrades = gradeGroup.subGrades as WeightedAverage[]
                        subGrades.map((subGrade) => weights.push(subGrade.weight))
                      }
                      const maxValues = [] as number[];
                      if (gradeGroup?.type === "sum-of-grades") {
                        const subGrades = gradeGroup.subGrades as SumOfGrades[]
                        subGrades.map((subGrade) => maxValues.push(subGrade.maxValue))
                      }
                      return (
                        <StyledTableCell key={key}>
                          <Typography fontSize={".9rem"}>
                            {grade?.name}
                            <Typography variant="caption" style={{
                              lineBreak: "loose",
                              whiteSpace: "nowrap"
                            }}>{gradeGroup.type === "weighted-average" ? ` (Peso ${weights[key]})` : null}
                              {gradeGroup.type === "sum-of-grades" ? ` (Máx ${maxValues[key]})` : null}</Typography>
                          </Typography>
                        </StyledTableCell>
                      );
                    })
                    )}
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    {course?.grades?.map((gradeGroup) => gradeGroup.subGrades?.map((grade, key) => (
                      <StyledTableCell key={key}>
                        {grade.value !== undefined ? grade.value?.toPrecision(2) : "-"}
                      </StyledTableCell>
                    ))
                    )}
                  </StyledTableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}
