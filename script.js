const apiKey = "AIzaSyBUZAXt2mnkMb18ZxxgCZ087idOgzdrLNY"; // Replace with your actual key

async function callGemini() {
  const inputEl = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");
  const input = inputEl.value.trim();
  if (!input) return;

  // Display user message
  const userMessage = document.createElement("div");
  userMessage.className = "message user";
  userMessage.innerText = "You: " + input;
  chatBox.appendChild(userMessage);

  // Clear input
  inputEl.value = "";
  inputEl.focus();

  // AI placeholder
  const aiMessage = document.createElement("div");
  aiMessage.className = "message ai";
  aiMessage.innerText = "Suresh is thinking...";
  chatBox.appendChild(aiMessage);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: input }] }],
        }),
      }
    );

    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Suresh AI.";
    aiMessage.innerText = "Suresh AI: " + reply;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    aiMessage.innerText = "Error: " + error.message;
  }
}
