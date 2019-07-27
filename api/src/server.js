import app from './app';
import {server as serverConfig} from './config';
import http from 'http';

const server = http.createServer(app);

server.listen(serverConfig.port, serverConfig.hostname, () => {
    console.log(`Server running at http://${serverConfig.hostname}:${serverConfig.port}/`);
});
