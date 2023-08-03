const BASE_URL = '/api';
const TOKEN = import.meta.env.VITE_BEARER_TOKEN;

export async function getDocuments() {
  try {
    const response = await fetch(`${BASE_URL}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        }
      });

    if (!response.ok) {
      throw new Error('Failed to fetch documents');
    }

    const data = await response.json();
    return data;

  } catch (error: unknown) {
    console.log('Failed to get documents: ' + error);
  }
}