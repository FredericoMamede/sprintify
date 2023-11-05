//Cancel a DailyScrum -- DELETE

import { deleteDailyScrum } from "@/Server/Data/Crud";

export default async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const currentDate = new Date().toISOString().split("T")[0];
    const deletedCount = await deleteDailyScrum(currentDate);

    if (deletedCount === 1) {
      return res.status(204).end(); 
    } else {
      return res
        .status(404)
        .json({ error: "No matching daily scrum data found for deletion" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting daily scrum data" });
  }
};
