import Particles from "react-tsparticles";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@emotion/react";
import { Theme } from "@material-ui/system";
const useStyles = makeStyles({
  particles: {
    "& div": {
      height: "100%",
    },
  },
});

export default function Particulas({
  disable,
}: {
  disable: boolean;
}): JSX.Element {
  const styles = useStyles();
  const theme = useTheme() as Theme;
  
  return (
    <div style={{ width: "100%", height: "100%" }} className={styles.particles}>
      {disable ? (
        <></>
      ) : (
        <Particles
          style={{ height: "100%" }}
          options={{
            background: {
              color: {
                value: "#212121",
              },
            },
            fpsLimit: 45,
            interactivity: {
              detectsOn: "window",
              events: {
                onClick: {
                  enable: true,
                  mode: "repulse",
                },
                onHover: {
                  enable: true,
                  mode: "grab",
                  parallax: {
                    enable: true,
                    smooth: 100,
                  },
                },
                resize: true,
              },
              modes: {
                grab: {
                  distance: 200,
                  lineLinked: {
                    blink: true,
                    color: theme.palette.primary["100"],
                    consent: true,
                    opacity: 1,
                  },
                },
                repulse: {
                  distance: 250,
                  duration: 2,
                },
              },
            },
            particles: {
              color: {
                value: theme.palette.primary["200"],
              },
              links: {
                color: theme.palette.primary.main,
                distance: 150,
                enable: true,
                opacity: 1,
                width: 1,
              },
              collisions: {
                enable: true,
                mode: "bounce",
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 3,
                straight: true,
              },
              number: {
                density: {
                  enable: true,
                  value_area: 100,
                },
                value: 5,
              },
              opacity: {
                value: 1,
              },
              shape: {
                type: "circle",
              },
              size: {
                random: true,
                value: 7,
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </div>
  );
}
