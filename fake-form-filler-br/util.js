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
