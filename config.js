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
        
        // Atualiza todos os links de WhatsApp
        document.querySelectorAll('.whatsapp-link').forEach(link => {
            const message = link.dataset.message || 'Olá! Tenho interesse no Whaticket Pro.';
            link.href = this.getWhatsAppLink(message);
        });

        // Atualiza todos os links de teste grátis
        document.querySelectorAll('.free-trial-link').forEach(link => {
            link.href = config.freeTrialLink;
        });

        // Atualiza webhook do formulário
        if (window.updateContactWebhook) {
            window.updateContactWebhook(config.contactWebhook);
        }
    }
};

// Executa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    AppConfig.applyToPage();
});

// Também executa se o DOM já estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', AppConfig.applyToPage);
} else {
    AppConfig.applyToPage();
}