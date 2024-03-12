import {FC, useEffect, useState} from 'react';

export const WeatherDisplay: FC = () => {
    const [temperature, setTemperature] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            const apiUrl = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=32.067624&lon=34.776054`;

            try {
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`Weather api Error: ${response.status}`);
                }

                const data = await response.json();
                const currentTemperature = data.properties.timeseries[0].data.instant.details.air_temperature;
                setTemperature(currentTemperature);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWeather();
    }, []);

    return (
        <div>
            {isLoading ? (
                <p>Loading weather data...</p>
            ) : (
                <span>{temperature}°C</span>
            )}
        </div>
    );
};