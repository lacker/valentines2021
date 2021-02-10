// Run this with node

let fs = require("fs");
let readline = require("readline");

async function loadText(fname) {
  let stream = fs.createReadStream(`${__dirname}/${fname}`);
  let rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
  });

  let answer = [];
  for await (let line of rl) {
    answer.push(line.trim().toLowerCase());
  }
  console.log(`${answer.length} lines in ${fname}`);
  return answer;
}

function saveJSON(fname, data) {
  let content = `let data = ${JSON.stringify(data)};\nexport default data;`;
  fs.writeFileSync(`${__dirname}/../src/${fname}`, content);
}

async function main() {
  let collins = await loadText("collins2019.txt");
  let common = await loadText("google10k.txt");

  let valid = {};
  for (let word of collins) {
    valid[word] = 1;
  }
  saveJSON("valid.js", valid);
  console.log(`wrote ${collins.length} valid words`);

  let choices = [];
  for (let word of common) {
    if (!valid[word]) {
      continue;
    }
    choices.push(word);
  }
  saveJSON("choices.js", choices);
  console.log(`wrote ${choices.length} puzzle choices`);
}

main();
