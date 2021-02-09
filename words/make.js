// Run this with node

let fs = require("fs");
let readline = require("readline");

async function loadText(fname) {
  let stream = fs.createReadStream(`${__dirname}/${fname}`);
  let rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
  });

  let count = 0;
  for await (let line of rl) {
    count += 1;
  }
  console.log(`${count} lines in ${fname}`);
}

loadText("collins2019.txt");
loadText("google10k.txt");
