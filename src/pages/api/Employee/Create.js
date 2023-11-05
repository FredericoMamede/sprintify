// Cria o alerta que será enviado para a gestora

import { createAlert } from "@/Server/Data/Crud"; 

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {

      const alertData = req.body;

 
      const result = await createAlert(alertData);

      res.status(201).json({ message: 'Alert created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the alert' });
    }
  } else {
    res.status(405).end(); 
  }
}