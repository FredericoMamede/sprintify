// Find all tasks in a certain project -- GET

import { getAllTasks } from "@/Server/Data/Crud";

export default async (req, res) => {
  try {
    const tasks = await getAllTasks();

    if (tasks) {
      return res.status(200).json(tasks);
    } else {
      return res.status(404).json({ error: 'No tasks found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

