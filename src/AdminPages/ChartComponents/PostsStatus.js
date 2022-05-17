import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import AxiosBase from "../../api/AxiosBase";
import { useState } from "react";
import { useEffect } from "react";
export function PostsStatus() {
  const [user, setUser] = useState([]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Posts Status",
      },
    },
  };
  const data = {
    labels: ["Accepted", "Sold" ,"Bidding"],
    datasets: [
      {
        label: "# of Votes",
        data: [user[0]?.count, user[1]?.count, user[2]?.count],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    AxiosBase.get("api/trending/PostStatusData").then((res) => {
      
      setUser(res.data);
    });
  }, []);

  return <Pie options={options} data={data}  />;
}

ChartJS.register(ArcElement, Tooltip, Legend);
