import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function AccordionCourse({
  title,
  children,
  loadContent,
}: {
  title: string;
  children: React.ReactNode;
  loadContent: () => void;
}) {
  return (
    <Accordion sx={{
      marginBottom: ".8rem",
      border: 0,
      ":first-of-type": {
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
      },
      borderRadius: "10px",
      "::before": {
        height: "0px"
      }
    }} elevation={2} 
    //onChange={() => loadContent()}
    >
      <AccordionSummary
        //expandIcon={<ExpandMoreIcon />}
        color="primary"
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
