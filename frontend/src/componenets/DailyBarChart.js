import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function SimpleCharts({data}) {
    const creditSum = data.filter((ele) => ele.type === 'credit').reduce((acc, ele)=>{return acc + ele.amount}, 0);
    const debitSum = data.filter((ele) => ele.type === 'debit').reduce((acc, ele)=>{return acc + ele.amount}, 0);
 
  return (
    <BarChart
      xAxis={[
        {
          id: 'barCategories',
          data: ['credit', 'debit'],
          scaleType: 'band',
        },
      ]}
      series={[
        {
          data: [creditSum, debitSum],
        },
      ]}
      width={500}
      height={300}
    />
  );
}
