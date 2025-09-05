// Script para iniciar ambos os servidores
const { spawn } = require('child_process');

// Inicia a API
const api = spawn('node', ['api.js'], {
    stdio: 'inherit',
    env: { ...process.env, API_PORT: '3001' }
});

// Inicia o servidor HTTP
const webServer = spawn('npx', ['http-server', '-p', '5000', '-a', '0.0.0.0', '--cors', '--proxy', 'http://localhost:3001'], {
    stdio: 'inherit'
});

console.log('🚀 Iniciando servidores...');
console.log('📡 API: http://localhost:3001');
console.log('🌐 Website: http://localhost:5000');

// Lida com encerramento
process.on('SIGINT', () => {
    console.log('Encerrando servidores...');
    api.kill();
    webServer.kill();
    process.exit();
});