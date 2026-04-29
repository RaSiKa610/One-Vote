import fs from 'fs';

const API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY;

async function testTranslation() {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: 'Hello', target: 'hi' })
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
  }
}

testTranslation();
