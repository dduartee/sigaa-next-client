import AccordionCourse from "@components/Home/AccordionCourse";
import useTokenHandler from "@hooks/useTokenHandler";
import { Bond, Course, GradeGroup } from "@types";
import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell, { tableCellClasses } from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { styled } from "@material-ui/core/styles";
import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  Typography,
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import CollapsibleTable from "@components/Home/CollapsibleTable";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    //backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    //backgroundColor: theme.palette.primary.main,
    backgroundColor: theme.palette.grey[900],
  },
  width: "100%",

  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function formatGradesIndex(data: Bond[]) {
  const gradesIndex: string[] = [];
  data?.map(({ courses }) =>
    courses?.map((course, key) =>
      course.grades?.map((gradeGroup) => {
        const exists = gradesIndex.includes(gradeGroup.name);
        if (!exists) gradesIndex.push(gradeGroup.name);
      })
    )
  );
  const gradesIndexSorted = [
    ...gradesIndex.sort((a, b) => {
      if (a === "Resultado Final") {
        return 1;
      } else if (b === "Resultado Final") {
        return -1;
      } else if (a === "Recuperação") {
        return 2;
      } else if (b === "Recuperação") {
        return -2;
      } else {
        return a < b ? -1 : 1;
      }
    }),
  ];
  return gradesIndexSorted;
}

export default function Grades({
  data,
  partialLoading,
}: {
  data: Bond[];
  partialLoading: boolean;
}) {
  const gradesIndex = formatGradesIndex(data);

  return (
    <React.Fragment>
      <CollapsibleTable>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell />
            <StyledTableCell>Matéria</StyledTableCell>
            {gradesIndex.map((index) => (
              <StyledTableCell>{index}</StyledTableCell>
            ))}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data?.map(({ courses }) =>
            courses?.map((course, key) => (
              <Row course={course} key={key} gradesIndex={gradesIndex} />
            ))
          )}
        </TableBody>
      </CollapsibleTable>
      {partialLoading ? (
        <CircularProgress style={{ alignSelf: "center", margin: "1rem" }} />
      ) : (
        <p>
          Notas não são atualizadas em tempo real e podem estarem em ordem
          errada
        </p>
      )}
    </React.Fragment>
  );
}

function Row({
  course,
  gradesIndex,
}: {
  course: Course;
  gradesIndex: string[];
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="medium"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {course.title}
        </StyledTableCell>
        {gradesIndex.map((index, key) => {
          let realIndex = course?.grades?.find(
            (gradeGroup) => gradeGroup.name === index
          );
          console.log(realIndex);
          return (
            <StyledTableCell align="left">
              <span style={{fontSize: "1.0rem"}}>{realIndex ? (realIndex?.value)?.toPrecision(2) : " "}</span>
            </StyledTableCell>
          );
        })}
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="caption" gutterBottom component="div">
                Notas
              </Typography>
              <Table>
                <TableHead>
                  <StyledTableRow>
                    {course?.grades?.map((gradeGroup, key) =>
                      gradeGroup.grades?.map((grade, key) => (
                        <StyledTableCell key={key}>
                          {grade?.name}
                        </StyledTableCell>
                      ))
                    )}
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    {course?.grades?.map((gradeGroup, key) =>
                      gradeGroup.grades?.map((grade, key) => (
                        <StyledTableCell key={key}>
                          {(grade.value)?.toPrecision(2)}
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
