import { useAppStore } from "@/stores/appStore";
const appStore = useAppStore();

export default async function fetchData(
  API_KEY: string,
  modelName: string,
  content: string,
  max_tokens: number,
  temperature: number
) {
  try {
    // Initialize output data once
    appStore.outputData = "";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelName,
        messages: [{ role: "user", content: content }],
        max_tokens: max_tokens,
        temperature: temperature,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const body = response.body;
    if (!body) {
      throw new Error(
        "ReadableStream is not supported or response body is null."
      );
    }

    const reader = body.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      if (value) {
        const chunk = decoder.decode(value, { stream: true });

        // Split the chunk into individual payloads based on "\n\n"
        const payloads = chunk.split("\n\n");

        for (const payload of payloads) {
          if (payload.includes("[DONE]")) {
            return; // End of stream
          }

          // Process payload (either complete or needing concatenation)
          if (payload.startsWith("data: ")) {
            // If payload starts with "data: ", process it
            try {
              const data = JSON.parse(payload.replace("data: ", ""));
              const text = data?.choices?.[0]?.delta?.content;
              if (text) {
                appStore.outputData += text; // Append the content to output
              }
            } catch (error) {
              console.error(`Error parsing data: ${payload}`, error);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
