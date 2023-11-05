
import AlertIcon from '@/App/Components/AlertIcon/AlertIcon';
import Footer from '@/App/Components/Footer';
import Header from '@/App/Components/Header';
import styles from '@/styles/Pages/AddNewSprint.module.css'
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';

const Sprints = () => {
  const [alerts, setAlerts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    console.log('oi')
    async function fetchAlerts() {
      try {
        const response = await fetch('../api/Manager/Alerts/Getlast4');
        if (response.ok) {
          const data = await response.json();
          setAlerts(data);
        }
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    }

    fetchAlerts();
  }, []);


  function getColorForAlertType(type) {
    switch (type) {
      case 'Done':
        return '#9BD7D1';
      case 'Help':
        return '#325D79';
      case 'Risk':
        return '#F26627';
    }
  }



  return (
    <div className={styles.newsprint}>

      <div>
        <Header />
      </div>


      <h1>ADD NEW SPRINT</h1>

      <div className={styles.image} >
        <img onClick={() => router.push(`/Manager/step1`)} src="/Assets/agile.png" alt="sprint" title="sprint" />
      </div>

      <h5>ALERTS</h5>
      <div className={styles.alerts}>

        <div className={styles.alerts}>
          <div className={styles.divs} style={{ backgroundColor: alerts.length > 0 ? getColorForAlertType(alerts[0].type) : "white" }}>
            {alerts.length > 0 && (
              <div className={styles.flex}>
                {alerts[0].task.employee}
                <AlertIcon type={alerts[0].type} />
              </div>
            )}
          </div>

          <div className={styles.divs} style={{ backgroundColor: alerts.length > 0 ? getColorForAlertType(alerts[1].type) : "white" }}>
            {alerts.length > 1 && (
              <div className={styles.flex}>
                {alerts[1].task.employee}
                <AlertIcon type={alerts[1].type} />
              </div>
            )}
          </div>
          <div className={styles.divs} style={{ backgroundColor: alerts.length > 0 ? getColorForAlertType(alerts[2].type) : "white" }}>
            {alerts.length > 2 && (
              <div className={styles.flex}>

                {alerts[2].task.employee}

                <AlertIcon type={alerts[2].type} />

              </div>

            )}
          </div>

          <div className={styles.divs} style={{ backgroundColor: alerts.length > 0 ? getColorForAlertType(alerts[3].type) : "white" }}>
            {alerts.length > 3 && (
              <div className={styles.flex}>
                <>{alerts[3].task.employee}</>
                <AlertIcon type={alerts[3].type} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>

    </div>
  );
};

export default Sprints;