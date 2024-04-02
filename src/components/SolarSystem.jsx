import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Planet from "./Planet";

const SolarSystem = ({ planets }) => {
    return (
        <Canvas camera={{ position: [0, 0, 1000] }}>
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Stars radius={400} />
            <Suspense fallback={null}>
                {planets.map((planet, index) => {
                    console.log(planet.id, planet.semimajorAxis);
                    return (
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
                            color="red"
                            radius={planet.meanRadius / 10000}
                        />
                    );
                })}
            </Suspense>
        </Canvas>
    );
};

export default SolarSystem;
