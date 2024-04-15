import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
// import GetData from "./components/getdata";
// import getColor from "./color";
Chart.register(...registerables);

export default function LineChart() {
    const [countriesData, setCountriesData] = useState({});
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/data");
                const data = await response.json();
                
                const countriesData = {};
                data.forEach(entry => {
                    const country = entry.country || "Unspecified";
                    const intensity = entry.intensity || 0;
                    if (!countriesData[country]) {
                        countriesData[country] = [];
                    }
                    countriesData[country].push(intensity);
                });

                setCountriesData(countriesData);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
    };

    return (
        <>
            <select onChange={(e) => handleCountrySelect(e.target.value)}>
                <option value="">Select a country</option>
                {Object.keys(countriesData).map(country => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </select>
            {selectedCountry && (
                <Line
                    data={{
                        labels: [],
                        datasets: [{
                            label: selectedCountry,
                            data: countriesData[selectedCountry],
                            // backgroundColor: getColor(countries),
                        }]
                    }}
                />
            )}
        </>
    );
}
