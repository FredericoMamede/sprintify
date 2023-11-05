// Change the Daily Scrum hour - PATCH

import { updateTime } from "@/Server/Data/Crud";

export default async (req, res) => {
  if (req.method !== 'PATCH') {
    return res.status(405).end();
  }

  try {
    const { date, newTime } = req.body;
    const currentDate = new Date().toISOString().split('T')[0]; 

    if (!newTime) {
      return res.status(400).json({ error: 'newTime is required for updating' });
    }

    // const updatedDate = date || currentDate; ? talvez usar esta variavel na linha 20 em vez de currentDate

    const upsertedTime = await updateTime(currentDate, newTime);

    if (newTime) {
      return res.status(204).end(); 
    } else {
      return res.status(404).json({ error: 'No matching DailyScrum found for update' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating DailyScrum hour' });
  }
};
