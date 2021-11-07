import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function AccordionCourse({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <Accordion sx={{marginBottom: "1rem", border: 0}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon color="primary" />}
        color="primary"
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
