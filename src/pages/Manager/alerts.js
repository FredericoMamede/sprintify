import React, { useState, useEffect } from "react";
import Footer from "@/App/Components/Footer";
import Select from "@/App/Components/Select/select";
import styles from "../../styles/Pages/Alerts.module.css";
import Header from "@/App/Components/Header";
import ObjectID from "bson-objectid";

const Alerts = () => {
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [alertsData, setAlertsData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);

  const typesData = [
    { value: "Done", label: "Done" },
    { value: "Help", label: "Help" },
    { value: "Risk", label: "Risk" },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const responsePro = await fetch("../api/Manager/Projects/get");
        if (responsePro.ok) {
          const data = await responsePro.json();
          setProjectsData(
            data.map((project) => ({ value: project._id, label: project.name }))
          );
        } else {
          console.error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectChange = (event) => {
    const projectId = new ObjectID(event.target.value);
    setSelectedProject(projectId);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const fetchAlerts = async () => {
    try {
      const response = await fetch(
        `../api/Manager/Alerts/Get?project=${selectedProject}&type=${selectedType}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setAlertsData(data);
      } else {
        console.error("Error fetching alerts");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [selectedProject, selectedType]);

  return (
    <div className={styles.alerts}>
      <div>
        <Header />
      </div>

      <div className={styles.alerts1}>
        <h1>ALERTS</h1>

        <form>
          <Select
           
            data={projectsData}
            handleSelectChange={handleProjectChange}
            placeholder="PROJECT"
          />

          <Select
           
            data={typesData}
            handleSelectChange={handleTypeChange}
            placeholder="TYPE"
          />
        </form>

        <div className={styles.alertContainer}>
          {alertsData.map((alert, index) => (
            <ul className={styles.alertItem} key={index} style={{listStyle: "none"}}>

              <li>{alert.task.employee}</li>
            </ul>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Alerts;
