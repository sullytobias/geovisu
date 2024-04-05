import "./PlanetsList.scss";

const PlanetList = ({ planets, chosenPlanet }) => {
    return (
        <div className="planet-list">
            {planets.map(
                (planet, index) =>
                    planet.englishName !== "Sun" && (
                        <div
                            onClick={() => chosenPlanet(planet.englishName)}
                            className="planet-item"
                            key={index}
                        >
                            <span>{planet.englishName}</span>
                        </div>
                    )
            )}
        </div>
    );
};

export default PlanetList;
