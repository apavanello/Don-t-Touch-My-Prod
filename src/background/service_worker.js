// Estado vazio padrão (Empty State)
const DEFAULT_CONFIG = {
  version: "1.0.0",
  isEnabled: true,
  rules: []
};

// Listener de inicialização: Define o estado padrão caso não exista
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['borderGuardConfig'], (result) => {
    if (!result.borderGuardConfig) {
      chrome.storage.sync.set({ borderGuardConfig: DEFAULT_CONFIG });
      console.log("Border Guard: Configuração default inicializada com sucesso.");
    }
  });
});

// Listener de mudança no Storage: Observa alterações feitas na tela de Options
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.borderGuardConfig) {
    console.log("Border Guard: Configurações atualizadas. Notificando abas da AWS ativas...");
    
    // Procura por todas as abas abertas que correspondam ao console AWS
    chrome.tabs.query({ url: "*://*.console.aws.amazon.com/*" }, (tabs) => {
      for (let tab of tabs) {
        // Despacha mensagem com a nova configuração para os Content Scripts
        chrome.tabs.sendMessage(tab.id, { 
          action: "RELOAD_CONFIGS", 
          config: changes.borderGuardConfig.newValue 
        }).catch(() => {
          // Ignora erros se a aba não estiver pronta para receber a mensagem
        });
      }
    });
  }
});
