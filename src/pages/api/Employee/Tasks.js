// Receber as tarefas aferidas ao mesmo -- GET

import {  updateSprintTaskCompletionByDescription, updateTaskByDescription } from "@/Server/Data/Crud"; 

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const { taskDescription, sprintId} = req.body;

     


      await updateTaskByDescription(taskDescription);

      const updatedSprintTask = await updateSprintTaskCompletionByDescription(sprintId, taskDescription);

      if (updatedSprintTask) {
        res.status(200).json({ message: 'Task and sprint updated successfully' });
      } else {
        res.status(404).json({ error: 'Task or sprint not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the task and sprint' });
    }
  } else {
    res.status(405).end(); 
  }
}