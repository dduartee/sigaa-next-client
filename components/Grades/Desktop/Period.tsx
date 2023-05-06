import React from "react";
import { Course } from "@types";
import CollapsibleTable from "@components/Home/CollapsibleTable";
import { StyledTableRow, StyledTableCell } from "../Content";
import { CourseRow } from "./CourseRow";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { IconButton, Typography, Collapse, Box, TableHead, TableBody } from "@mui/material";

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

