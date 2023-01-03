import { Sigaa, SigaaCookiesController } from "sigaa-api";
import { AccountService } from "./Account/Account";

export class AuthService {
  sigaaInstance?: Sigaa;
  async login(
    credentials: { username: string; password: string },
    url: string
  ) {
    this.sigaaInstance = new Sigaa({ url });
    const page = await this.sigaaInstance.loginInstance.login(
      credentials.username,
      credentials.password
    );
    const JSESSIONID = page.requestHeaders["Cookie"];
    const account = await this.sigaaInstance.accountFactory.getAccount(page);
    const accountService = new AccountService(
      account,
      credentials.username,
      JSESSIONID
    );
    return accountService;
  }

  async rehydrate(params: {JSESSIONID: string, username: string, url: string}) {
    const { JSESSIONID, username, url } = params;
    const { hostname } = new URL(url);
    const cookiesController = new SigaaCookiesController();
    cookiesController.storeCookies(hostname, [JSESSIONID]);
    this.sigaaInstance = new Sigaa({ url, cookiesController });
    const http = this.sigaaInstance.httpFactory.createHttp();
    const page = await http.get("/sigaa/vinculos.jsf");
    const account = await this.sigaaInstance.accountFactory.getAccount(page);
    const accountService = new AccountService(account, username, JSESSIONID);
    return accountService;
  }
  closeSession() {
    this.sigaaInstance?.close();
  }
}
