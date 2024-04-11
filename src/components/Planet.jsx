import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";

const Planet = ({
    position,
    radius,
    sideralOrbit,
    name,
    rotationPeriod,
    isChosen,
}) => {
    const planetRef = useRef();
    const [planetTexture, setPlanetTexture] = useState(null);
    const { camera } = useThree();

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

            planetRef.current.rotation.y =
                ((elapsedTime * Math.PI * 2) / rotationPeriod) * 5;

            if (isChosen) {
                const targetX = newX;
                const targetZ = newZ + 10 + radius * 10;

                camera.position.set(targetX, position[1] + 2, targetZ);

                camera.lookAt(newX, position[1], newZ);
            }
        } else
            planetRef.current.rotation.y =
                ((elapsedTime * 2 * Math.PI) / 648) * 5;
    });

    return (
        <mesh position={position} ref={planetRef}>
            <sphereGeometry args={[radius, 64, 64]} />
            {planetTexture && <meshBasicMaterial map={planetTexture} />}
        </mesh>
    );
};

export default Planet;
