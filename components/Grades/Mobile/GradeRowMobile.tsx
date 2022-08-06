import React, { useEffect } from "react";
import {
  Box, Collapse,
  IconButton, TableBody, Typography
} from "@material-ui/core";
import CollapsibleTable from "@components/Home/CollapsibleTable";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";
import { StyledTableRow, StyledTableCell } from "../Content";
import { GradeGroup, SumOfGrades, WeightedAverage } from "@types";

export function GradeRowMobile(props: { grades: GradeGroup[]; gradesIndex: string[]; index: string; }) {
  const { grades, index } = props;
  const [subGrade, setSubGrade] = React.useState(false);
  const [open, setOpen] = React.useState<boolean>();

  useEffect(() => {
    grades.map((gradeGroup) => {
      if (gradeGroup.subGrades?.length !== 0 && gradeGroup.name === index)
        setSubGrade(true);
    });
  }, [grades, index]);
  const gradeGroup = grades?.find(
    (gradeGroup) => gradeGroup.name === index
  );
  const hideGradeGroup = (!gradeGroup?.value || (gradeGroup?.subGrades?.length === 0 && gradeGroup.type !== "only-average")) ? grades.indexOf(gradeGroup as GradeGroup) !== 0 : false;
  if (hideGradeGroup) return null;
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
  function GradeRow() {
    return
  }
  return (
    <>
      <StyledTableRow>
        <StyledTableCell>
          <Box width={"1rem"}>
            {subGrade ? (
              <IconButton size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            ) : (
              <IconButton size="small" onClick={() => setOpen(!open)} />
            )}
          </Box>
        </StyledTableCell>
        <StyledTableCell>{index}</StyledTableCell>
        <StyledTableCell align="center">
          <span style={{ fontSize: "1.0rem" }}>
            {gradeGroup?.value !== undefined ? gradeGroup.value.toPrecision(2) : "-"}
          </span>
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
          colSpan={10}
        >
          <Collapse in={open && subGrade} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, mb: 3 }}>
              <Typography variant="caption" gutterBottom component="div">
                Notas {gradeGroup?.type === "only-average" ? "da média" : (gradeGroup?.type === "sum-of-grades" ? "da soma" : "da média ponderada")}
              </Typography>
              <CollapsibleTable>
                <TableBody>
                  {gradeGroup?.subGrades.map((grade, key) => {
                      if (grade.value === undefined) return <></>;
                      return (
                        <StyledTableRow key={key}>
                          <StyledTableCell>
                            <Typography fontSize={".9rem"}>
                              {grade.name}
                              <Typography variant="caption" style={{
                                lineBreak: "loose",
                                whiteSpace: "nowrap"
                              }}>{gradeGroup.type === "weighted-average" ? ` (Peso ${weights[key]})` : null}
                                {gradeGroup.type === "sum-of-grades" ? ` (Máx ${maxValues[key]})` : null}</Typography>
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Typography fontSize={"1rem"}>
                              {grade.value !== undefined ? grade?.value?.toPrecision(2) : "-"}
                            </Typography>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })
                  }
                </TableBody>
              </CollapsibleTable>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}
