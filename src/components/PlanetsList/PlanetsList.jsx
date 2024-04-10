import { useState } from "react";

import "./PlanetsList.scss";

const PlanetList = ({ planets, chosenPlanet }) => {
    const [isChosen, setIsChosen] = useState(null);

    const chosenHandler = (planet) => {
        setIsChosen(planet);
        chosenPlanet(planet);
    };

    return (
        <div className="planet-list">
            {planets.map(
                (planet, index) =>
                    planet.englishName !== "Sun" && (
                        <div
                            onClick={() => chosenHandler(planet)}
                            className={`planet-item ${
                                isChosen?.englishName === planet?.englishName
                                    ? "is-chosen"
                                    : ""
                            }`}
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
