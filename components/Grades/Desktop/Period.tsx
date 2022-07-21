import React from "react";
import { Course } from "@types";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import {
  Box, Collapse,
  IconButton, Typography
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import CollapsibleTable from "@components/Home/CollapsibleTable";
import { StyledTableRow, StyledTableCell } from "../Content";
import { CourseRow } from "./CourseRow";

export function Period({
  period, coursesByPeriod, gradesIndex,
}: {
  period: string;
  coursesByPeriod: Map<string, Course[]>;
  gradesIndex: string[];
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
                      key={key} />
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

