import { useState } from "react";

import { createShape } from "../utils/createShape";

import countriesDatajson from "../resources/countries.json";

const maxPopulation = Math.max(
    ...countriesDatajson.map((country) => country?.population)
);

export const Country = ({ country, onClick }) => {
    const [hovered, setHovered] = useState(false);

    const currentCountry = countriesDatajson.find(
        (c) => c.cca3 === country.properties.ISO3_CODE
    );

    const population = currentCountry?.population || 0;
    const intensity =
        Math.log10(population + 1) / Math.log10(maxPopulation + 1);
    const color = `hsl(220, 100%, ${100 - intensity * 60}%)`;

    return createShape(country).map((geometry, index) => (
        <mesh
            key={index}
            geometry={geometry}
            onPointerOver={(e) => {
                setHovered(true);
            }}
            onPointerOut={(e) => {
                setHovered(false);
            }}
            scale={hovered ? [1, 1, 2] : [1, 1, 1]}
        >
            <meshBasicMaterial
                transparent={true}
                color={!hovered ? color : "white"}
            />
        </mesh>
    ));
};
