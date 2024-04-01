const Sun = (props) => {
    return (
        <mesh {...props}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshBasicMaterial color="yellow" />
        </mesh>
    );
};

export default Sun;
