import { PessoaService } from "./service.js";
import { TabMessenger } from "./tabMessenger.js";

document.getElementById("fill").addEventListener("click", handleFillClick);

async function handleFillClick() {
  try {
    const pessoa = await PessoaService.gerarPessoaFake();
    const dadosFormatados = PessoaService.formatarDadosPessoa(pessoa);

    await TabMessenger.enviarParaAbaAtiva(dadosFormatados);
  } catch (error) {
    console.error("[ERRO] Falha ao preencher formulário:", error);
  }
}
