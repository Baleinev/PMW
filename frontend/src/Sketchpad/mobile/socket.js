import IO from 'socket.io-client';
const network = CONFIG.network;

export default function createSocket() {
    return IO("ws://" + network.host + ":" + network.appsPort);
}
