import Particles from "react-tsparticles";
import React, { useEffect } from "react";
import { useTheme } from "@mui/system";
import { NoSsr } from "@mui/material";

interface IParticles {
  disable: boolean;
}
export default function Particulas({
  disable,
}: IParticles): JSX.Element {
  const {palette} = useTheme();
  const [cpuCores, setCpuCores] = React.useState<number>(1);
  useEffect(() => {
    setCpuCores(navigator.hardwareConcurrency || 1);
  }, []);
  return (
    <NoSsr>
      <div style={{ width: "100%", height: "100%" }}>
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
              fpsLimit: cpuCores < 2 ? 45 : 60,
              interactivity: {
                detectsOn: "window",
                events: {
                  onHover: {
                    enable: true,
                    mode: "grab",
                    parallax: {
                      enable: true,
                      force: 5,
                      smooth: 100,
                    }
                  },
                  resize: true,
                },
                modes: {
                  grab: {
                    distance: 200,
                    lineLinked: {
                      blink: true,
                      color: palette.primary["500"],
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
                  value: palette.primary["300"],
                },
                links: {
                  color: palette.primary["900"],
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
                  random: true,
                  speed: 4,
                  straight: true,
                },
                number: {
                  density: {
                    enable: true,
                    value_area: 100,
                  },
                  value: cpuCores < 2 ? 3 : 6,
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
    </NoSsr>
  );
}
