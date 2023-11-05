// Receber todas as tasks do projeto -- GET

import { getAllUsers } from "@/Server/Data/Crud";

export default async (req, res) => {
  try {
    const user = await getAllUsers();

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};