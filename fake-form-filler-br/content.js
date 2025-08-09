const strategies = {
  checkbox: (input, dados) => {
    input.checked = true;
  },

  radio: (input, dados) => {
    const sexo = (dados.sexo || "").toLowerCase();
    const masc = ["m", "masc", "masculino"];
    const fem = ["f", "fem", "feminino"];

    document
      .querySelectorAll(`input[type="radio"][name="${input.name}"]`)
      .forEach((radio) => {
        const val = radio.value.toLowerCase();
        if (
          (masc.includes(sexo) && masc.includes(val)) ||
          (fem.includes(sexo) && fem.includes(val))
        ) {
          radio.checked = true;
        }
      });
  },

  sobrenome: (input, dados) => (input.value = dados.sobrenome),
  primeiro_nome: (input, dados) => (input.value = dados.primeiroNome),
  nome_completo: (input, dados) => (input.value = dados.nomeCompleto || ""),
  mae: (input, dados) => (input.value = dados.mae),
  pai: (input, dados) => (input.value = dados.pai),
  cpf: (input, dados) => (input.value = dados.cpf),
  rg: (input, dados) => (input.value = dados.rg),
  nascimento: (input, dados) => (input.value = dados.nascimento),
  endereco: (input, dados) => (input.value = dados.endereco),
  numero: (input, dados) => (input.value = dados.numero),
  bairro: (input, dados) => (input.value = dados.bairro),
  cidade: (input, dados) => (input.value = dados.cidade),
  estado: (input, dados) => (input.value = dados.estado),
  cep: (input, dados) => (input.value = dados.cep),
  senha: (input, dados) => (input.value = dados.senha || "123456"),
  telefone: (input, dados) => (input.value = dados.telefone),
  celular: (input, dados) => (input.value = dados.celular),
  email: (input, dados) => (input.value = dados.email),
};

function getStrategy(input, ref) {
  if (strategies[input.type]) return strategies[input.type];

  if (ref.includes("sobrenome")) return strategies.sobrenome;
  if (
    ref.includes("primeiro") ||
    (ref.includes("nome") && !ref.includes("sobrenome"))
  )
    return strategies.primeiro_nome;
  if (
    ref.includes("nome") &&
    !ref.includes("mae") &&
    !ref.includes("pai") &&
    !ref.includes("primeiro") &&
    !ref.includes("sobrenome")
  )
    return strategies.nome_completo;

  if (ref.includes("mae")) return strategies.mae;
  if (ref.includes("pai")) return strategies.pai;
  if (ref.includes("cpf")) return strategies.cpf;
  if (ref.includes("rg")) return strategies.rg;
  if (ref.includes("nasc")) return strategies.nascimento;
  if (ref.includes("endereco") || ref.includes("logradouro"))
    return strategies.endereco;
  if (ref.includes("numero")) return strategies.numero;
  if (ref.includes("bairro")) return strategies.bairro;
  if (ref.includes("cidade")) return strategies.cidade;
  if (ref.includes("estado") || ref.includes("uf")) return strategies.estado;
  if (ref.includes("cep")) return strategies.cep;
  if (ref.includes("password") || ref.includes("senha"))
    return strategies.senha;
  if (ref.includes("telefone")) return strategies.telefone;
  if (ref.includes("celular")) return strategies.celular;
  if (ref.includes("email")) return strategies.email;

  // fallback por tipo
  if (input.type === "email") return strategies.email;
  if (input.type === "tel") return strategies.celular;

  return null;
}

window.addEventListener("message", (event) => {
  if (event.data.type !== "FILL_FORM") return;

  const dados = event.data.payload;
  const inputs = document.querySelectorAll("input, textarea, select");

  inputs.forEach((input) => {
    const ref = (
      input.name ||
      input.id ||
      input.placeholder ||
      ""
    ).toLowerCase();
    const strategy = getStrategy(input, ref);

    if (strategy) {
      strategy(input, dados);
    }
  });

  console.log("Formulário preenchido com:", dados);
});
