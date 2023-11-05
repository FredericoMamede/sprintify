import Footer from "@/App/Components/Footer";
import Header from "@/App/Components/Header";
import React, { useState, useEffect } from "react";
import styles from "@/styles/Pages/Stats.module.css";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js'
import Select from "@/App/Components/Select/select";


Chart.register(...registerables)

const Statistics = () => {
  const [sprints, setSprints] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchSprints = async () => {
      try {
        const response = await fetch("../api/Manager/Sprints/History");
        if (response.ok) {
          const data = await response.json();
          setSprints(data);

          const totalSprints = data.length;
          let totalCompletedTasks = 0;
          let totalIncompleteTasks = 0;

          data.forEach((sprint) => {
            sprint.tasks.forEach((task) => {
              if (task.completed) {
                totalCompletedTasks += 1;
              } else {
                totalIncompleteTasks += 1;
              }
            });
          });

          setChartData({
            labels: ["Total Sprints", "Completed Tasks", "Incomplete Tasks"],
            datasets: [
              {
                label: "Sprint Statistics",
                data: [totalSprints, totalCompletedTasks, totalIncompleteTasks],
                backgroundColor: ["rgba(75, 192, 192, 0.2)"],
                borderColor: ["rgba(75, 192, 192, 1)"],
                borderWidth: 1,
              },
            ],
          });
        } else {
          console.error("Failed to fetch sprints");
        }
      } catch (error) {
        console.error("Error fetching sprints:", error);
      }
    };

    fetchSprints();
  }, []);

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={styles.statistics}>
      <div>
        <Header />
      </div>

      <div className={styles.statisticsContent}>
        <h1>STATISTICS</h1>

        {chartData && (
          <div className={styles.chartContainer}>
            <Bar
              className={styles.bar}
              data={chartData}
              options={chartOptions}
              placeholder="FILTER" />
          </div>
        )}
      </div>

      <Select />

      <Footer />
    </div>
  );
};

export default Statistics;