import { GetServerSidePropsContext } from "next";
import React from "react";
export default function CodePage({
  registration,
  code,
}: {
  registration: string;
  code: string;
}) {
  return <>{code}</>;
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: context.query,
  };
}
/**
 * <AccordionDetails>
        <Box component={Paper}>
          {latestNews?.content ? (
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
              onChange={() => loadContent()}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                color="primary"
              >
                <Typography>Última notícia: {latestNews.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {latestNews.content.split("\n").map((item, key) => {
                  return <Typography key={key} style={{
                    marginBottom: ".3rem",
                    display: "block",
                  }}>{item}<br /></Typography>
                })}
              </AccordionDetails>

            </Accordion>
          ) : (
            <Box display={"flex"} justifyContent={"center"} borderRadius={"10px"} padding={1} component={Paper} elevation={2}>
              <CircularProgress sx={{ margin: "1rem" }} />
            </Box>
          )}
        </Box>
      </AccordionDetails>
 */