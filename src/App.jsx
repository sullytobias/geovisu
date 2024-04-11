import React, { useEffect, useState } from "react";

import SolarSystem from "./components/SolarSystem";

import "./App.scss";
import Loader from "./components/Loader/Loader";

const App = () => {
    const [solarSystemData, setSolarSystemData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlanets = fetch(
            "https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,eq,true&order=semimajorAxis"
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch planet data");
                }
                return response.json();
            })
            .catch((error) => {
                console.error("Error fetching planet data:", error);
                throw error;
            });

        const fetchSun = fetch(
            "https://api.le-systeme-solaire.net/rest/bodies?filter[]=englishName,eq,Sun"
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch Sun data");
                }
                return response.json();
            })
            .catch((error) => {
                console.error("Error fetching Sun data:", error);
                throw error;
            });

        Promise.allSettled([fetchPlanets, fetchSun])
            .then((results) => {
                const allResult = [];
                results.map((res) => allResult.push(res.value.bodies));

                setSolarSystemData(allResult.flat());

                setTimeout(() => setLoading(false), 2000);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div className="App">
            {loading ? <Loader /> : <SolarSystem planets={solarSystemData} />}
        </div>
    );
};

export default App;
