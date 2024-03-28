import React from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";

import { Shape, ExtrudeGeometry, Vector2 } from "three";

import countriesGeojson from "./geo.json";

const CountryComponent = ({ country, color, onClick }) => {
    const isMulti = country.geometry.type === "MultiPolygon";

    const createShapeGeometries = () => {
        const geometries = [];
        const polygons = isMulti
            ? country.geometry.coordinates
            : [country.geometry.coordinates];

        polygons.forEach((polygonGroup) => {
            polygonGroup.forEach((polygon) => {
                const shape = new Shape();

                if (
                    polygon.length > 1 &&
                    (polygon[0][0] !== polygon[polygon.length - 1][0] ||
                        polygon[0][1] !== polygon[polygon.length - 1][1])
                ) {
                    polygon.push([polygon[0][0], polygon[0][1], 0]);
                }

                const exterior = polygon.map(
                    ([lon, lat]) => new Vector2(lon, lat)
                );

                shape.moveTo(exterior[0].x, exterior[0].y);

                for (let i = 1; i < exterior.length; i++) {
                    shape.lineTo(exterior[i].x, exterior[i].y);
                }

                const extrudeSettings = { depth: 1, bevelEnabled: false };
                const geometry = new ExtrudeGeometry(shape, extrudeSettings);

                geometries.push(geometry);
            });
        });

        return geometries;
    };

    const handleCountryClick = () => {
        console.log(country.properties.CNTR_NAME);
    };

    return (
        <group>
            {createShapeGeometries().map((geometry, index) => (
                <mesh
                    key={index}
                    onClick={onClick ? handleCountryClick : undefined}
                    geometry={geometry}
                >
                    <meshStandardMaterial color={color} />
                </mesh>
            ))}
        </group>
    );
};

const Map3D = () => {
    return (
        <Canvas camera={{ position: [0, 0, 200] }}>
            <OrbitControls />
            <ambientLight />

            {countriesGeojson.features.map((country, index) => (
                <CountryComponent
                    key={index}
                    country={country}
                    color={`hsl(${index * 20}, 70%, 50%)`}
                    onClick
                />
            ))}
        </Canvas>
    );
};

export default Map3D;
