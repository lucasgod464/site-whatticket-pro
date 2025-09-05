// Configurações da aplicação
const AppConfig = {
    // Valores padrão (caso não sejam definidas as variáveis de ambiente)
    defaultValues: {
        whatsappNumber: '5512981156856',
        freeTrialLink: '#trial',
        contactWebhook: 'https://n8n.yuccie.pro/webhook/070b01a5-cd88-4b6a-af16-c7279e82b848'
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
    getWhatsAppLink(message = '') {
        const config = this.load();
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${config.whatsappNumber}?text=${encodedMessage}`;
    },

    // Aplica configurações na página
    applyToPage() {
        const config = this.load();
        console.log('Aplicando configurações:', config);
        
        // Atualiza todos os links de WhatsApp
        const whatsappLinks = document.querySelectorAll('.whatsapp-link');
        console.log('Links do WhatsApp encontrados:', whatsappLinks.length);
        
        whatsappLinks.forEach((link, index) => {
            const message = link.dataset.message || 'Olá! Tenho interesse no Whaticket Pro.';
            const whatsappUrl = this.getWhatsAppLink(message);
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

        // Atualiza webhook do formulário
        if (window.updateContactWebhook) {
            window.updateContactWebhook(config.contactWebhook);
        }
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