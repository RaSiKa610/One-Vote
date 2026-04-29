import fs from 'fs';
import path from 'path';

const LEADERS = [
  "Jawaharlal Nehru", "Vallabhbhai Patel", "Lal Bahadur Shastri", 
  "Indira Gandhi", "Rajiv Gandhi", "P. V. Narasimha Rao", 
  "Atal Bihari Vajpayee", "Manmohan Singh", "Narendra Modi", 
  "Mamata Banerjee", "Mayawati"
];

async function getImageUrl(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=200`;
  const res = await fetch(url);
  const data = await res.json();
  const pages = data.query.pages;
  const pageId = Object.keys(pages)[0];
  if (pages[pageId].thumbnail) {
    return pages[pageId].thumbnail.source;
  }
  return null;
}

async function main() {
  const results = {};
  for (const leader of LEADERS) {
    const imgUrl = await getImageUrl(leader);
    results[leader] = imgUrl;
    console.log(`${leader}: ${imgUrl}`);
  }
  fs.writeFileSync('leader_images.json', JSON.stringify(results, null, 2));
}

main();
