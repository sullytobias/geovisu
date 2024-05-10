import React, { useRef } from "react";

const SunLight = ({ position }) => {
    const pointLightRef = useRef();

    return (
        <>
            <ambientLight intensity={0.2} />
            <pointLight
                intensity={200000}
                ref={pointLightRef}
                position={[0, 0, 0]}
            />
        </>
    );
};

export default SunLight;
