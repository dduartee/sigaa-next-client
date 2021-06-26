import { UserCredentials } from '@types';
import { Socket } from 'socket.io-client';
class User {
    client: Socket;
    constructor(client: Socket) {
        this.client = client;
    }
    login(credentials: UserCredentials) {
        this.client.emit('user::login', credentials)
    }
    getInfo(token: string) {
        this.client.emit('user::info', { token })
    }
    logoff(token: string) {
        this.client.emit('user::logoff', { token })
    }
}

export default User;