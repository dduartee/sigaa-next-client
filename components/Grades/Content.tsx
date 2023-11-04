import React, { useEffect } from "react";
import { Bond, Course } from "@types";
import { DesktopTable } from "./Desktop/DesktopTable";
import { MobileTable } from "./Mobile/MobileTable";
import { styled, TableCell, tableCellClasses, TableContainer, TableRow, useMediaQuery } from "@mui/material";
import { Theme } from "@mui/system"
import { IBondDTOProps } from "@DTOs/BondDTO";
import { ICourseDTOProps } from "@DTOs/CourseDTO";
export const StyledTableCell = styled(TableCell)(({ theme }: {theme: Theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary['900'],
    //backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.primary.main,
    backgroundColor: theme.palette.grey[900],
  },
  width: "100%",

  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export function groupBy<K, V>(array: V[], grouper: (item: V) => K) {
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
function getIndex(courses: ICourseDTOProps[]) {
  const gradesIndex: string[] = [];
  courses.map((course) =>
    course.grades?.map((gradeGroup) => {
      const exists = gradesIndex.includes(gradeGroup.name);
      if (!exists) gradesIndex.push(gradeGroup.name);
    })
  );
  return gradesIndex;
}
export default function Grades(props: { bond: IBondDTOProps|undefined }) {
  const [index, setIndex] = React.useState<string[]>([]);
  const [coursesByPeriod, setCoursesByPeriod] = React.useState<
    Map<string, ICourseDTOProps[]>
  >(new Map<string, ICourseDTOProps[]>());
  const [periods, setPeriods] = React.useState<string[]>([]);
  useEffect(() => {
    if (props.bond && props.bond.courses && props.bond.courses.length > 0) {
      setIndex(getIndex(props.bond.courses));
      setCoursesByPeriod(groupBy(props.bond.courses, (course) => course.period));
    }
  }, [props.bond]);
  useEffect(() => {
    setPeriods(Array.from(coursesByPeriod.keys()));
  }, [coursesByPeriod]);
  const isMobileDevice = useMediaQuery("(max-width:900px)");
  return (
    <React.Fragment>
      {props.bond && props.bond.courses && props.bond.courses.length > 0 ? (
        <TableContainer>
          {isMobileDevice ? (
            <MobileTable gradesIndex={index} periods={periods} coursesByPeriod={coursesByPeriod} />
          ) : (
            <DesktopTable gradesIndex={index} periods={periods} coursesByPeriod={coursesByPeriod} />
          )}
        </TableContainer>
      ) : null}

    </React.Fragment>
  )
}
