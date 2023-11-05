import { getMongoCollection } from "../../../Server/Data/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { EmployeeId, password } = req.body;

    const usersCollection = await getMongoCollection("Sprintify", "Users");
    const user = await usersCollection.findOne({ EmployeeID: EmployeeId });

    if (!user) {
      res.status(402).json({ error: "EmployeeId Not Found" });
    } else if (user.password === password) {
      res.status(200).json({
        message: "Authentication successful",
        role: user.role,
        name: user.name,
      });
    } else {
      res.status(403).json({ error: "Password Incorrect" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
