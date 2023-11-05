// Gets all Alets from the employees -- GET


import { getAlerts } from "@/Server/Data/Crud";

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { project, type } = req.query;

  try {
    const projectStringId = project
    const alerts = await getAlerts(projectStringId, type);
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching alerts' });
  }
};
