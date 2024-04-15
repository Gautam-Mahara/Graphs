import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function PieChart() {
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
                    const relevance = entry.relevance || 0;
                    const likelihood = entry.likelihood || 0;

                    // Calculate total intensity and relevance for each country
                    if (!countriesData[country]) {
                        countriesData[country] = {
                            intensity: intensity,
                            relevance: relevance,
                            likelihood: likelihood,
                        };
                    } else {
                        countriesData[country].intensity += intensity;
                        countriesData[country].relevance += relevance;
                        countriesData[country].likelihood += likelihood;

                    }
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
        <div className="">

            <select onChange={(e) => handleCountrySelect(e.target.value)}>
                {Object.keys(countriesData).map(country => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </select>
            <div className="chart-container">

            {selectedCountry && (
                <Pie
                data={{
                    labels: ['Intensity', 'Relevance','Likelihood'],
                    datasets: [{
                        data: [countriesData[selectedCountry].intensity, countriesData[selectedCountry].relevance, countriesData[selectedCountry].likelihood]
                        ,backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                        ],
                    }]
                    }}
                    />
                )}
                </div>
                </div>
        </>
    );
}
