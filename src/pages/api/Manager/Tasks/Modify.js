// Boolean (Check if the task is completed or not) --PATCH

import { updateTask } from "@/Server/Data/Crud";

export default async (req, res) => {
  if (req.method !== 'PATCH') {
    return res.status(405).end();
  }

  try {
    const taskId = req.body._id;

    if (!taskId) {
      return res.status(400).json({ error: '_id is required for updating' });
    }

    const updated = await updateTask(taskId);

    if (updated) {
      return res.status(204).end(); 
    } else {
      return res.status(404).json({ error: 'No matching task found for update' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating task completed status' });
  }
};