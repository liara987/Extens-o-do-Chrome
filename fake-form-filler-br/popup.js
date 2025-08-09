import { convertDateToISO, separarNome } from "./util.js";

document.getElementById("fill").addEventListener("click", handleFillClick);

async function handleFillClick() {
  try {
    const pessoa = await gerarPessoaFake();
    const dadosFormatados = formatarDadosPessoa(pessoa);

    await enviarParaAbaAtiva(dadosFormatados);
  } catch (error) {
    console.error("[ERRO] Falha ao preencher formulário:", error);
  }
}

/**
 * Faz requisição para API do 4Devs e retorna um objeto pessoa
 */
async function gerarPessoaFake() {
  const res = await fetch("https://www.4devs.com.br/ferramentas_online.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "acao=gerar_pessoa&sexo=I&pontuacao=S&idade=0&cep_estado=&txt_qtde=1&cep_cidade=&formato=json",
  });

  if (!res.ok) throw new Error(`Falha na requisição: ${res.status}`);

  const data = await res.json();

  return data[0];
}

/**
 * Converte a resposta bruta da API para o formato usado no preenchimento do formulário
 */
function formatarDadosPessoa({
  nome,
  cpf,
  rg,
  data_nasc,
  sexo,
  mae,
  pai,
  cep,
  endereco,
  numero,
  bairro,
  cidade,
  estado,
  telefone_fixo,
  celular,
  email,
  senha,
}) {
  const { primeiroNome, sobrenome } = separarNome(nome);

  return {
    nomeCompleto: nome,
    primeiroNome,
    sobrenome,
    cpf,
    rg,
    nascimento: convertDateToISO(data_nasc),
    sexo,
    mae,
    pai,
    cep,
    endereco,
    numero,
    bairro,
    cidade,
    estado,
    telefone: telefone_fixo,
    celular,
    email,
    senha,
  };
}

/**
 * Envia os dados para o script da aba ativa
 */
async function enviarParaAbaAtiva(dados) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (dados) => {
      window.postMessage({ type: "FILL_FORM", payload: dados }, "*");
    },
    args: [dados],
  });
}
