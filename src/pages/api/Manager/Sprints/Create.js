import { createNewSprint } from "@/Server/Data/Crud";

export default async function (req, res) {
  if (req.method === "POST") {
    const { project, startDate, endDate } = req.body;

    try {

      if(project && project.length === 0) {
        res.status(403).json({message: "no_project_specified"})
      }

      const newSprint = {
        project: project[0]._id,
        startDate,
        endDate,
        tasks: [],
        employees: [],
      };


    

      const result = await createNewSprint(newSprint)
   console.log(String(result))
      if (result) {
        res.status(200).json({ message: String(result)});
      } else {
        res.status(500).json({ error: "Failed to create a sprint" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error creating a sprint" });
    }
  }
}
﻿
