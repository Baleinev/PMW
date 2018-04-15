import IO from 'socket.io-client';

export default function createSocket() {
  return IO(`ws://benoit-laptop:9001`);
}
