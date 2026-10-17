const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function retry(operation, { attempts = 3, baseDelay = 200, shouldRetry = () => true } = {}) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await operation(attempt);
    } catch (error) {
      if (attempt >= attempts || !shouldRetry(error)) throw error;
      const delay = baseDelay * 2 ** (attempt - 1) + Math.random() * 100;
      await wait(delay);
    }
  }
}

const saveScore = (score) =>
  retry(
    async () => {
      const response = await fetch("/api/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    },
    { shouldRetry: (error) => !error.message.startsWith("HTTP 4") }
  );

saveScore(4200).catch((error) => console.log(`Não foi possível salvar: ${error.message}`));
