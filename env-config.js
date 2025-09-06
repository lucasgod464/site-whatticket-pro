// Script para configurar variáveis de ambiente via JavaScript
// Este arquivo pode ser usado para definir configurações específicas do ambiente

// Configurações padrão (podem ser sobrescritas)
window.ENV = {
    WHATSAPP_NUMBER: '5512981156856',
    FREE_TRIAL_LINK: 'https://testewhaticket.suamarca.pro/',
    CONTACT_WEBHOOK_URL: 'https://n8n.yuccie.pro/webhook/fe78628e-f915-401d-9ee7-b637f3bcc916'
};

// Para usar com variáveis de ambiente do servidor, descomente as linhas abaixo:
// window.ENV = {
//     WHATSAPP_NUMBER: '${WHATSAPP_NUMBER}',
//     FREE_TRIAL_LINK: '${FREE_TRIAL_LINK}',
//     CONTACT_WEBHOOK_URL: '${CONTACT_WEBHOOK_URL}'
// };