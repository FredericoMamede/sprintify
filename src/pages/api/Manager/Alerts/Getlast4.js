// Only gets the last 4 alerts sent

import { getLast4Alerts } from "@/Server/Data/Crud";

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const last4Alerts = await getLast4Alerts();
    res.status(200).json(last4Alerts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching last 4 alerts' });
  }
};
