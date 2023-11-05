// Sprint Cancel-- DELETE
import { deleteSprint } from "@/Server/Data/Crud";

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const { sprintId } = req.query;

      if (!sprintId) {
        return res.status(400).json({ error: 'Sprint ID is required' });
      }

      const deletedCount = await deleteSprint(sprintId);

      if (deletedCount === 1) {
        res.status(200).json({ message: 'Sprint deleted successfully' });
      } else {
        res.status(404).json({ error: 'Sprint not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the sprint' });
    }
  } else {
    res.status(405).end();
  }
}