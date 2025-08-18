import {
  convertDateToISO,
  loremIpsum,
  loremParagraph,
  separarNome,
} from "./util.js";

/**
 * Responsável por buscar e formatar dados de pessoa fake.
 */
export class PessoaService {
  static API_URL = "https://www.4devs.com.br/ferramentas_online.php";

  /**
   * Gera uma pessoa fake usando a API 4Devs
   */
  static async gerarPessoaFake() {
    const res = await fetch(PessoaService.API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "acao=gerar_pessoa&sexo=I&pontuacao=S&idade=0&cep_estado=&txt_qtde=1&cep_cidade=&formato=json",
    });

    if (!res.ok) {
      throw new ApiError("Falha na requisição", res.status);
    }

    const data = await res.json();
    return data[0];
  }

  /**
   * Converte a resposta bruta da API para o formato usado no preenchimento do formulário
   */
  static formatarDadosPessoa(raw) {
    if (!raw?.nome) throw new FormatterError("Resposta inválida da API");

    const { primeiroNome, sobrenome } = separarNome(raw.nome);

    return {
      nomeCompleto: raw.nome,
      idate: raw.idade,
      primeiroNome,
      sobrenome,
      cpf: raw.cpf,
      rg: raw.rg,
      signo: raw.signo,
      nascimento: convertDateToISO(raw.data_nasc),
      sexo: raw.sexo,
      mae: raw.mae,
      pai: raw.pai,
      cep: raw.cep,
      endereco: raw.endereco,
      numero: raw.numero,
      bairro: raw.bairro,
      cidade: raw.cidade,
      estado: raw.estado,
      telefone: raw.telefone_fixo,
      celular: raw.celular,
      email: raw.email,
      senha: raw.senha,
      altura: raw.altura,
      tipoSanguineo: raw.tipo_sanguineo,
      cor: raw.cor,
      textarea: loremParagraph(),
      input: loremIpsum(),
    };
  }
}

/**
 * Custom errors for clarity
 */
class ApiError extends Error {
  constructor(message, status) {
    super(`${message} (status ${status})`);
    this.name = "ApiError";
  }
}

class FormatterError extends Error {
  constructor(message) {
    super(message);
    this.name = "FormatterError";
  }
}
