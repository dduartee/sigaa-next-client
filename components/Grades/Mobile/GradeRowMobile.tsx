import React, { useEffect } from "react";
import CollapsibleTable from "@components/Home/CollapsibleTable";
import { StyledTableRow, StyledTableCell } from "../Content";
import { GradeGroup, SumOfGrades, WeightedAverage } from "@types";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { Box, IconButton, Collapse, Typography, TableBody } from "@mui/material";

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
  // se a média não for calculada
  if (!gradeGroup) {
    return null;
  } else {
    if (!gradeGroup.value) {
      // se não tiver subnotas e o tipo for somente a média
      if (gradeGroup.subGrades?.length === 0) {
        return null
      } else {
        if (gradeGroup.subGrades?.map((subGrade) => subGrade.value).filter((value) => value !== undefined).length === 0) {
          return null
        }
      }
    }
  }
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
    <>
      <StyledTableRow>
        <StyledTableCell width="1rem">
          <Box width={"1rem"}>
            {subGrade ? (
              <IconButton size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            ) : (
              <IconButton size="small" />
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
                Notas {gradeGroup?.type === "arithmetic-average" ? "da média aritmética" : (gradeGroup?.type === "sum-of-grades" ? "da soma" : "da média ponderada")}
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
