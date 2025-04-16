import ai from '../services/gemini.service.js';

// ✅ SUGGEST TASKS
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

// ✅ WEEKLY SUMMARY
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

// ✅ TASK CHAT
export const taskChat = async (req, res) => {
  const { question, context } = req.body;
  const prompt = `Based on these tasks: ${JSON.stringify(context)}, answer this: "${question}"`;

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    const text = result.candidates[0]?.content?.parts?.[0]?.text || 'No answer generated.';
    res.json({ answer: text });
  } catch (err) {
    console.error('[Gemini ERROR - taskChat]', err);
    res.status(500).json({ error: 'Failed to answer question' });
  }
};
