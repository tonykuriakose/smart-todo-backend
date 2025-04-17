import ai from '../services/gemini.service.js';




export const suggestTasks = async (req, res) => {
  const { input } = req.body;
  const prompt = `Convert this into structured tasks with due dates if possible:\n"${input}"`;

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    const text = result.candidates[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
    res.json({ suggestions: text });
  } catch (err) {
    console.error('[Gemini ERROR - suggestTasks]', err);
    res.status(500).json({ error: 'Failed to get Gemini suggestions' });
  }
};



export const weeklySummary = async (req, res) => {
  const { completedTasks } = req.body;
  const prompt = `Summarize the following completed tasks:\n${JSON.stringify(completedTasks)}`;

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    const text = result.candidates[0]?.content?.parts?.[0]?.text || 'No summary generated.';
    res.json({ summary: text });
  } catch (err) {
    console.error('[Gemini ERROR - weeklySummary]', err);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
};


