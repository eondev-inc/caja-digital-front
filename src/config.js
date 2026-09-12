const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY || null;

if (!apiUrl || apiUrl.trim() === '') {
  throw new Error('VITE_API_URL missing — build requires --build-arg VITE_API_URL');
}

export { apiUrl, apiKey };
