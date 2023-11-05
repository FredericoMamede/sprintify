// Receber todas as projetos do projeto -- GET

import { getAllProjects, getAllprojects } from "@/Server/Data/Crud";

export default async (req, res) => {
  try {
    const project = await getAllProjects();

    if (project) {
      return res.status(200).json(project);
    } else {
      return res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching project' });
  }
};

