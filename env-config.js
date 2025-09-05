// Script para configurar variáveis de ambiente via JavaScript
// Este arquivo pode ser usado para definir configurações específicas do ambiente

// Configurações padrão (podem ser sobrescritas)
window.ENV = {
    WHATSAPP_NUMBER: '5512981156856',
    FREE_TRIAL_LINK: 'https://meu-teste-gratis.com/cadastro',
    CONTACT_WEBHOOK_URL: 'https://n8n.yuccie.pro/webhook/070b01a5-cd88-4b6a-af16-c7279e82b848'
};

// Para usar com variáveis de ambiente do servidor, descomente as linhas abaixo:
// window.ENV = {
//     WHATSAPP_NUMBER: '${WHATSAPP_NUMBER}',
//     FREE_TRIAL_LINK: '${FREE_TRIAL_LINK}',
//     CONTACT_WEBHOOK_URL: '${CONTACT_WEBHOOK_URL}'
// };