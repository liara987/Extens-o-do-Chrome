/**
 * Converte uma data em formato ISO que é aceito pelo campo de data dos navegadores.
 * @param {string} dataStr - A data em formato de string.
 * @returns { dataIso: string }
 * A data padronizada no formato de ano/mes/dia.
 */
export function convertDateToISO(date) {
  const [dia, mes, ano] = date.split("/");
  return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
}

/**
 * Separa um nome completo em primeiro nome e sobrenome(s).
 * @param {string} nomeCompleto - O nome completo.
 * @returns {{ primeiroNome: string, sobrenome: string }}
 * Objeto com o primeiro nome e o sobrenome (restante).
 */
export function separarNome(nomeCompleto) {
  if (!nomeCompleto || typeof nomeCompleto !== "string") {
    return { primeiroNome: "", sobrenome: "" };
  }

  const partes = nomeCompleto.trim().split(/\s+/);

  const primeiroNome = partes.shift() || "";
  const sobrenome = partes.join(" ") || "";

  return { primeiroNome: primeiroNome, sobrenome: sobrenome };
}

const words = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "ut",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "ut",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "dolor",
  "in",
  "reprehenderit",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "eu",
  "fugiat",
  "nulla",
  "pariatur",
];

/**
 * Gera uma frase Lorem Ipsum.
 * @param {number} wordCount - quantidade de palavras (default: 10)
 * @returns {string}
 */
export function loremIpsum(wordCount = 10) {
  let text = [];
  for (let i = 0; i < wordCount; i++) {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    text.push(randomWord);
  }

  // Deixa maiúsculo a primeira palavra e adiciona ponto final
  let sentence = text.join(" ");
  sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
  return sentence;
}

/**
 * Gera um parágrafo Lorem Ipsum.
 * @param {number} sentenceCount - número de frases (default: 5)
 * @returns {string}
 */
export function loremParagraph(sentenceCount = 5) {
  let paragraph = [];
  for (let i = 0; i < sentenceCount; i++) {
    const wordsPerSentence = Math.floor(Math.random() * 8) + 8; // 8 a 15 palavras
    paragraph.push(loremIpsum(wordsPerSentence));
  }
  return paragraph.join(" ");
}
