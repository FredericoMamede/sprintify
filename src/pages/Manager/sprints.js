import Footer from "@/App/Components/Footer";
import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { GenericButton } from "@/App/Components/Generic Components/button";
import styles from "@/styles/pages/Sprint.module.css";
import Header from "@/App/Components/Header";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const OngoingSprints = () => {
  const [ongoingSprints, setOngoingSprints] = useState([]);
  const [selectedSprint, setSelectedSprint] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchOngoingSprints() {
      try {
        const response = await fetch("../api/Manager/Sprints/Ongoing");
        if (response.ok) {
          const data = await response.json();
          console.log("Received data:", data);

          const currentDate = new Date().toISOString().split("T")[0];
          const filteredData = data.filter(
            (sprint) => sprint.endDate >= currentDate
          );

          console.log("Filtered data:", filteredData);
          setOngoingSprints(filteredData);
        } else {
          console.error("Received an error response:", response.status);
        }
      } catch (error) {
        console.error("Error fetching ongoing sprints:", error);
      }
    }

    fetchOngoingSprints();
  }, []);

  const cancelSprint = async (sprintId) => {

    const shouldCancel = window.confirm("Are you sure you want to cancel this sprint?");

    
    if (!shouldCancel) {
      return;
    }
    try {

      const response = await fetch(
        `/api/Manager/Sprints/Cancel?sprintId=${sprintId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        toast.success("Sprint Cancelled Successfully");
        setOngoingSprints((sprints) =>
          sprints.filter((sprint) => sprint._id !== sprintId)
        );
      } else {
        toast.error("Received an error response:", response.status);
      }
    } catch (error) {
      console.error("Error canceling the sprint:", error);
    }
  };

  const handleSprintClick = (sprintId) => {
    setSelectedSprint(sprintId);
  };

const step2 = selectedSprint
  const navigateToUpdatePage = () => {
    router.push(`/Manager/${step2}`);
  };
 

  return (
    <div className={styles.sprints}>
      <div>
        <Header />
      </div>

      <h1>SPRINTS</h1>

      <ul>
        {ongoingSprints.map((sprint) => (
          <li
            key={sprint._id.$oid}
            onClick={() => handleSprintClick(sprint._id)}
            style={{ opacity: selectedSprint === sprint._id ? 0.5 : 1 }}
          >
            PROJECT {sprint.projectData ? sprint.projectData.name : "SPRINTIFY"}
            <br />
            DEADLINE {format(parseISO(sprint.endDate), "yyyy-MM-dd")}
            <button className={styles.sprintsButton}
              onClick={() => {
                console.log(sprint);
                cancelSprint(sprint._id);
              }}
            >
              CANCEL
            </button>
          </li>
        ))}
      </ul>

      <GenericButton
        className={styles.genericButton}
        onClick={navigateToUpdatePage}
        label="Update"
      />

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default OngoingSprints;