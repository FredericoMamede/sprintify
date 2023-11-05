import { getRandomMotivationalPhrase } from "@/Server/Data/Crud";

export async function getRandomMotivationalPhraseE(req, res) {
  try {
    const randomPhrase = await getRandomMotivationalPhrase();
    res.status(200).json({ phrase: randomPhrase });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
