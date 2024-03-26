import React, { useState, useEffect } from "react";
import { Canvas } from "react-three-fiber";

import { Line, OrbitControls } from "@react-three/drei";

import countriesGeojson from "./geo.json";

const Map3D = () => {
    const [countryLines, setCountryLines] = useState([]);

    useEffect(() => {
        const lines = countriesGeojson.features.map((feature) => {
            if (feature.geometry.type === "MultiPolygon") {
                const coordinates = feature.geometry.coordinates.map(
                    (polygonCoords) =>
                        polygonCoords[0].map(([lon, lat]) => [lon, lat, 0])
                );
                return coordinates;
            } else {
                return [
                    feature.geometry.coordinates[0].map(([lon, lat]) => [
                        lon,
                        lat,
                        0,
                    ]),
                ];
            }
        });

        const closedLines = lines.map((country) => {
            return country.map((polygon) => {
                if (
                    polygon.length > 1 &&
                    (polygon[0][0] !== polygon[polygon.length - 1][0] ||
                        polygon[0][1] !== polygon[polygon.length - 1][1])
                ) {
                    polygon.push([polygon[0][0], polygon[0][1], 0]);
                }
                return polygon;
            });
        });

        setCountryLines(closedLines.flat());
    }, []);

    return (
        <Canvas>
            <OrbitControls />

            {countryLines.map((country, index) => (
                <Line
                    key={index}
                    points={country}
                    color="white"
                    lineWidth={1}
                />
            ))}
        </Canvas>
    );
};

export default Map3D;
