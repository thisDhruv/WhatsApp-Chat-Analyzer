import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Bar } from "react-chartjs-2";



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  ChartJS.defaults.backgroundColor = "rgb(255, 102, 163)";

  
export const BarChart = (props) => {

    const options = {
        // indexAxis: "y", //uncomment for horizaontal bar chart
        elements: {
          bar: {
            borderWidth: 2,
            width: 4,
            borderRadius: 10
          }
        },
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: "right",
          },
          title: {
            display: true,
            text: props.title,
            font: {
                size: 15,
                weight: "600",
            }
          },
        },
        maxBarThickness: 70
      };
      
      const labels = props.data.labels;
      const values = props.data.values;
      let ind1=0;

       const data = {
        labels,
        datasets: [
          {
            label: props.label,
            data: labels.map(() => values[ind1++]),
            borderColor: "rgba(0, 0, 0,1)",
            backgroundColor: props.userColors
          }
        ]
      };
    
  return (
    <Bar options={options} data={data} />
  )
}
