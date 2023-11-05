import Footer from "@/App/Components/Footer";
import Header from "@/App/Components/Header";
import { useEffect, useState } from "react";
import styles from "@/styles/pages/AddTask.module.css";
import { GenericButton } from "@/App/Components/Generic Components/button";
import { useRouter } from "next/router";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/Manager/Tasks/Get");
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);
  
  const handleCreateTasks = async () => {
    router.push("/Manager/taskdescription")
  }

  return (
    
    <div className={styles.addtask}>

<div>
  <Header />
</div>
    
<div className={styles.body}>

      <h1>ADD NEW TASK</h1>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.description}</li>
        ))}
      </ul>



        <GenericButton className={styles.genericButton}
          onClick={handleCreateTasks}
          label="ADD"
        />


      <Footer />
    </div>
    </div>

  );
};

export default TasksPage;
