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
import { useState } from "react";
import { useEffect } from "react";
import AxiosBase from "../../api/AxiosBase";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function MonthlyUserChart() {
  const [data, setData] = useState([]);
  useEffect(() => {
    AxiosBase.get("api/trending/userPerMonth").then((res) => {
      
      setData(res.data);
    });
  }, []);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "User per month",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const datas = {
    labels,
    datasets: [
      {
        label: "User account",
        data: labels.map((month, index) => {
          if (data[0]?._id?.month == index + 1) {
            return data[0].count;
          } else {
            return 0;
          }
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Artist account",
        data: labels.map((month, index) => {
          if (data[1]?._id?.month == index + 1) {
            return data[1].count;
          } else {
            return 0;
          }
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={datas} />;
}
