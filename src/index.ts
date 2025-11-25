// src/index.ts (ref: e25105c2a58aa75e93ebf9601284cdce2961581b)
export * from './value-object';

// Read credentials from environment — do NOT hardcode in repo
const apiKey = process.env.API_KEY ?? '';
const githubToken = process.env.GITHUB_TOKEN ?? '';

export async function fetchData(): Promise<any> {
  // If you run in Node < 18 you must provide a fetch implementation (see note below)
  return fetch(`https://api.example.com/data?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

// Optional: only auto-run at runtime if explicitly enabled (not during tests)
if (process.env.RUN_FETCH === 'true' && process.env.NODE_ENV !== 'test') {
  // Fire and forget — handle/log errors inside fetchData
  fetchData().catch(() => {});
}
