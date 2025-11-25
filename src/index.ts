// src/index.ts (ref: 10a30032935801d72dd90aafc9ddd5f20cd7c08a)
export * from './value-object';

// Read credentials from environment — do NOT hardcode in repo
const apiKey = process.env.API_KEY ?? '';
const githubToken = process.env.GITHUB_TOKEN ?? '';

export async function fetchData(): Promise<unknown> {
  // If you run in Node < 18 you must provide a fetch implementation (see note below)
  const url = `https://api.example.com/data?api_key=${apiKey}`;
  const headers: Record<string, string> = githubToken
    ? { Authorization: `Bearer ${githubToken}` }
    : {};

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error: unknown) {
    console.error('Error:', error);
    throw error;
  }
}

// Optional: only auto-run at runtime if explicitly enabled (not during tests)
// Use top-level await to satisfy unicorn/prefer-top-level-await
if (process.env.RUN_FETCH === 'true' && process.env.NODE_ENV !== 'test') {
  await fetchData().catch(() => {});
}
