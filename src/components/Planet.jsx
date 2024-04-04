import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";

const Planet = ({ position, radius, sideralOrbit, name, rotationPeriod }) => {
    const planetRef = useRef();
    const [planetTexture, setPlanetTexture] = useState(null);
    const [isChosen, setIsChosen] = useState(false);
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

        if (planetRef.current) {
            if (planetRef.current && initialAngle) {
                const rotationAngle =
                    ((elapsedTime * 2 * Math.PI) / sideralOrbit) * 5;
                const rotation = initialAngle + rotationAngle * 5;

                const newX = Math.cos(rotation) * position[0];
                const newZ = Math.sin(rotation) * position[0];

                planetRef.current.position.x = newX;
                planetRef.current.position.z = newZ;

                planetRef.current.rotation.y = rotationAngle * rotationPeriod;

                if (isChosen) {
                    const targetX = newX;
                    const targetZ = newZ + 10 + radius * 10;

                    camera.position.lerp(
                        { x: newX, y: position[1], z: newZ + 10 + radius * 2 },
                        0.02
                    );

                    // Look at the selected planet
                    camera.lookAt(newX, position[1], newZ);
                }
            } else
                planetRef.current.rotation.y =
                    (elapsedTime * 2 * Math.PI) / 7.25;
        }
    });

    const handleClick = () => setIsChosen(true);

    return (
        <mesh position={position} ref={planetRef} onClick={handleClick}>
            <sphereGeometry args={[radius, 32, 32]} />
            {planetTexture && <meshBasicMaterial map={planetTexture} />}
        </mesh>
    );
};

export default Planet;
