#!/usr/bin/env node
const baseUrl = process.env.CODICE_API_URL || 'https://landing-codice.vercel.app';
const command = process.argv[2] || 'help';

async function fetchJson(path) {
  const response = await fetch(`${baseUrl}${path}`);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.json();
}

if (command === 'health') {
  console.log(JSON.stringify(await fetchJson('/api/v1/health'), null, 2));
} else if (command === 'contacts') {
  console.log(JSON.stringify(await fetchJson('/api/v1/contacts'), null, 2));
} else if (command === 'index') {
  console.log(JSON.stringify(await fetchJson('/api/v1'), null, 2));
} else {
  console.log('Usage: codice <health|contacts|index>');
}
