// Serviço de Logger Verboso (SRE/Observabilidade Local Restrita)
const Logger = {
    log: (msg, data) => {
        // console.groupCollapsed deixa o console do F12 limpo, mas arquiva os dados se precisarmos debugar
        console.groupCollapsed(`🛡️ Don't Touch My Prod: ${msg}`);
        if (data) console.dir(data);
        console.groupEnd();
    },
    error: (msg, err) => {
        console.group(`🚨 Don't Touch My Prod Error: ${msg}`);
        console.error(err);
        console.groupEnd();
    }
};

// Variável global em RAM para acesso rápido às confs atuais sem bater no Storage
let currentConfig = null;

// --- UTILITÁRIOS (RNF3.2) ---
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// --- DOM PARSERS (FT1.1) ---
function getAwsAccountId() {
    // Menu da AWS possui vários IDs ao longo do tempo. Buscamos pelo container global e extraimos via Regex.
    const menuBtn = document.querySelector('#nav-usernameMenu') || document.querySelector('[data-testid="awsc-nav-account-menu-button"]');
    if (menuBtn) {
        const text = menuBtn.innerText || "";
        const match = text.match(/\b(\d{4}-?\d{4}-?\d{4})\b/);
        if (match) {
            return match[1].replace(/-/g, ''); // Normaliza sem os hifens
        }
    }
    return null;
}

function getAwsRegion() {
    const metaRegion = document.querySelector('meta[name="awsc-me-region"]');
    if (metaRegion) return metaRegion.getAttribute('content');

    const urlParams = new URLSearchParams(window.location.search);
    const regionParam = urlParams.get('region');
    if (regionParam) return regionParam;

    // Layout moderno
    const regionBtn = document.querySelector('[data-testid="awsc-nav-regions-menu-button"]');
    if (regionBtn) {
        const text = regionBtn.innerText;
        const match = text.match(/\b([a-z]{2}-[a-z]+-\d)\b/);
        if (match) return match[1];
    }

    return "Global";
}

// --- CORE LÓGICA E INJEÇÃO (FT1.2, FT1.3 e FT1.4) ---
function matchRule(accountId) {
    if (!currentConfig || !currentConfig.isEnabled || !currentConfig.rules) return null;
    return currentConfig.rules.find(r => r.accountId === accountId);
}

function drawBorder(colorHex) {
    let borderDiv = document.getElementById("bg-border-guard");
    if (!borderDiv) {
        borderDiv = document.createElement("div");
        borderDiv.id = "bg-border-guard";
        document.body.appendChild(borderDiv);
    }
    borderDiv.style.boxShadow = `inset 0 0 0 8px ${colorHex}`;
}

function drawBadge(alias, region, colorHex) {
    let badgeDiv = document.getElementById("bg-badge-guard");
    if (!badgeDiv) {
        badgeDiv = document.createElement("div");
        badgeDiv.id = "bg-badge-guard";
        document.body.appendChild(badgeDiv);
    }
    badgeDiv.style.backgroundColor = colorHex;
    badgeDiv.innerText = `${alias} [${region}]`;
}

function removeUI() {
    const borderDiv = document.getElementById("bg-border-guard");
    if (borderDiv) borderDiv.remove();
    const badgeDiv = document.getElementById("bg-badge-guard");
    if (badgeDiv) badgeDiv.remove();
}

const checkAndApply = debounce(() => {
    if (!currentConfig || !currentConfig.isEnabled) {
        removeUI();
        return;
    }

    const accountId = getAwsAccountId();
    const region = getAwsRegion();

    if (accountId) {
        const rule = matchRule(accountId);
        if (rule) {
            drawBorder(rule.colorHex);
            drawBadge(rule.alias, region, rule.colorHex);
        } else {
            removeUI();
        }
    }
}, 300);

// Setando o Observer para monitorar do SPA React/Angular da Amazon (RNF3.1)
const observer = new MutationObserver(() => {
    checkAndApply();
});

// Função assíncrona para buscar configurações do Storage
function fetchConfigAndInitialize() {
    Logger.log("Inicializando Content Script e buscando configurações...");

    chrome.storage.sync.get(['borderGuardConfig'], (result) => {
        if (chrome.runtime.lastError) {
            Logger.error("Falha ao recuperar configurações", chrome.runtime.lastError);
            return;
        }

        if (result.borderGuardConfig) {
            currentConfig = result.borderGuardConfig;
            Logger.log("Configuração carregada. Iniciando observer DOM.", currentConfig);

            observer.observe(document.body, { childList: true, subtree: true });
            checkAndApply();
        }
    });
}

// Listeners de tempo real
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "RELOAD_CONFIGS") {
        Logger.log("Nova configuração recebida via Broadcast!", request.config);
        currentConfig = request.config;
        checkAndApply(); // Repinta imediatamente sem precisar F5
    }
});

// Dá o kickstart inicial
fetchConfigAndInitialize();
