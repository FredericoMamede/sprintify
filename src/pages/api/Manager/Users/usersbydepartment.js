import { getUsersByDepartment } from "@/Server/Data/Crud";

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { department } = req.query;

  try {
    const users = await getUsersByDepartment(department);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users by department" });
  }
};
