# Configuração de Variáveis de Ambiente

## Como configurar WhatsApp e Link de Teste Grátis

### 1. Variáveis de Ambiente (.env)

Crie um arquivo `.env` baseado no `.env.example`:

```bash
# Número do WhatsApp (apenas números, com código do país)
WHATSAPP_NUMBER=5511999999999

# Link para o teste grátis
FREE_TRIAL_LINK=https://seu-dominio.com/teste-gratis

# URL do webhook para formulário de contato
CONTACT_WEBHOOK_URL=https://n8n.yuccie.pro/webhook/070b01a5-cd88-4b6a-af16-c7279e82b848
```

### 2. Configuração no Easypanel

No Easypanel, configure as variáveis de ambiente:

1. Acesse seu serviço
2. Vá em **Environment Variables**
3. Adicione:
   - `WHATSAPP_NUMBER`: Seu número do WhatsApp
   - `FREE_TRIAL_LINK`: Link do seu teste grátis
   - `CONTACT_WEBHOOK_URL`: URL do webhook

### 3. Configuração Manual (JavaScript)

Edite o arquivo `env-config.js`:

```javascript
window.ENV = {
    WHATSAPP_NUMBER: '5511987654321',
    FREE_TRIAL_LINK: 'https://meu-site.com/teste',
    CONTACT_WEBHOOK_URL: 'https://meu-webhook.com'
};
```

### 4. Como funciona

O sistema automaticamente:
- ✅ Atualiza todos os links do WhatsApp
- ✅ Configura botões de "Teste Grátis"
- ✅ Ajusta webhook do formulário
- ✅ Usa valores padrão se não configurado

### 5. Exemplos de uso

**WhatsApp:**
- Todos os links `.whatsapp-link` serão atualizados
- Mensagens personalizadas via `data-message`

**Teste Grátis:**
- Todos os botões `.free-trial-link` redirecionam para o link configurado

**Formulário:**
- Envia dados para o webhook configurado
- Fallback para WhatsApp em caso de erro