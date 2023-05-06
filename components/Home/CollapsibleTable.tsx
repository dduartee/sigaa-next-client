import { TableContainer, Paper, Table } from "@mui/material";
import React from "react";

export default function CollapsibleTable({ children }: { children: React.ReactNode }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" sx={{
        overflowX: "auto",
        }}>{children}</Table>
    </TableContainer>
  );
}
