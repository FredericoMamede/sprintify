import React, { useState } from "react";
import Footer from "@/App/Components/Footer";
import { GenericButton } from "@/App/Components/Generic Components/button";
import { InputText } from "@/App/Components/Input_Text_Box";
import styles from "../../styles/Pages/TaskDescription.module.css";
import Header from "@/App/Components/Header";
import { toast } from "react-toastify";

const tasks = () => {
  const [task, setTask] = useState({
    description: "",
    department: "",
    project: "Sprintify",
    completed: false,
  });

  const handleSave = async () => {
    try {

      const response = await fetch("../api/Manager/Tasks/Create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        toast.success("Task created successfully");

        setTask({
          description: "",
          department: "",
          project: "Sprintify",
          completed: false,
        });
      } else {
        toast.error("Error creating task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className={styles.newTasks}>


      <Header />

      <h1>TASK DESCRIPTION</h1>


      <div className={styles.inputText}>

        <textarea className={styles.desc}
          type="text"
          placeholder="DESCRIPTION"
          
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <input className={styles.area}
          type="text"
          placeholder="AREA"
          value={task.department}
          onChange={(e) => setTask({ ...task, department: e.target.value })}
        />

        <GenericButton
          className={styles.genericButton}
          onClick={handleSave}
          label="ADD"
        />

      </div>

      <Footer />


    </div>
  );
};

export default tasks;

