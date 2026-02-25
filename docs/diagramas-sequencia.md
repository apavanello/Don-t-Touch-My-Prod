# AWS Environment Border Guard 🛡️ - Diagramas de Sequência

Detalhando a troca de mensagens rigorosa entre os scripts da extensão (Background, Content, e UI) conforme as diretrizes do Manifest V3 do Chrome.

## 1. Sequência: Inicialização e Pintura da Página
O momento exato em que o desenvolvedor entra na AWS e a extensão age para injetar o CSS.

```mermaid
sequenceDiagram
    autonumber
    
    actor User as Desenvolvedor
    participant AWS as Aba: AWS Console
    participant CS as Content Script (page_injector.js)
    participant Chrome as API: chrome.storage
    
    User->>AWS: Acessa console.aws.amazon.com
    AWS->>CS: Dispara evento onLoad (DOM Ready)
    
    CS->>Chrome: storage.sync.get('borderGuardConfig')
    Chrome-->>CS: Retorna Objeto JSON de Regras
    
    loop MutationObserver contínuo
        CS->>AWS: Lê elementos HTML específicos do Cabeçalho
        alt Encontrou Header e Account
            CS->>CS: Faz parser (Regex) do Account ID (ex: 123412341234)
            CS->>CS: Tenta dar match da Conta e Região no Objeto JSON
            alt Match Encontrado
                CS->>AWS: Injeta <div id="bg-border"> (ColorHex aplicada)
                CS->>AWS: Injeta <div id="bg-badge"> (Alias + Region + ColorHex)
            else Regra Inexistente
                CS->>AWS: Remove os nós "bg-border" e "bg-badge" se existirem na aba
            end
        else DOM ainda não carregou a div
            CS->>CS: Segue aguardando próximas mutações do React/Angular da AWS...
        end
    end
```

## 2. Sequência: Atualização de Regra com Abas Abertas
Trata o "Edge Case" onde o usuário altera uma cor enquanto está com 5 abas da AWS abertas no fundo e prevê que a cor atualize sem dar F5.

```mermaid
sequenceDiagram
    autonumber
    actor User as Desenvolvedor
    participant Opt as Options UI (HTML)
    participant Chrome as API: chrome.storage
    participant SW as Service Worker (background.js)
    participant CS as Content Script (em múltiplas abas AWS)

    User->>Opt: Muda a cor de uma conta e clica Salvar
    Opt->>Chrome: storage.sync.set()
    Chrome-->>Opt: Sucesso Callback
    Opt-->>User: Exibe toast/notificação de sucesso
    
    Chrome->>SW: Dispara evento 'onChanged'
    SW->>SW: Acorda o worker (Manifest V3 lifecycle constraints)
    
    SW->>Chrome: chrome.tabs.query({url: "*.aws.amazon.com/*"})
    Chrome-->>SW: Retorna lista das abas alvo abertas
    
    loop Para cada aba da AWS
        SW->>CS: chrome.tabs.sendMessage("RELOAD_CONFIGS")
    end
    
    CS->>Chrome: storage.sync.get()
    Chrome-->>CS: Novo JSON com a nova cor
    CS->>CS: Reprocessa e repinta o DOM instantaneamente!
```
