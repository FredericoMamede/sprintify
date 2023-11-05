// Get DailyScrums from database - GET

import { findDailyScrum } from "@/Server/Data/Crud";


export default async (req, res) => {
  try {
    const currentDate = new Date().toISOString().split('T')[0];
    const scrum = await findDailyScrum(currentDate);

    if (scrum) {
      res.status(200).json({
        date: scrum.date,
        time: scrum.time
      });
    } else {
      res.status(404).json({ error: 'No daily scrum data found for the current day' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching daily scrum data' });
  }
};