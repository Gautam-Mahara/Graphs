import React, { useState, useEffect } from 'react';
// import './App.css';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function Intensity() {
    const [countries, setCountries] = useState([]);
    const [intensities, setIntensities] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("intensity");
    
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:5000/data");
        const data = await response.json();

        if (Array.isArray(data)) {
          const countryMetricsMap = {};
          const regionMap = {};
          const dateMap = {};

          data.forEach(item => {
            const country = item.country || "Unspecified"; // Set country as "Unspecified" if not provided
            const intensity = item.intensity || 0;
            const regions = item.region || "Unspecified";
            const relevences = item.relevance || "Unspecified";
            const likelihoods = item.likelihood || "Unspecified";
            if (!countryMetricsMap[country] && country !== "Unspecified") {
              countryMetricsMap[country] = {
                intensity: 0,
                relevance: 0,
                likelihood: 0
              };
            }
            if (country !== "Unspecified") {
              countryMetricsMap[country].intensity += intensity;
              countryMetricsMap[country].relevance += relevences;
              countryMetricsMap[country].likelihood += likelihoods;
            }
          });

          // Extract countries and intensities from the map
          const countriesData = Object.keys(countryMetricsMap);
          const intensitiesData = Object.values(countryMetricsMap);

          setCountries(countriesData);
          setIntensities(intensitiesData);
        } else {
          console.error('Data received from the server is not an array.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);
  const getColor = (index) => {
    const colors = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)'
      // Add more colors as needed
    ];

    return colors[index % colors.length];
  };
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };
  const filterData = async () => {
    switch (selectedFilter) {
      case 'intensity':
        return intensities.map(countryData => countryData.intensity);
      case 'relevance':
        return intensities.map(countryData => countryData.relevance);
      case 'likelihood':
        return intensities.map(countryData => countryData.likelihood);
      default:
        return intensities.map(countryData => countryData.intensity, countryData => countryData.relevance, countryData => countryData.likelihood);
    }
  }

//   console.log(selectedFilter);
  return (
    <div className="App">
      <div className="">
        <select value={selectedFilter} onChange={handleFilterChange}>
          <option value="intensity">Intensity</option>
          <option value="relevance">Relevance</option>
          <option value="likelihood">Likelihood</option>
        </select>
        <Bar className='centre-item bar'
          data={{
            labels: countries,
            datasets: [
              {
                label: 'intensity',
                data: intensities.map(countryData => countryData.intensity),
              },
              {
                label: 'relevance',
                data: intensities.map(countryData => countryData.relevance),
              },
              {
                label: 'likelihood',
                data: intensities.map(countryData => countryData.likelihood),
              }
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }}
        />
      </div>
    </div>
  );
};
export default Intensity;