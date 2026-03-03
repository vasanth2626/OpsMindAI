import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function test() {
  try {
    const chat = await groq.chat.completions.create({
      messages: [{ role: "user", content: "Say hello" }],
      model: "llama-3.1-8b-instant",   // ✅ UPDATED
    });

    console.log("✅ Groq working:");
    console.log(chat.choices[0].message.content);
  } catch (err) {
    console.error("❌ Groq error:");
    console.error(err.message);
  }
}

test();