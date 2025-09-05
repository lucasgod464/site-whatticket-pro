// API simples para servir configurações
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configurações que podem ser alteradas via API
let config = {
    whatsappNumber: process.env.WHATSAPP_NUMBER || '5512981156856',
    freeTrialLink: process.env.FREE_TRIAL_LINK || 'https://meu-teste-gratis.com/cadastro',
    contactWebhook: process.env.CONTACT_WEBHOOK_URL || 'https://n8n.yuccie.pro/webhook/070b01a5-cd88-4b6a-af16-c7279e82b848',
    companyName: process.env.COMPANY_NAME || 'ArsenalCache Whaticket Pro',
    logoUrl: process.env.LOGO_URL || './attached_assets/logo 14_1757072525717.png',
    heroTitle: process.env.HERO_TITLE || 'Sistema Completo de Atendimento WhatsApp',
    heroSubtitle: process.env.HERO_SUBTITLE || 'Automatize, organize e maximize seus resultados com o sistema mais avançado do mercado',
    price: process.env.PRICE || 'R$ 495,90',
    discountText: process.env.DISCOUNT_TEXT || 'Economia de R$ 502,00'
};

// Endpoint para obter configurações
app.get('/api/config', (req, res) => {
    res.json({
        success: true,
        data: config,
        timestamp: new Date().toISOString()
    });
});

// Endpoint para atualizar configurações
app.post('/api/config', (req, res) => {
    try {
        const updates = req.body;
        
        // Atualiza apenas campos válidos
        const validFields = Object.keys(config);
        const updatedFields = {};
        
        for (const [key, value] of Object.entries(updates)) {
            if (validFields.includes(key) && value !== undefined) {
                config[key] = value;
                updatedFields[key] = value;
            }
        }
        
        res.json({
            success: true,
            message: 'Configurações atualizadas com sucesso',
            updated: updatedFields,
            data: config
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Erro ao atualizar configurações',
            error: error.message
        });
    }
});

// Endpoint para atualizar configuração específica
app.put('/api/config/:field', (req, res) => {
    try {
        const { field } = req.params;
        const { value } = req.body;
        
        if (!config.hasOwnProperty(field)) {
            return res.status(404).json({
                success: false,
                message: `Campo '${field}' não encontrado`
            });
        }
        
        config[field] = value;
        
        res.json({
            success: true,
            message: `Campo '${field}' atualizado com sucesso`,
            data: { [field]: value }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Erro ao atualizar campo',
            error: error.message
        });
    }
});

// Endpoint para resetar configurações
app.post('/api/config/reset', (req, res) => {
    config = {
        whatsappNumber: '5512981156856',
        freeTrialLink: 'https://meu-teste-gratis.com/cadastro',
        contactWebhook: 'https://n8n.yuccie.pro/webhook/070b01a5-cd88-4b6a-af16-c7279e82b848',
        companyName: 'ArsenalCache Whaticket Pro',
        logoUrl: './attached_assets/logo 14_1757072525717.png',
        heroTitle: 'Sistema Completo de Atendimento WhatsApp',
        heroSubtitle: 'Automatize, organize e maximize seus resultados com o sistema mais avançado do mercado',
        price: 'R$ 495,90',
        discountText: 'Economia de R$ 502,00'
    };
    
    res.json({
        success: true,
        message: 'Configurações resetadas para valores padrão',
        data: config
    });
});

// Endpoint de status
app.get('/api/status', (req, res) => {
    res.json({
        success: true,
        message: 'API funcionando',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 API rodando na porta ${PORT}`);
    console.log(`📡 Endpoint de configurações: http://localhost:${PORT}/api/config`);
});

module.exports = app;