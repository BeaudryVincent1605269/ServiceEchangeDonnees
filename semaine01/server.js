const http = require('http'); // Using ou #include

const server = http.createServer((request,response) => {

    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Bon matin premier serveur.');
    console.log(request);
});

server.listen(420, '127.0.0.1', () => {
    console.log('Le serveur est ready to go pogo')
})