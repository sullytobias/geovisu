import { Canvas } from "react-three-fiber";
import { OrbitControls, Line } from "@react-three/drei";
import countriesGeojson from "./geo.json";

const CountryComponent = ({ country }) => {
    const isMulti = country.geometry.type === "MultiPolygon";

    const lines = () => {
        if (isMulti) {
            const coordinates = country.geometry.coordinates.map(
                (polygonCoords) =>
                    polygonCoords[0].map(([lon, lat]) => [lon, lat, 0])
            );
            return coordinates;
        } else {
            return [
                country.geometry.coordinates[0].map(([lon, lat]) => [
                    lon,
                    lat,
                    0,
                ]),
            ];
        }
    };

    const closedLines = lines().map((polygon) => {
        if (
            polygon.length > 1 &&
            (polygon[0][0] !== polygon[polygon.length - 1][0] ||
                polygon[0][1] !== polygon[polygon.length - 1][1])
        ) {
            polygon.push([polygon[0][0], polygon[0][1], 0]);
        }
        return polygon;
    });

    return (
        <>
            {closedLines.map((countryLine, index) => (
                <Line
                    key={index}
                    points={countryLine}
                    color="white"
                    lineWidth={1}
                />
            ))}
        </>
    );
};

const Map3D = () => {
    return (
        <Canvas>
            <OrbitControls />
            {countriesGeojson.features.map((country, index) => (
                <CountryComponent key={index} country={country} />
            ))}
        </Canvas>
    );
};

export default Map3D;
