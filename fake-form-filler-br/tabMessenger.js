/**
 * Responsável por enviar mensagens para a aba ativa
 */
export class TabMessenger {
  static async enviarParaAbaAtiva(dados) {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (dados) => {
        window.postMessage({ type: "FILL_FORM", payload: dados }, "*");
      },
      args: [dados],
    });
  }
}
