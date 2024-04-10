import "./PlanetInfo.scss";

const PlanetInfo = ({ planet }) => (
    <div className="planet-info-container">
        <h2 className="planet-info-header">{planet.englishName}</h2>
        <div className="planet-info-item">
            <span className="planet-info-label">Revolution:</span>
            <span className="planet-info-value">
                {planet.sideralOrbit.toFixed()} days
            </span>
        </div>
        <div className="planet-info-item">
            <span className="planet-info-label">Rotation:</span>
            <span className="planet-info-value">
                {Math.abs((planet.sideralRotation / 24).toFixed(2))} days
            </span>
        </div>
        <div className="planet-info-item">
            <span className="planet-info-label">Radius:</span>
            <span className="planet-info-value">
                {planet.meanRadius.toFixed()} km
            </span>
        </div>
    </div>
);

export default PlanetInfo;
