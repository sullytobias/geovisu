import Countries from "./Countries";

const Sphere = () => {
    return (
        <mesh>
            <sphereGeometry args={[1, 32]} />
            <meshPhongMaterial color="#191919" opacity={1} />
            <Countries />
        </mesh>
    );
};

export default Sphere;
