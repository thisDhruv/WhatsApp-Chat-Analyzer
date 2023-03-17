import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = (props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
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
  };

  const labels = props.data.labels;
  const values = props.data.values;
  let ind=0
  const data = {
    labels,
    datasets: [
      {
        label: props.label,
        data: labels.map(() =>
          values[ind++]
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      }
    ],
  };

  return <Line options={options} data={data} />;
};
