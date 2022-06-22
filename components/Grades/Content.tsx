import React, { useEffect } from "react";
import { Bond, Course } from "@types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell, { tableCellClasses } from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { styled } from "@material-ui/core/styles";
import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  TableContainer,
  Typography,
} from "@material-ui/core";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@material-ui/icons";
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
function groupBy<K, V>(array: V[], grouper: (item: V) => K) {
  return array.reduce((store, item) => {
    const key = grouper(item);
    if (!store.has(key)) {
      store.set(key, [item]);
    } else {
      store.get(key)?.push(item);
    }
    return store;
  }, new Map<K, V[]>());
}
function formatGradesIndex(bond: Bond) {
  const gradesIndex: string[] = [];
  bond.courses?.map((course, key) =>
    course.grades?.map((gradeGroup) => {
      const exists = gradesIndex.includes(gradeGroup.name);
      if (!exists) gradesIndex.push(gradeGroup.name);
    })
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
  bond,
  partialLoading,
}: {
  bond: Bond;
  partialLoading: boolean;
}) {
  const [gradesIndex, setGradesIndex] = React.useState<string[]>([]);
  const [coursesByPeriod, setCoursesByPeriod] = React.useState<
    Map<string, Course[]>
  >(new Map<string, Course[]>());
  const [periods, setPeriods] = React.useState<string[]>([]);
  useEffect(() => {
    setGradesIndex(formatGradesIndex(bond));
    setCoursesByPeriod(groupBy(bond.courses, (course) => course.period));
  }, [bond]);
  useEffect(() => {
    for (const period of coursesByPeriod.keys()) {
      setPeriods((prev) => [...prev, period]);
    }
  }, [coursesByPeriod]);
  return (
    <React.Fragment>
      <TableContainer>
        <CollapsibleTable>
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
            {periods.map((period, key) => (
              <Period
                period={period}
                program={bond.program}
                key={key}
                coursesByPeriod={coursesByPeriod}
                gradesIndex={gradesIndex}
              />
            ))}
          </TableBody>
        </CollapsibleTable>
      </TableContainer>

      <Box display={"flex"} justifyContent={"center"}>
        {partialLoading ? (
          <CircularProgress style={{ margin: "1rem" }} />
        ) : (
          <p></p>
        )}
      </Box>
    </React.Fragment>
  );
}
function Period({
  period,
  coursesByPeriod,
  gradesIndex,
  program,
}: {
  period: string;
  coursesByPeriod: Map<string, Course[]>;
  gradesIndex: string[];
  program: string;
}) {
  const courses = coursesByPeriod.get(period) ?? [];
  const [openPeriod, setOpenPeriod] = React.useState<boolean>(true);
  return (
    <>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell>
          <IconButton size="medium" onClick={() => setOpenPeriod(!openPeriod)}>
            {openPeriod ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell>
          <Typography>{period}</Typography>
        </StyledTableCell>
        {gradesIndex.map((_, key) => (
          <StyledTableCell key={key} />
        ))}
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: 0, border: 0 }}
          colSpan={10}
        >
          <Collapse in={openPeriod} timeout="auto" unmountOnExit>
            <Box m={2}>
              <CollapsibleTable>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell />
                    <StyledTableCell>Matéria</StyledTableCell>
                    {gradesIndex.map((index, key) => (
                      <StyledTableCell align="center" key={key}>
                        {index}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {courses?.map((course, key) => (
                    <CourseRow
                      course={course}
                      gradesIndex={gradesIndex}
                      key={key}
                    />
                  ))}
                </TableBody>
              </CollapsibleTable>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}
function CourseRow(props: { course: Course; gradesIndex: string[] }) {
  const { course, gradesIndex } = props;
  const [subGrade, setSubGrade] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    course.grades?.map((gradeGroup) => {
      if (gradeGroup.grades) setSubGrade(true);
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
                  <StyledTableRow >
                    {course?.grades?.map((gradeGroup, key) =>
                      gradeGroup.grades?.map((grade, key) => {
                        return (
                          <StyledTableCell key={key}>
                            <Typography fontSize={".9rem"}>
                              {grade?.name}
                            </Typography>
                          </StyledTableCell>
                        );
                      })
                    )}
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    {course?.grades?.map((gradeGroup, key) =>
                      gradeGroup.grades?.map((grade, key) => (
                        <StyledTableCell key={key}>
                          {grade.value?.toPrecision(2)}
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
