import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Planet from "./Planet";

const SolarSystem = ({ planets }) => {
    const randomColor = () => {
        const randomHex = Math.floor(Math.random() * 16777215).toString(16);
        return "#" + randomHex;
    };

    return (
        <Canvas camera={{ position: [0, 0, 250], fov: 100 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Stars radius={400} count={10000} />
            <Suspense fallback={null}>
                {planets.map((planet, index) => (
                    <Planet
                        key={index}
                        position={
                            planet.englishName === "Sun"
                                ? [0, 0, 0]
                                : [
                                      planet.semimajorAxis / 8000000 +
                                          80 * (index + 1),
                                      0,
                                      0,
                                  ]
                        }
                        color={
                            planet.englishName === "Sun"
                                ? "yellow"
                                : randomColor()
                        }
                        radius={planet.meanRadius / 10000}
                        sideralOrbit={planet.sideralOrbit}
                        rotationPeriod={planet.sideralRotation}
                        name={planet.englishName}
                    />
                ))}
            </Suspense>
        </Canvas>
    );
};

export default SolarSystem;
