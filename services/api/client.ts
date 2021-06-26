import io from "socket.io-client";
const client = io("wss://sigaa-socket-api.herokuapp.com/");
export { client }