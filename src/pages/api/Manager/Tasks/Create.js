// Create a new Task -- POST
import { createNewTask } from "@/Server/Data/Crud";


export default async function (req, res) {
    if (req.method === "POST") {
        const {
            description,
            department,
            project,
            completed
        } = req.body

        try {
            createNewTask({
                description,
                department,
                project,
                completed
            })

            res.status(200).json({ Task: "Task created Successfully" })
        }
        catch (err) {
            console.log(err)
        }
    }
}
