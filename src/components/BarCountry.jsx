import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

function EntryVisualizer() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/data");
                const data = await response.json();
                console.log("Fetched data:", data); // Log the fetched data
                setEntries(data);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    return (
        <div>
            {entries.map((entry, index) => (
                <EntryChart key={index} data={entry} />
            ))}
        </div>
    );
};

const EntryChart = ({ data }) => {
    const chartData = {
        labels: ['Intensity', 'Relevance', 'Likelihood'],
        datasets: [
            {
                label: 'Values',
                backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                hoverBackgroundColor: ['rgba(75,192,192,0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)'],
                hoverBorderColor: 'rgba(0,0,0,1)',
                data: [data.intensity, data.relevance, data.likelihood]
            }
        ]
    };

    return (
        <div>
            <h2>Entry Values</h2>
            <Bar
                data={chartData}
                options={{
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }}
            />
        </div>
    );
};

export default EntryVisualizer;
