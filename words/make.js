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

function uniqueLetters(word) {
  let letterSet = {};
  for (let letter of word) {
    letterSet[letter] = 1;
  }
  let letters = [];
  for (let letter in letterSet) {
    letters.push(letter);
  }
  letters.sort();
  return letters.join("");
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

  // Maps sets of letters to words that they can form using all letters
  let solutions = {};
  let count = 0;
  for (let word of common) {
    if (!valid[word]) {
      continue;
    }
    count += 1;
    let unique = uniqueLetters(word);
    if (!solutions[unique]) {
      solutions[unique] = [word];
    } else {
      solutions[unique].push(word);
    }
  }
  saveJSON("solutions.js", solutions);
  console.log(`wrote ${count} solutions`);

  // Key solutions by the length of the puzzle
  let puzzles = {};
  for (let unique in solutions) {
    if (!puzzles[unique.length]) {
      puzzles[unique.length] = [unique];
    } else {
      puzzles[unique.length].push(unique);
    }
  }
  saveJSON("puzzles.js", puzzles);
  console.log(`wrote puzzles for lengths ${Object.keys(puzzles)}`);
}

main();
