import React, { Suspense, useState, Fragment } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

import Planet from "./Planet";
import PlanetInfo from "./PlanetInfo/PlanetInfo";
import PlanetsList from "./PlanetsList/PlanetsList";

const SolarSystem = ({ planets }) => {
    const [chosenPlanetFromMenu, setChosenPlanetFromMenu] = useState(null);
    const randomColor = () => {
        const randomHex = Math.floor(Math.random() * 16777215).toString(16);
        return "#" + randomHex;
    };

    return (
        <Fragment>
            <PlanetsList
                chosenPlanet={(chosenPlanet) =>
                    setChosenPlanetFromMenu(chosenPlanet)
                }
                planets={planets}
            />
            {chosenPlanetFromMenu && (
                <PlanetInfo planet={chosenPlanetFromMenu} />
            )}
            <Canvas camera={{ position: [0, 0, 500], fov: 50 }}>
                <OrbitControls enableZoom={false} enablePan={false} />

                <Stars radius={600} count={30000} />

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
                            isChosen={
                                planet?.englishName ===
                                chosenPlanetFromMenu?.englishName
                            }
                        />
                    ))}
                </Suspense>
            </Canvas>
        </Fragment>
    );
};

export default SolarSystem;
