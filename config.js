// Configurações da aplicação
const AppConfig = {
    // Valores padrão (caso não sejam definidas as variáveis de ambiente)
    defaultValues: {
        whatsappNumber: '5512981156856',
        freeTrialLink: '#trial',
        contactWebhook: 'https://n8n.yuccie.pro/webhook/070b01a5-cd88-4b6a-af16-c7279e82b848'
    },
    
    // Cache das configurações
    configCache: null,
    lastFetch: 0,
    cacheTime: 30000, // 30 segundos

    // Carrega configurações da API ou usa valores padrão
    async loadFromAPI() {
        try {
            // Verifica se o cache ainda é válido
            const now = Date.now();
            if (this.configCache && (now - this.lastFetch) < this.cacheTime) {
                return this.configCache;
            }
            
            const response = await fetch('/api/config');
            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    this.configCache = result.data;
                    this.lastFetch = now;
                    console.log('✅ Configurações carregadas da API:', result.data);
                    return result.data;
                }
            }
        } catch (error) {
            console.log('⚠️ Erro ao carregar da API, usando valores locais:', error.message);
        }
        
        // Fallback para configurações locais
        return this.load();
    },

    // Carrega configurações do backend ou usa valores padrão
    load() {
        return {
            whatsappNumber: window.ENV?.WHATSAPP_NUMBER || this.defaultValues.whatsappNumber,
            freeTrialLink: window.ENV?.FREE_TRIAL_LINK || this.defaultValues.freeTrialLink,
            contactWebhook: window.ENV?.CONTACT_WEBHOOK_URL || this.defaultValues.contactWebhook
        };
    },

    // Formata número do WhatsApp para link
    getWhatsAppLink(message = '', config = null) {
        if (!config) config = this.load();
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${config.whatsappNumber}?text=${encodedMessage}`;
    },

    // Aplica configurações na página
    async applyToPage() {
        const config = await this.loadFromAPI();
        console.log('Aplicando configurações:', config);
        
        // Atualiza todos os links de WhatsApp
        const whatsappLinks = document.querySelectorAll('.whatsapp-link');
        console.log('Links do WhatsApp encontrados:', whatsappLinks.length);
        
        whatsappLinks.forEach((link, index) => {
            const message = link.dataset.message || 'Olá! Tenho interesse no Whaticket Pro.';
            const whatsappUrl = this.getWhatsAppLink(message, config);
            link.href = whatsappUrl;
            console.log(`Link ${index + 1} atualizado para:`, whatsappUrl);
        });

        // Atualiza todos os links de teste grátis
        const freeTrialLinks = document.querySelectorAll('.free-trial-link');
        console.log('Links de teste grátis encontrados:', freeTrialLinks.length);
        
        freeTrialLinks.forEach((link, index) => {
            link.href = config.freeTrialLink;
            console.log(`Link teste grátis ${index + 1} atualizado para:`, config.freeTrialLink);
        });

        // Atualiza conteúdo dinâmico da página
        this.updatePageContent(config);

        // Atualiza webhook do formulário
        if (window.updateContactWebhook) {
            window.updateContactWebhook(config.contactWebhook);
        }
    },
    
    // Atualiza conteúdo dinâmico da página
    updatePageContent(config) {
        // Atualiza títulos se existirem na configuração
        if (config.heroTitle) {
            const heroTitles = document.querySelectorAll('[data-config="hero-title"]');
            heroTitles.forEach(el => el.textContent = config.heroTitle);
        }
        
        if (config.heroSubtitle) {
            const heroSubtitles = document.querySelectorAll('[data-config="hero-subtitle"]');
            heroSubtitles.forEach(el => el.textContent = config.heroSubtitle);
        }
        
        if (config.price) {
            const priceElements = document.querySelectorAll('[data-config="price"]');
            priceElements.forEach(el => el.textContent = config.price);
        }
        
        if (config.companyName) {
            const companyElements = document.querySelectorAll('[data-config="company-name"]');
            companyElements.forEach(el => el.textContent = config.companyName);
        }
        
        console.log('📄 Conteúdo da página atualizado via API');
    }
};

// Função para executar as configurações
function initializeAppConfig() {
    console.log('Inicializando configurações da aplicação...');
    if (typeof AppConfig !== 'undefined') {
        AppConfig.applyToPage();
    } else {
        console.log('AppConfig não está definido ainda');
    }
}

// Executa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initializeAppConfig);

// Também executa se o DOM já estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAppConfig);
} else {
    // Adiciona um pequeno delay para garantir que todos os scripts carregaram
    setTimeout(initializeAppConfig, 100);
}

// Função global para reconfigurar manualmente se necessário
window.reinitializeLinks = function() {
    AppConfig.applyToPage();
};