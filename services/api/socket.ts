import { io, Socket } from 'socket.io-client';
let socket: Socket;
export const initiateSocket = () => {
  socket = io("http://localhost:5000/");
  console.log("Connecting to server...");
}

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
}
export const subscribeAllEvents = (cb: any) => {
  if (!socket) return (true);
  socket.onAny((...args) => {
    return cb(...args)
  })
}
export const subscribeEvent = (name: string, cb: any) => {
  if (!socket) return (true);
  socket.on(name, data => {
    console.log(`Received ${name} event. With data: ${data}`);
    return cb(data)
  })
}
export const sendEvent = (name: string, value?: any) => {
  if (socket) socket.emit(name, value);
}