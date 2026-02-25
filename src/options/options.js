let currentConfig = { version: "1.0.0", isEnabled: true, rules: [] };

// Elementos da DOM
const ruleForm = document.getElementById("ruleForm");
const accountIdInput = document.getElementById("accountId");
const aliasInput = document.getElementById("alias");
const colorHexInput = document.getElementById("colorHex");
const rulesBody = document.getElementById("rulesBody");
const emptyState = document.getElementById("emptyState");
const rulesTable = document.getElementById("rulesTable");
const importBtn = document.getElementById("importBtn");
const exportBtn = document.getElementById("exportBtn");
const fileInput = document.getElementById("fileInput");
const statusMessage = document.getElementById("statusMessage");

// Notificação toast na tela
function showStatus(msg) {
    statusMessage.innerText = msg;
    statusMessage.classList.add("show");
    setTimeout(() => statusMessage.classList.remove("show"), 3000);
}

// Força o ID da conta a ter apenas números enquanto o logista digita
accountIdInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 12);
});

// Puxa as regras salvas
function loadRules() {
    chrome.storage.sync.get(['borderGuardConfig'], (result) => {
        if (result.borderGuardConfig) {
            currentConfig = result.borderGuardConfig;
        }
        renderRules();
    });
}

// Salva e reflete novo estado
function saveRules(successMsg = "Processado com sucesso!") {
    chrome.storage.sync.set({ borderGuardConfig: currentConfig }, () => {
        renderRules();
        showStatus(successMsg);
    });
}

// Renderiza a tabela do CRUD
function renderRules() {
    rulesBody.innerHTML = "";

    if (!currentConfig.rules || currentConfig.rules.length === 0) {
        emptyState.style.display = "block";
        rulesTable.style.display = "none";
        return;
    }

    emptyState.style.display = "none";
    rulesTable.style.display = "table";

    currentConfig.rules.forEach((rule, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
      <td>${rule.accountId}</td>
      <td><strong>${rule.alias}</strong></td>
      <td><span class="color-preview" style="background-color: ${rule.colorHex};"></span>${rule.colorHex}</td>
      <td>
        <button class="danger-text" data-index="${index}">Remover</button>
      </td>
    `;
        rulesBody.appendChild(tr);
    });

    // Attach delete events aos botoes gerados
    document.querySelectorAll(".danger-text").forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = e.target.getAttribute("data-index");
            currentConfig.rules.splice(idx, 1);
            saveRules("Regra removida!");
        });
    });
}

// Adicionar ou Atualizar Regra
ruleForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const accountId = accountIdInput.value.trim();
    const alias = aliasInput.value.trim();
    const colorHex = colorHexInput.value;

    if (accountId.length !== 12) {
        alert("O Account ID precisa ter exatamente 12 números.");
        return;
    }

    const existingIdx = currentConfig.rules.findIndex(r => r.accountId === accountId);

    // Upsert (Se a conta já existe só muda cor/alias, se não inclue)
    if (existingIdx >= 0) {
        currentConfig.rules[existingIdx] = { accountId, alias, colorHex };
    } else {
        currentConfig.rules.push({ accountId, alias, colorHex });
    }

    saveRules("Conta adicionada/atualizada e abas recarregadas!");
    accountIdInput.value = "";
    aliasInput.value = "";
});

// FT2.3 Download Json
exportBtn.addEventListener("click", () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentConfig, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "aws-border-guard-regras.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    showStatus("Regras exportadas!");
});

// FT2.3 Upload Json
importBtn.addEventListener("click", () => fileInput.click()); // Aciona input file escondido

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const imported = JSON.parse(event.target.result);
            if (!imported.rules || !Array.isArray(imported.rules)) {
                throw new Error("Formato inválido. O JSON deve conter um array 'rules'.");
            }
            currentConfig = imported;
            saveRules("Regras importadas com sucesso!");
        } catch (err) {
            alert("Erro ao importar o arquivo: " + err.message);
        }
        fileInput.value = ""; // Limpa input pro proximo uso
    };
    reader.readAsText(file);
});

// Boot app
document.addEventListener('DOMContentLoaded', loadRules);
