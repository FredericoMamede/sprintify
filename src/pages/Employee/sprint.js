import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "@/App/Components/Footer";
import styles from "./employee.module.css";
import Header from "@/App/Components/Header";
import { toast } from "react-toastify";

export default function SprintInfo() {
  const router = useRouter();
  const { query } = router;

  if (!query || !query.employee) {
    return <div>No employee provided</div>;
  }

  const loggedInEmployee = query.employee;

  const [sprintData, setSprintData] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [alertType, setAlertType] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `../api/Employee/Sprint?employee=${loggedInEmployee}`
        );

        if (response.status === 200) {
          const data = await response.json();
          setSprintData(data);
        } else {
          toast.error("Error fetching sprint data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [loggedInEmployee]);

  console.log(sprintData)
  if (!sprintData) {
    return <div>NO SPRINTS ASSIGNED</div>;
  }

  const employeeTasks = sprintData.tasks.filter(
    (task) => task.employee === loggedInEmployee
  );

  const taskSelectedStyle = {
    opacity: selectedTask ? 0.5 : 1,
  };

  const selectTask = (task) => {
    setSelectedTask(task);
  };

  const createAlert = async () => {
    try {
      if (selectedTask && alertType) {
        const alertData = {
          type: alertType,
          task: selectedTask,
          project: sprintData.project,
          timestamp: new Date().toISOString(),
        };
  
        const response = await fetch("../api/Employee/Create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(alertData),
        });
  
        if (response.status === 201) {
          toast.success("Alert created successfully");
  
          if (alertType === "Done") {
            const updateResponse = await fetch("../api/Employee/Tasks", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                taskDescription: selectedTask.description,
                sprintId: sprintData._id,
                taskId: selectedTask._id,
              }),
            });
  
            if (updateResponse.status === 200) {
              toast.success("Task and sprint updated successfully");
            } else {
              toast.error("Error updating task and sprint");
            }
          }
        } else {
          console.error("Error creating alert");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    <div className={styles.employee}>
      <div>
        <Header />
      </div>

      <div className={styles.body}>
        <h1>MY SPRINT</h1>
        <h2>SPRINTIFY</h2>
        <div className={styles.date}>LEZZZGO: {sprintData.startDate}</div>
        <br />
        <div className={styles.deadline}>DEADLINE: {sprintData.endDate}</div>


        <h2>Tasks:</h2>
        <div className={styles.list}>
          <ul>
          {employeeTasks.map((task, index) => (
            <li
              key={index}
              onClick={() => selectTask(task)}
              style={task === selectedTask ? taskSelectedStyle : {}}
            >
              {task.description}
            </li>
          ))}
          </ul>
        </div>
      

        <div className={styles.buttons}>
        <div
          className={styles.done}
          onClick={() => setAlertType("Done")}
          style={alertType === "Done" ? taskSelectedStyle : {}}
        >
          <img src="/Assets/done.png" alt="done" title="done" />
        </div>
        <div
          className={styles.help}
          onClick={() => setAlertType("Help")}
          style={alertType === "Help" ? taskSelectedStyle : {}}
        >
          <img src="/Assets/help.png" alt="help" title="help" />
        </div>
        <div
          className={styles.risk}
          onClick={() => setAlertType("Risk")}
          style={alertType === "Risk" ? taskSelectedStyle : {}}
        >
          <img src="/Assets/risk.png" alt="risk" title="risk" />
        </div>
      </div>
        <div>
          <button className={styles.botao} onClick={createAlert}>Create Alert</button>
        </div>
      </div>

        <div className={styles.arrow} >
          <img onClick={()=> router.push(`/`)} src="/Assets/arrow.png" alt="arrow" title="arrow" />
        </div>
      
      <Footer />
    </div>
  );
}
