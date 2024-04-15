import React, { useState, useEffect } from "react";
import { Scatter } from "react-chartjs-2";
import '../App.css';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const RelationshipVisualization = () => {
    const [entries, setEntries] = useState([]);
    const [xVariable, setXVariable] = useState("intensity");
    const [yVariable, setYVariable] = useState("likelihood");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/data");
                const data = await response.json();
                setEntries(data);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleXVariableChange = (event) => {
        setXVariable(event.target.value);
    };

    const handleYVariableChange = (event) => {
        setYVariable(event.target.value);
    };

    const chartData = {
        datasets: [{
            label: `${xVariable} vs ${yVariable}`,
            data: entries.map(entry => ({ x: entry[xVariable], y: entry[yVariable] })),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(245, 40, 68, 0.8)',
            borderWidth: 1,
        }]
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: xVariable,
                }
            },
            y: {
                title: {
                    display: true,
                    text: yVariable,
                }
            }
        }
    };

    return (
        <div>
            <h2>Relationship Visualization</h2>
            <div className="flex-between">
                <label htmlFor="x-variable">Select X Variable:</label>
                <select id="x-variable" value={xVariable} onChange={handleXVariableChange}>
                    <option value="intensity">Intensity</option>
                    <option value="likelihood">Likelihood</option>
                    <option value="relevance">Relevance</option>
                </select>
            
                <label htmlFor="y-variable">Select Y Variable:</label>
                <select id="y-variable" value={yVariable} onChange={handleYVariableChange}>
                    <option value="intensity">Intensity</option>
                    <option value="likelihood">Likelihood</option>
                    <option value="relevance">Relevance</option>
                </select>
            </div>
            <div className="chart-container">
                <Scatter data={chartData} options={options} />
            </div>
        </div>
    );
};

export default RelationshipVisualization;
