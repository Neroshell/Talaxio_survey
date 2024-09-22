// BarChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div>
      <Bar data={data} options={{ responsive: true }} />
    </div>
  );
};

export default BarChart;
