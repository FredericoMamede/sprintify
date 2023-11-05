import { readOnGoingSprints } from "@/Server/Data/Crud";
import { format } from 'date-fns';

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const currentDate = format(new Date(), "yyyy-MM-dd");
    const ongoingSprints = await readOnGoingSprints(currentDate);

    res.status(200).json(ongoingSprints);
  } catch (error) {
    console.error("Error fetching ongoing sprints:", error);
    res.status(500).json({ error: "Error fetching ongoing sprints" });
  }
  
};