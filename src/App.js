/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './App.css';
import PieChart from './components/bar1';
import Intensity from './components/intensity';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import TrendComparison from './components/CompareTrendLine';
import LineChart from './components/Line';
import RelationshipVisualization from './components/RelationShipVisuals';
import DistributionPieCharts from './components/BarTopic';
import DistributionPieChart3 from './components/Bar';


Chart.register(...registerables);

function App() {
  return <>
    <div className='app'>
      <div className='pie flex box'>
        <DistributionPieCharts className="centre" />
        <DistributionPieChart3 />
      </div>
      <div className=' box'>
        <TrendComparison className="centre" />
      </div>
      <div className='flex box'>
        <PieChart />
      </div>
      <div className='box'>
        <Intensity />

      </div>
      <div className='box'>
        <RelationshipVisualization className="centre" />
      </div>
    </div>
  </>

}

export default App;
