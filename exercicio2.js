const readline = require("node:readline/promises");
const request = require("request");
const fs = require("fs");
const util = require("util");

const pfs = {
  readFile: util.promisify(fs.readFile),
  writeFile: util.promisify(fs.writeFile),
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function doRequest(url) {
  return new Promise(function (resolve, reject) {
    request(url, function (error, res, body) {
      if (!error && res.statusCode === 200) {
        resolve(JSON.parse(body));
      } else {
        reject(error);
      }
    });
  });
}

async function run() {
  let globalInput = "";
  let heroesToBeSaved = [];

  while (globalInput !== "0") {
    //999 Não existe o máximo que tem na api é até 499
    const answer = await rl.question(
      "digite de 1 a 499 para ler seu heroi ou 0 para sair: "
    );

    globalInput = answer;

    if (Number(globalInput) === 0 || Number.isNaN(globalInput)) {
      rl.close();
      break;
    }

    //999 Não existe o máximo que tem na api é até 499
    if (
      Number(globalInput) > 0 &&
      Number(globalInput) <= 499 &&
      !heroesToBeSaved.includes(Number(globalInput))
    ) {
      heroesToBeSaved.push(Number(globalInput));
    } else {
      console.log("Entrada inválida ou já inserida.");
    }
  }

  if (heroesToBeSaved.length) {
    const heroesPromises = heroesToBeSaved.map((hero) =>
      doRequest(`https://akabab.github.io/superhero-api/api/id/${hero}.json`)
    );
    const heroes = await Promise.all(heroesPromises);

    heroes.forEach((hero, index) => {
      console.log(`\n\n Heroi: ${index + 1}`);
      console.log("id:", hero.id);
      console.log("name:", hero.name);
      console.log("slug:", hero.slug);
      console.log("race:", hero.appearance.race);
      console.log("image:", hero.images.md);
    });

    for (const hero of heroes) {
      try {
        console.log(`exercicio-2-hero-${hero.id}.json salvo com sucesso!`);
        const json = JSON.stringify(hero);
        const fileName = `exercicio-2-hero-${hero.id}.json`;
        await pfs.writeFile(fileName, json, "utf8");
      } catch (e) {
        console.log(`erro ao salvar exercicio-2-hero-${hero.id}.json!`);
        console.log(`erro: ${e.message}`);
      }
    }
  }
}

run();
