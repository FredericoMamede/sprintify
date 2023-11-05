import Footer from "@/App/Components/Footer";
import Header from "@/App/Components/Header";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "@/styles/Pages/dailyScrums.module.css";
import { GenericButton } from "@/App/Components/Generic Components/button";

const DailyScrum = () => {
  const [dailyScrum, setDailyScrum] = useState({ date: "", time: "" });
  const [newTime, setNewTime] = useState("");
  const [error, setError] = useState("");
  const [scrubDataAvailable, setScrubDataAvailable] = useState(true);

  useEffect(() => {
    async function fetchDailyScrum() {
      try {
        const response = await fetch("../api/Manager/DailyScrums/Get");
        if (response.ok) {
          const data = await response.json();
          setDailyScrum(data);
        } else {
          setScrubDataAvailable(false);
          toast.error("No daily scrum data found for the current day");
        }
      } catch (error) {
        setError("Error fetching daily scrum data");
      }
    }

    fetchDailyScrum();
  }, []);

  const handleTimeChange = async () => {
    try {
      if (!newTime) {
        toast.error("New time is required for updating.");
        return;
      }

      setDailyScrum({ ...dailyScrum, time: newTime });

      const response = await fetch("../api/Manager/DailyScrums/Modify", {
        method: "PATCH",
        body: JSON.stringify({ date: dailyScrum.date, newTime }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Hour updated successfully");
      } else {
        toast.error("Error updating Daily Scrum hour.");
      }
    } catch (error) {
      setError("Error updating Daily Scrum hour.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("../api/Manager/DailyScrums/Cancel", {
        method: "DELETE",
      });
      if (response.status === 204) {
        toast.success("Daily Scrum Deleted Successfully");
        setScrubDataAvailable(false);
        setDailyScrum({ date: "", time: "" });
      }
    } catch (error) {
      setError("Error deleting daily scrum:", error);
    }
  };

  return (
    <div className={styles.daily}>

      <Header />

      <div className={styles.scrums}>

        <h1>NEXT DAILY SCRUM</h1>

        <div className={styles.date}>
          {scrubDataAvailable ? (
            <>
              <p>{dailyScrum.date}</p>
              <p> {dailyScrum.time}</p>
            </>
          ) : (
            <>
              <p>DATE </p>
              <p>TIME</p>
              <p style={{ color: "#93D7D1" }}>No daily scrum data found for the current day</p>

            </>
          )}
        </div>

      </div>


      <h3>SELECT HOUR</h3>

      <div className={styles.resc}>
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
        />



        {error && <p style={{ color: "red" }}>{error}</p>}

      </div>

<div className={styles.buttons}>


      <GenericButton className={styles.genericButton}
        onClick={handleTimeChange}
        label="UPDATE"
      />


      <GenericButton className={styles.genericButton2}
        onClick={handleDelete}
        label="CANCEL"
      />
      
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default DailyScrum;