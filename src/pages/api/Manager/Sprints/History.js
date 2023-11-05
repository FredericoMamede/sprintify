//All sprint history-- GET

import { readAllSprints } from "@/Server/Data/Crud";

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const sprints = await readAllSprints();

    if (sprints) {
      return res.status(200).json(sprints);
    } else {
      return res.status(404).json({ error: 'No sprints found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching sprints' });
  }
};