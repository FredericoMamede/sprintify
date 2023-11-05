import { updateSprint, getSprintById } from "@/Server/Data/Crud";

export default async (req, res) => {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }

  try {
    const { sprintId, tasks, employees } = req.body;

   
    const currentSprint = await getSprintById(sprintId);

    
    const newTasks = tasks.filter((task) => 
      !currentSprint.tasks.some(
        (sprintTask) => 
          sprintTask.description === task.description &&
          sprintTask.employee === task.employee
      )
    );

    const newEmployees = employees.filter((employee) => 
      !currentSprint.employees.includes(employee)
    );

    await updateSprint(sprintId, newTasks, newEmployees);

    return res.status(201).end();
  } catch (error) {
    res.status(500).json({ error: "Error updating sprint" });
  }
};