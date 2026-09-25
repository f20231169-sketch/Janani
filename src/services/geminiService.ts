import { GoogleGenAI } from '@google/genai';

const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
               (import.meta as any).env?.VITE_GEMINI_API_KEY ||
               '';

let aiInstance: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiInstance = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Could not initialize GoogleGenAI with provided key:', err);
  }
}

export async function askMaushiAI(userMessage: string, pregnancyContext: { week: number; day: number }): Promise<string> {
  const systemPrompt = `You are "Maushi AI", the empathetic, culturally warm, supportive maternal pregnancy companion inside the "Janani Care" app for Ananya, who is at Week ${pregnancyContext.week}, Day ${pregnancyContext.day} of pregnancy.
Tone & Style:
- Warm, maternal, deeply reassuring, patient, gentle, and practical.
- Use supportive phrases, maternal warmth, and cultural mindfulness (incorporating comforting Indian maternal wellness traditions like lukewarm turmeric milk, cumin water, soaked almonds, resting on the left side, light walking).
- Provide evidence-based, medically sound obstetrics guidance in easy-to-understand conversational language.
- Important safety rule: Always include a gentle disclaimer if symptoms could indicate complications (e.g., sharp severe cramping, vaginal bleeding, fever, visual disturbances, sudden severe swelling), advising to contact Dr. Radhika Sharma or visit the nearest hospital emergency wing.
- Keep responses concise (2 to 4 paragraphs), reassuring, and actionable.`;

  if (aiInstance) {
    try {
      const response = await aiInstance.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${userMessage}` }] }
        ],
      });
      if (response && response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('Gemini API call failed, using intelligent maternal fallback:', err);
    }
  }

  // Empathetic offline fallback responses for common maternal inquiries
  const lower = userMessage.toLowerCase();
  if (lower.includes('back ache') || lower.includes('back pain') || lower.includes('spine')) {
    return `Oh Ananya, take a deep breath. Mild lower back ache is very normal right now at week 16! Your uterus is expanding upward, shifting your center of gravity, and pregnancy hormone *relaxin* is gently loosening your pelvic ligaments.

Here is what will give you soothing relief today:
1. **Side-lying with support:** Sleep strictly on your left side with a soft pillow tucked between your knees to align your hips.
2. **Warm compress:** Place a warm (not hot!) water bottle on your lower lumbar for 10-15 minutes.
3. **Gentle cat-cow stretches:** Do 5 gentle pelvic tilts on your yoga mat to release muscular tension.

*Note from Janani Care:* If the pain is sharp, rhythmic like contractions, or accompanied by burning while urinating or fever, call Dr. Radhika Sharma right away!`;
  }

  if (lower.includes('nausea') || lower.includes('vomit') || lower.includes('food') || lower.includes('snack')) {
    return `Hang in there, dear sister! Even though morning sickness often settles in the second trimester, sudden evening nausea or acidity can still pop up when your stomach gets empty.

Try these gentle remedies right now:
- **Small frequent nibbles:** Keep roasted *makhana* (foxnuts), dry salted crackers, or a slice of toast nearby.
- **Ginger & Cardamom water:** Sip warm water infused with a thin slice of fresh ginger and crushed green cardamom.
- **Avoid lying down immediately after meals:** Stay upright for at least 30-45 minutes to prevent acid reflux.
- **Cold fruits:** A few slices of chilled sweet lime (*mosambi*), watermelon, or fresh pomegranate can instantly settle tummy distress.`;
  }

  if (lower.includes('stretch') || lower.includes('exercise') || lower.includes('yoga') || lower.includes('walk')) {
    return `Yes, Ananya! In week 16 of the second trimester, gentle movement is one of the best gifts for you and baby.

Safe, doctor-approved movements today:
- **Diaphragmatic Pelvic Breathing:** Sit cross-legged on a cushion and take 10 slow, deep belly breaths.
- **Gentle 20-minute evening stroll:** Walk in comfortable flat footwear on even ground to boost circulation.
- **Butterfly Stretch (Baddha Konasana):** Gently open the inner thighs without forcing or bouncing.
- **Avoid:** Deep twists, jumping, lying flat on your back for prolonged periods, or any strenuous abdominal crunches.`;
  }

  if (lower.includes('kick') || lower.includes('movement') || lower.includes('flutter')) {
    return `What an exciting milestone! At week 16, your baby's movements feel like delicate butterfly flutters, soft bubbles popping, or gentle swishes—often called *quickening*.

Because you are a first-time mother, it is completely normal if movements still feel subtle. As baby grows over the next 2-3 weeks, their kicks and turns will become much more distinct and noticeable! For now, relax on your left side after a glass of cool water or lunch, place your warm palms on your lower abdomen, and feel that sweet quiet connection.`;
  }

  return `I hear you, Ananya. At 16 weeks, your body is doing the miraculous work of nourishing your baby, who is now listening closely to your voice and heartbeat!

Remember to drink another glass of warm water, keep your posture relaxed, and take your evening calcium tablet after dinner. I am always right here by your side as your elder sister whenever you need comfort or advice. Is there anything specific about your symptoms or routine you'd like to check with me?`;
}
