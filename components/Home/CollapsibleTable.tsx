import * as React from "react";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

export default function CollapsibleTable({ children }: { children: React.ReactNode }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" sx={{overflowX: "auto"}}>{children}</Table>
    </TableContainer>
  );
}
