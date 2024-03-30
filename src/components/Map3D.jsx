import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";

import { Country } from "./Country";

import countriesGeojson from "../resources/geo.json";

const Map3D = () => {
    return (
        <Canvas camera={{ position: [0, 0, 200] }}>
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />

            {countriesGeojson.features.map((country, index) => (
                <Country key={index} country={country} onClick />
            ))}
        </Canvas>
    );
};

export default Map3D;
