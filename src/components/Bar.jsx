import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
 // Import your CSS file
 import '../App.css';
Chart.register(...registerables);

export default function DistributionPieChart3() {
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
    }
    return (
        <div className="distribution-container">
            <select className="filter-dropdown" value={selectedFilter} onChange={handleFilterChange}>
                <option value="topics">Topics</option>
                <option value="sectors">Sectors</option>
                <option value="regions">Regions</option>
                <option value="countries">Countries</option>
            </select>
            <div className="chart-container">
                {selectedFilter === "topics" && (
                    <>
                        <h2>Topics Distribution</h2>
                        <PieChart data={data.topics} />
                    </>
                )}
                {selectedFilter === "sectors" && (
                    <>
                        <h2>Sectors Distribution</h2>
                        <PieChart data={data.sectors} />
                    </>
                )}
                {selectedFilter === "regions" && (
                    <>
                        <h2>Regions Distribution</h2>
                        <PieChart data={data.regions} />
                    </>
                )}
                {selectedFilter === "countries" && (
                    <>
                        <h2>Countries Distribution</h2>
                        <PieChart data={data.countries} />
                    </>
                )}
            </div>
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
                }]
            }}

            options={{
                plugins: {
                    legend: false,
                    tooltip: true,
                },
                layout: {
                    padding: 20 // Add padding around the chart
                },
                animation: {
                    animateRotate: true, // Enable rotation animation
                    animateScale: true // Enable scaling animation
                },
            }}
        />
    );
}
