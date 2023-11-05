// Receber todas as departments do projeto -- GET

import { getAlldepartments } from "@/Server/Data/Crud";

export default async (req, res) => {
  try {
    const department = await getAlldepartments();

    if (department) {
      return res.status(200).json(department);
    } else {
      return res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching department' });
  }
};