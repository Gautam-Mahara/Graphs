import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const DistributionPieChart = ({ selectedFilter }) => {
    const [data, setData] = useState({});
    const [filters, setFilters] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/data");
                const entries = await response.json();

                // Extract unique values for the selected filter
                const uniqueValues = [...new Set(entries.map(entry => entry[selectedFilter]))];
                setFilters(uniqueValues);

                const filteredData = {};

                entries.forEach(entry => {
                    if (entry[selectedFilter] === selectedValue) {
                        // Intensity
                        if (entry.intensity) {
                            filteredData["Intensity"] = (filteredData["Intensity"] || 0) + entry.intensity;
                        }
                        // Relevance
                        if (entry.relevance) {
                            filteredData["Relevance"] = (filteredData["Relevance"] || 0) + entry.relevance;
                        }
                        // Likelihood
                        if (entry.likelihood) {
                            filteredData["Likelihood"] = (filteredData["Likelihood"] || 0) + entry.likelihood;
                        }
                    }
                });

                setData(filteredData);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedValue, selectedFilter]);

    return (
        <div>
            <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                <option value="">Select a {selectedFilter}</option>
                {filters.map(value => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
            <div>
                <h2>Distribution based on Intensity, Relevance, and Likelihood</h2>
                <Line
                    data={{
                        labels: Object.keys(data),
                        datasets: [{
                            data: Object.values(data),
                            borderColor: 'rgba(75, 192, 192, 1)', // Change the line color
                            backgroundColor: 'rgba(75, 192, 192, 0.2)', 
                        }]
                    }}
                />
            </div>
        </div>
    );
};

export default function TriplePieCharts() {
    return (
        <div className="flex">
            <div className="chart-container">
                <h2>Select a sector</h2>
                <DistributionPieChart selectedFilter="sector" />
            </div>
            <div className="chart-container">
                <h2>Select a topic</h2>
                <DistributionPieChart selectedFilter="topic" />
            </div>
            <div className="chart-container ">
                <h2>Select a continent</h2>
                <DistributionPieChart selectedFilter="region" />
            </div>
        </div>
    );
}
