import app from './app';
import config from './config';
import http from 'http';

const server = http.createServer(app);

server.listen(config.server.port, config.server.hostname, () => {
    console.log(`Server running at http://${config.server.hostname}:${config.server.port}/`);
});
