class LoggerService {
    private lastLogDate?: Date;
    log(method: string, message: string, data: any) {
        const date = new Date();
        const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        if (this.lastLogDate) {
            const diff = date.getTime() - this.lastLogDate.getTime();
            console.log(`[${time}] @${method} - ${message} (${diff}ms)`, data);
            this.lastLogDate = date;
            return;
        } else {
            console.log(`[${time}] @${method} - ${message}`, data);
            this.lastLogDate = date;
            return;
        }
    }
}

export default new LoggerService();