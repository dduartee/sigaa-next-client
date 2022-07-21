import React, { useEffect } from "react";
import { Bond, Course } from "@types";
import TableCell, { tableCellClasses } from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { styled } from "@material-ui/core/styles";
import {
  TableContainer,
  useMediaQuery,
} from "@material-ui/core";
import { DesktopTable } from "./Desktop/DesktopTable";
import { MobileTable } from "./Mobile/MobileTable";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    //backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
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
function getIndex(bond: Bond) {
  const gradesIndex: string[] = [];
  bond.courses?.map((course) =>
    course.grades?.map((gradeGroup) => {
      const exists = gradesIndex.includes(gradeGroup.name);
      if (!exists) gradesIndex.push(gradeGroup.name);
    })
  );
  return gradesIndex;
}
export default function Grades({
  bond,
  partialLoading,
}: {
  bond: Bond | null
  partialLoading: boolean;
}) {
  const [index, setIndex] = React.useState<string[]>([]);
  const [coursesByPeriod, setCoursesByPeriod] = React.useState<
    Map<string, Course[]>
  >(new Map<string, Course[]>());
  const [periods, setPeriods] = React.useState<string[]>([]);
  useEffect(() => {
    if (bond?.courses) {
      setIndex(getIndex(bond));
      setCoursesByPeriod(groupBy(bond.courses, (course) => course.period));
    }
  }, [bond]);
  useEffect(() => {
    setPeriods(Array.from(coursesByPeriod.keys()));
  }, [coursesByPeriod]);
  const isMobileDevice = useMediaQuery("(max-width:900px)");
  return (
    <React.Fragment>
      {bond ? (
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
