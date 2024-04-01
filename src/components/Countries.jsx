import { GeoJsonGeometry } from "three-geojson-geometry";

import geoJson from "../resources/geo.json";

const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const Country = ({ color, geometry, population }) => {
    return (
        <lineSegments geometry={new GeoJsonGeometry(geometry, 1)}>
            <lineBasicMaterial color={color} />
        </lineSegments>
    );
};

const Countries = () => {
    return (
        <group>
            {geoJson.features.map((data, index) => {
                const { geometry, properties } = data;

                const countryColor = getRandomColor();

                const population = properties.pop_est || "Unknown";

                return (
                    <Country
                        key={index}
                        color={countryColor}
                        geometry={geometry}
                        population={population}
                    />
                );
            })}
        </group>
    );
};

export default Countries;
