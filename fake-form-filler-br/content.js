const strategies = {
  sobrenome: (input, dados) => (input.value = dados.sobrenome || "sobrenome"),
  primeiro_nome: (input, dados) => (input.value = dados.primeiroNome || "primeiroNome"),
  nome_completo: (input, dados) => (input.value = dados.nomeCompleto || "nomeCompleto"),
  mae: (input, dados) => (input.value = dados.mae || "mae"),
  pai: (input, dados) => (input.value = dados.pai || "pai"),
  cpf: (input, dados) => (input.value = dados.cpf || "529.982.247-25"),
  rg: (input, dados) => (input.value = dados.rg || "18.237.365-4"),
  nascimento: (input, dados) => (input.value = dados.nascimento || new Date.toISOString().slice(0, 10)),
  endereco: (input, dados) => (input.value = dados.endereco || "Rua Exemplo"),
  numero: (input, dados) => (input.value = dados.numero || "123"),
  bairro: (input, dados) => (input.value = dados.bairro || "Bairro Exemplo"),
  cidade: (input, dados) => (input.value = dados.cidade || "Cidade Exemplo"),
  estado: (input, dados) => (input.value = dados.estado || "SP"),
  cep: (input, dados) => (input.value = dados.cep || "12345-678"),
  senha: (input, dados) => (input.value = dados.senha || "123456"),
  telefone: (input, dados) => (input.value = dados.telefone || "11 91234-5678"),
  celular: (input, dados) => (input.value = dados.celular || "11 91234-5678"),
  email: (input, dados) => (input.value = dados.email || "usuario@gmail.com"),
  idade: (input, dados) => (input.value = dados.idade || 18),
  signo: (input, dados) => (input.value = dados.signo || "aries"),
  altura: (input, dados) => (input.value = dados.altura || "1.75"),
  peso: (input, dados) => (input.value = dados.peso || "70"),
  tipoSanguineo: (input, dados) => (input.value = dados.tipoSanguineo || "O+"),
  cor: (input, dados) => (input.value = dados.cor || "preto"),
  textarea: (input, dados) => (input.value = dados.textarea || "Lorem ipsum"),
  input: (input, dados) => (input.value = dados.input || "Lorem ipsum"),
  checkbox: (input) => (input.checked = true),
  radio: (input, dados) => {
    const sexo = (dados.sexo || "").toLowerCase();

    document.querySelectorAll(`input[type="radio"][name="${input.name}"]`).forEach((radio) => {
      const val = radio.value.toLowerCase();

      if (isGenderMatch(sexo, val)) {
        radio.checked = true;
      }
    });
  },
  select: (input) => {
    const options = Array.from(input.options);
    const index = generateRandomIntFromInterval(options.length - 1, 0);
    const selectedOption = options[index];

    input.value = selectedOption.value;
  },
  number: (input) => {
    input.value = generateRandomIntFromInterval(1000, 1);
  },
};

function generateRandomIntFromInterval(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isFullNameField(ref) {
  return (
    (ref.includes("completo") || ref.includes("full")) &&
    !ref.includes("mae") &&
    !ref.includes("pai") &&
    !ref.includes("primeiro") &&
    !ref.includes("sobrenome")
  );
}

function isFirstNameField(ref) {
  return (
    ref.includes("primeiro") || ref.includes("first") || ((ref.includes("nome") || ref.includes("name")) && !ref.includes("sobrenome"))
  );
}

function isAddressField(ref) {
  return ref.includes("endereco") || ref.includes("logradouro") || ref.includes("address");
}

function isPasswordField(ref) {
  return ref.includes("senha") || ref.includes("password");
}

function isStateField(ref) {
  return ref.includes("estado") || ref.includes("uf") || ref.includes("state");
}

function isGenderMatch(sexo, val) {
  const masc = ["m", "masc", "masculino"];
  const fem = ["f", "fem", "feminino"];
  return (masc.includes(sexo) && masc.includes(val)) || (fem.includes(sexo) && fem.includes(val));
}

function isPhoneField(input) {
  return input.type === "tel" || input.id.includes("tel") || input.id.includes("mob");
}

function fillByRef(input, ref) {
  if (strategies[input.type]) return strategies[input.type];

  if (isFullNameField(ref)) return strategies.nome_completo;
  else {
    if (ref.includes("sobrenome") || ref.includes("lastname")) return strategies.sobrenome;
    if (isFirstNameField(ref)) return strategies.primeiro_nome;
  }
  if (ref.includes("mae") || ref.includes("mother")) return strategies.mae;
  if (ref.includes("pai") || ref.includes("father")) return strategies.pai;
  if (ref.includes("cpf")) return strategies.cpf;
  if (ref.includes("rg")) return strategies.rg;
  if (ref.includes("nasc") || ref.includes("birth")) return strategies.nascimento;
  if (ref.includes("numero") || ref.includes("number")) return strategies.numero;
  if (ref.includes("bairro") || ref.includes("neighborhood")) return strategies.bairro;
  if (ref.includes("cidade") || ref.includes("city")) return strategies.cidade;
  if (ref.includes("cep")) return strategies.cep;
  if (ref.includes("tel")) return strategies.telefone;
  if (ref.includes("celular") || ref.includes("cell")) return strategies.celular;
  if (ref.includes("email")) return strategies.email;
  if (ref.includes("idade") || ref.includes("age")) return strategies.idade;
  if (ref.includes("signo") || ref.includes("zodiac")) return strategies.signo;
  if (ref.includes("altura") || ref.includes("height")) return strategies.altura;
  if (ref.includes("peso") || ref.includes("weight")) return strategies.peso;
  if (ref.includes("tipo sanguineo") || ref.includes("blood type")) return strategies.tipoSanguineo;
  if (ref.includes("cor") || ref.includes("color")) return strategies.cor;
  if (ref.includes("senha") || ref.includes("password")) return strategies.senha;
  if (isAddressField(ref)) return strategies.endereco;
  if (isStateField(ref)) return strategies.estado;
}

function filledByType(input) {
  if (isPhoneField(input)) return strategies.celular;

  if (input.type === "text") {
    return strategies.input;
  }

  if (input.tagName.toLowerCase() === "textarea") {
    return strategies.textarea;
  }

  if (String(input.tagName).toLowerCase() === "select") {
    return strategies.select;
  }
}

function getStrategy(input, ref) {
  const byRef = fillByRef(input, ref);
  const byType = filledByType(input);
  if (byRef) return byRef;
  if (byType) return byType;
  return null;
}

window.addEventListener("message", (event) => {
  if (event.data.type !== "FILL_FORM") return;

  const dados = event.data.payload;
  const inputs = document.querySelectorAll("input, textarea, select");

  inputs.forEach((input) => {
    const ref = (input.name || input.id || input.placeholder || "").toLowerCase();
    const strategy = getStrategy(input, ref);
    if (strategy) {
      strategy(input, dados);
    }
  });
});
