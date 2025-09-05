const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 5000;

// Função para servir arquivos estáticos
function serveStaticFile(filePath, res) {
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.ico':
            contentType = 'image/x-icon';
            break;
    }
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error');
            }
        } else {
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*'
            });
            res.end(content);
        }
    });
}

// Criar servidor
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    // API endpoint para configurações
    if (pathname === '/api/config') {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        
        // Lê variáveis de ambiente e retorna como JSON
        const config = {
            WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER || '5512981156856',
            FREE_TRIAL_LINK: process.env.FREE_TRIAL_LINK || 'https://meu-teste-gratis.com/cadastro',
            CONTACT_WEBHOOK_URL: process.env.CONTACT_WEBHOOK_URL || 'https://n8n.yuccie.pro/webhook/070b01a5-cd88-4b6a-af16-c7279e82b848'
        };
        
        res.end(JSON.stringify(config));
        return;
    }
    
    // Serve arquivos estáticos
    let filePath = '.' + pathname;
    if (pathname === '/') {
        filePath = './index.html';
    }
    
    serveStaticFile(filePath, res);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor rodando em http://0.0.0.0:${PORT}`);
    console.log(`📡 API de configuração: http://0.0.0.0:${PORT}/api/config`);
    console.log(`🔧 Variáveis de ambiente carregadas:`);
    console.log(`   WHATSAPP_NUMBER: ${process.env.WHATSAPP_NUMBER || '5512981156856'}`);
    console.log(`   FREE_TRIAL_LINK: ${process.env.FREE_TRIAL_LINK || 'https://meu-teste-gratis.com/cadastro'}`);
    console.log(`   CONTACT_WEBHOOK_URL: ${process.env.CONTACT_WEBHOOK_URL || 'https://n8n.yuccie.pro/webhook/070b01a5-cd88-4b6a-af16-c7279e82b848'}`);
});