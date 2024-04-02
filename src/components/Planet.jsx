import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";

const Planet = ({
    position,
    color,
    radius,
    sideralOrbit,
    name,
    rotationPeriod,
}) => {
    const planetRef = useRef();
    const [planetTexture, setPlanetTexture] = useState(null);

    useEffect(() => {
        const texturePath = `assets/${name.toLowerCase()}_texture.jpg`;

        const textureLoader = new TextureLoader();
        textureLoader.load(texturePath, setPlanetTexture);
    }, [name]);

    const initialAngle =
        2 * Math.PI * ((Date.now() % sideralOrbit) / sideralOrbit);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();

        if (planetRef.current && initialAngle) {
            const rotationAngle =
                ((elapsedTime * 2 * Math.PI) / sideralOrbit) * 5;
            const rotation = initialAngle + rotationAngle * 5;

            const newX = Math.cos(rotation) * position[0];
            const newZ = Math.sin(rotation) * position[0];

            planetRef.current.position.x = newX;
            planetRef.current.position.z = newZ;

            planetRef.current.rotation.y = rotationAngle * rotationPeriod;
        } else
            planetRef.current.rotation.y = (elapsedTime * 2 * Math.PI) / 7.25;
    });

    return (
        <mesh position={position} ref={planetRef}>
            <sphereGeometry args={[radius, 32, 32]} />
            {planetTexture && <meshBasicMaterial map={planetTexture} />}
        </mesh>
    );
};

export default Planet;
