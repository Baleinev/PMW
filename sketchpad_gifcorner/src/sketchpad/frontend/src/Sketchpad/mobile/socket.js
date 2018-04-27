import IO from 'socket.io-client';
import CONFIG from '../../../config/default'

const network = CONFIG.network;
export default function createSocket() {
    return IO("ws://" + network.host + ":" + network.appsPort);
}
