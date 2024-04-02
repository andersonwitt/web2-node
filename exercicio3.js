const readline = require("readline");
const fs = require("fs");
const { v4 } = require("uuid");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "digite uma sequencia de palavras separadas por espaco: ",
  (input) => {
    const palavras = input.split(" ").map((item) => item.trim().toLowerCase());
    const palavrasSemRepeticao = [];
    const filtrado = new Set(palavras);
    
    filtrado.forEach((item) => palavrasSemRepeticao.push(item));
    
    const json = JSON.stringify(palavrasSemRepeticao);

    fs.writeFile(`exercicio3-palavras-${v4()}.json`, json, "utf8", () => {
      console.log("arquivo salvo com sucesso!");
    });

    rl.close();
  }
);
