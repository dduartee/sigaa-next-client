import Particles from "react-tsparticles";
import React from "react";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
  particles: {
    "& div": {
      height: "100%",
    },
  },
});
interface IParticles {
  disable: boolean;
  colors: {
    main: string;
    "100": string;
    "200": string;
  };
}
export default function Particulas({
  disable,
  colors
}: IParticles): JSX.Element {
  const styles = useStyles();
  
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
                    color: colors["100"],
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
                value: colors["200"],
              },
              links: {
                color: colors.main,
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
