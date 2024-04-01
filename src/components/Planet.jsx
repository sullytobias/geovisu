const Planet = ({ color, radius, ...props }) => {
    return (
        <mesh {...props}>
            <sphereGeometry args={[radius, 32, 32]} />
            <meshBasicMaterial color={color} />
        </mesh>
    );
};

export default Planet;
