import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, Legend, registerables } from "chart.js";
import '../App.css';
Chart.register(...registerables);

export default function DistributionPieCharts() {
    const [data, setData] = useState({
        topics: {},
        sectors: {},
        regions: {},
        countries: {}
    });
    const [selectedFilter, setSelectedFilter] = useState("topics");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/data");
                const entries = await response.json();

                const topics = {};
                const sectors = {};
                const regions = {};
                const countries = {};

                entries.forEach(entry => {
                    // Topics
                    if (entry.topic) {
                        topics[entry.topic] = (topics[entry.topic] || 0) + 1;
                    }
                    // Sectors
                    if (entry.sector) {
                        sectors[entry.sector] = (sectors[entry.sector] || 0) + 1;
                    }
                    // Regions
                    if (entry.region) {
                        regions[entry.region] = (regions[entry.region] || 0) + 1;
                    }
                    // Countries
                    if (entry.country) {
                        countries[entry.country] = (countries[entry.country] || 0) + 1;
                    }
                });

                setData({
                    topics: topics,
                    sectors: sectors,
                    regions: regions,
                    countries: countries
                });
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
    };

    return (

        <div className="">
          

                <select value={selectedFilter} onChange={handleFilterChange} >
                    <option value="topics">Topics Distribution </option>
                    <option value="sectors">Sectors Distribution</option>
                    <option value="regions">Regions Distribution</option>
                    <option value="countries">Countries Distribution</option>
                </select>

         
            {selectedFilter === "topics" && (
                
                <div className="chart-container">
                    <h2>Topics Distribution</h2>
                    <PieChart data={data.topics} />
                </div>
            )}
            {selectedFilter === "sectors" && (
                
                <div className="chart-container">
                    <h2>Sectors Distribution</h2>
                    <PieChart data={data.sectors} />
                </div>)}
            {selectedFilter === "regions" && (
                <div className="chart-container">
                    <h2>Regions Distribution</h2>
                    <PieChart data={data.regions} />
                </div>
            )}
            {selectedFilter === "countries" && (
                <div className="chart-container">
                    <h2>Countries Distribution</h2>
                    <PieChart data={data.countries} />
                </div>
            )}
        </div>
    );
}

function PieChart({ data }) {
    return (
        <Pie
            data={{
                labels: Object.keys(data),
                datasets: [{
                    data: Object.values(data),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)'
                    ],
                    borderWidth: 1



                }]
            }}

            options={{
                plugins: {
                    legend: false,
                    tooltip: true,
                },


            }}
        />
    );
}
