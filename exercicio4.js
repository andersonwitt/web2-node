const readline = require("readline");
const uuid = require("uuid");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("digite a quantidade de uuids a serem gerados: ", (input) => {
  const value = Number(input);
  if (!Number.isNaN(value) && value > 0) {
    for (let i = 0; i < value; i++) {
      console.log(`${i + 1} - ${uuid.v4()}`);
    }
  } else {
    console.log("formato de entrada incorreto!");
  }
  rl.close();
});
