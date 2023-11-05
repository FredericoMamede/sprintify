
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GenericButton } from "@/App/Components/Generic Components/button";
import styles from "../../styles/Pages/Step1.module.css";
import Footer from "@/App/Components/Footer";
import Select from "@/App/Components/Select/select";
import { useRouter } from "next/router";
import Header from "@/App/Components/Header";
import { toast } from "react-toastify";

const SprintDateSelector = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [project, setProject] = useState();
  const router = useRouter();

  const handleCreateSprint = async () => {
    event.preventDefault()
    if (!startDate || !endDate || !project) {
      toast.error("Please select a start date, end date, and project.");
      return;
    }

    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = endDate.toISOString().split("T")[0];

    const newSprint = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      project,
    };

    try {
      const response = await fetch("../api/Manager/Sprints/Create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSprint),
      });

      if (response.ok) {
        toast.success("Sprint created successfully!");
        const data = await response.json();

        const step2 = data.message;

        router.push({
          pathname: `/Manager/${step2}`,
          // query: step2,
        });
      } else {
        console.error("Failed to create a sprint.");
      }
    } catch (error) {
      console.error("Error creating a sprint:", error);
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const responsePro = await fetch("../api/Manager/Projects/get");
        if (responsePro.ok) {
          const data = await responsePro.json();

          setProject(data);
        } else {
          console.error("Failed to fetch project");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, []);

  return (
    <div className={styles.step1}>

      <div>
        <Header/>
      </div>
      
      <div className={styles.body}>
      <h1>STEP I</h1>

      


      <form>
    
      <div>
      <Select className={styles.select}
        handleSelectChange={(e) => console.log(e.target.value)}
        title=""
        data={project?.map((project) => ({
          label: project.name,
          value: project.name,
        }))}
      />
</div>

        <DatePicker className={styles.datePicker}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="START"
        />
  

        <DatePicker className={styles.datePicker}
        selected={endDate} 
        onChange={(date) => setEndDate(date)}
        placeholderText="DEADLINE"
        />
  
  </form>




      <div>
        <GenericButton
          className={styles.genericButton}
          onClick={handleCreateSprint}
          label="NEW SPRINT"
        />
      </div>
      
      <Footer />
      </div>
    </div>
  );
};

export default SprintDateSelector;