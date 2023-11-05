// Delete an alert  -- DELETE 

import { deleteAlertByTaskDescription } from "@/Server/Data/Crud";

export default async (req, res) => {
  if (req.method !== 'DELETE') {
    return res.status(405).end();
  }

  const { description } = req.query;

  try {
    const deletedCount = await deleteAlertByTaskDescription(description);

    if (deletedCount === 1) {
      res.status(200).json({ message: 'Alert deleted successfully' });
    } else {
      res.status(404).json({ error: 'Alert not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting alert' });
  }
};
