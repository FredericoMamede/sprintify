// Receber o sprint e o temporizador/data ao qual está alocado -- GET
import { getMongoCollection } from "../../../Server/Data/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { query } = req;
      const loggedInEmployee = query.employee; 

      const sprintsCollection = await getMongoCollection("Sprintify", "Sprints");

      const sprint = await sprintsCollection.findOne({
        "employees": loggedInEmployee,
      });

      if (sprint) {
        res.status(200).json(sprint);
      } else {
        res.status(404).json({ error: "Sprint not found for this employee" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
