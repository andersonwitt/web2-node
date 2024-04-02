const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "digite uma sequência de numeros separados por espaço: ",
  (input) => {
    const numbers = input.split(" ").map((item) => Number(item));
    if (!numbers.some((number) => Number.isNaN(number))) {
      const sum = numbers.reduce(
        (acum, current) => (current % 2 === 0 ? acum + current : acum),
        0
      );
      console.log(`Soma dos numeros divisiveis por 2 : ${sum}`);
    } else {
      console.log("formato de entrada inválido!");
    }
    rl.close();
  }
);
