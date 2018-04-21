import IO from 'socket.io-client';
import React from 'react';

const network = CONFIG.network;
export default function createSocket() {
    return IO("ws://" + network.host + ":" + network.appsPort);
}
