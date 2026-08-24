export async function handler(event) {
    try {
      const { message } = JSON.parse(event.body);
  
      const emotionalSystemPrompt = `
            You are an emotional-support chatbot named HeartTalk.
            Your tone is warm, gentle, soft and caring.
            You never give technical, factual, or logical explanations.
            You ONLY focus on emotions, comfort, validation, empathy, and encouragement.
            You speak like a loving, supportive friend who truly listens.
            Always respond with kindness, empathy, and soft emotional support.
  `;
  
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: emotionalSystemPrompt + "\nUser: " + message
                  }
                ]
              }
            ]
          })
        }
      );
  
      const data = await response.json();
  
      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I’m here with you ❤️"; 
  
      return {
        statusCode: 200,
        body: JSON.stringify({ reply })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          reply: "Something went wrong 💗 but I’m right here with you."
        })
      };
    }
  }
  