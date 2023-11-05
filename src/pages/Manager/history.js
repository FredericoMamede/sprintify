import Footer from "@/App/Components/Footer";
import Header from "@/App/Components/Header";
import React from "react";
import { useEffect, useState } from "react";
import styles from '@/styles/Pages/History.module.css'

const Sprints = () => {
  const [sprints, setSprints] = useState([]);

  useEffect(() => {
    async function fetchSprints() {
      try {
        const response = await fetch("/api/Manager/Sprints/History");
        if (response.ok) {
          const data = await response.json();
          setSprints(data);
        }
      } catch (error) {
        console.error("Error fetching sprints:", error);
      }
    }

    fetchSprints();
  }, []);

  return (
    <div className={styles.history2}>

      <div>
        <Header />
      </div>

      <div className={styles.history}>
        <h1>HISTORY</h1>

        <ul>
          {sprints.map((sprint) => (
            <li key={sprint._id.$oid}>
              Sprint:
              <br />
              Start Date: {sprint.startDate}
              <br />
              End Date: {sprint.endDate}
            </li>

          ))}
        </ul>

      

        <Footer />

      </div>
    </div>
  );
};

export default Sprints;
