import React, { Suspense } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

import Sun from "./Sun";
import Planet from "./Planet";

const SolarSystem = () => {
    return (
        <Canvas>
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
                <Stars />
                <Sun position={[0, 0, 0]} />
                <Planet position={[5, 0, 0]} color="blue" radius={0.5} />
                <Planet position={[8, 0, 0]} color="red" radius={0.3} />
            </Suspense>
        </Canvas>
    );
};

export default SolarSystem;
