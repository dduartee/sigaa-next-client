import * as React from "react";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

export default function CollapsibleTable({ children }: { children: React.ReactNode }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" sx={{overflowX: "auto"}}>{children}</Table>
    </TableContainer>
  );
}
