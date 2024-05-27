/**
 * @overview
 * Här är graf komponenten som ritar upp grafer baserat på datan som den får in.
 * 
 * @author Viktor Johansson
 * @version 1.0.0
 * @since November, 2023
 */

import React, { useEffect, useRef, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, Legend } from 'recharts';

const Chart = ({ data, dataKey, percentage }) => {
  const chartRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);

  useEffect(() => {
    const updateChart = () => {
      if (chartRef.current) {
        setChartWidth(chartRef.current.offsetWidth);
        setChartHeight(chartRef.current.offsetHeight);
      }
    };

    updateChart();
    window.addEventListener('resize', updateChart);

    return () => {
      window.removeEventListener('resize', updateChart);
    };
  }, []);

  // Modify data to set values above 10 to 10
  const modifiedData = data.map(entry => ({
    ...entry,
    [dataKey]: Math.min(entry[dataKey], 10),
    originalValue: entry[dataKey],  // Set values above 10 to 10
  }));

  // Define custom Y-axis domain to ensure values never go above 10
  const yDomain = [-4, -2, 2, 10]; // Adjust the upper limit to 10

  return (
    <div>
      {data ? (
        <div
          ref={chartRef}
          className={"h-[10rem] sm:h-[10rem] md:h-[15rem] lg:h-[18rem] flex flex-col mr-10"}
          style={{ minWidth: '15rem', minHeight: '10rem' }}
        >
          <LineChart width={chartWidth} height={chartHeight} data={modifiedData} allowDataOverflow={false}>
            <XAxis dataKey="time" ticks={[1, 30, 60]} />

            {/* Use custom domain for Y-axis */}
            <YAxis domain={yDomain} interval={0} ticks={[-4,-2,0,2,4,6, 8]} />

            <Tooltip
              formatter={(value, name, props) => {
                const originalValue = props.payload.originalValue;
                // Display the original value in the tooltip, even if it's capped at 10 on the chart
                return `${originalValue >= 10 ? originalValue : value}`;
              }}
            />
            <Legend allowDataOverflow={false} />

            <Line
              type="linear"
              dataKey={dataKey}
              stroke="black"
              strokeWidth={2}
              strokeLinecap="square"
              strokeLinejoin="miter"
              dot={false} // Disable dots for each data point
              allowDataOverflow={false}
            />

            <ReferenceLine y={2} stroke="red" strokeDasharray="3 3" />
            <ReferenceLine y={0} stroke="green" strokeDasharray="3 3" />
            <ReferenceLine y={-2} stroke="red" strokeDasharray="3 3" />
          </LineChart>
        </div>
      ) : (
        <div>test</div>
      )}
    </div>
  );
};

export default Chart;