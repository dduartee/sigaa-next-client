import {
  InstitutionType,
  Sigaa,
  SigaaCookiesController,
} from "sigaa-api";
import { AccountService } from "./Account/Account";
import logger from "@services/logger";

export class AuthService {
  sigaaInstance?: Sigaa;
  async login(
    credentials: { username: string; password: string },
    url: string,
    institution: InstitutionType,
    retry = true
  ): Promise<AccountService> {
    try {
      logger.log("AuthService:Login", "Logging in", {
        username: credentials.username,
      });
      /*const requestStackController = new SigaaRequestStack<Request, Page>();
      cacheService.set(
        `${credentials.username}-requestStackController`,
        requestStackController
      );*/
      this.sigaaInstance = new Sigaa({ url, institution  });

      const { account, JSESSIONID } = await this.attemptLogin(
        credentials,
        this.sigaaInstance
      );
      const accountService = new AccountService(
        account,
        credentials.username,
        JSESSIONID
      );
      return accountService;
    } catch (error) {
      if (retry) return this.login(credentials, url, institution, false);
      else throw error;
    }
  }

  private async attemptLogin(
    credentials: { username: string; password: string },
    sigaaInstance: Sigaa
  ) {
    const page = await sigaaInstance.loginInstance.login(
      credentials.username,
      credentials.password
    );
    logger.log("AuthService:attemptLogin", "got page", page.url.pathname);
    const JSESSIONID = page.requestHeaders["Cookie"];
    const account = await sigaaInstance.accountFactory.getAccount(page);
    logger.log("AuthService:attemptLogin", "got account", {});
    return { account, JSESSIONID };
  }
  /**
   * Metodo para preparar a instância do Sigaa
   * Injetar os cookies, e salvar o requestStackController
   */
  prepareSigaaInstance(params: {
    JSESSIONID: string;
    username: string;
    url: string;
    institution: InstitutionType
  }) {
    const { JSESSIONID, url, institution } = params;
    const { hostname } = new URL(url);
    const cookiesController = new SigaaCookiesController();
    cookiesController.storeCookies(hostname, [JSESSIONID]);
    /*const requestStackController = cacheService.get<
      SigaaRequestStack<Request, Page>
    >(`${username}-requestStackController`);
    if (!requestStackController)
      throw new Error("RequestStackController not found");*/
    return new Sigaa({
      url,
      institution,
      cookiesController,
    });
  }
  async rehydrate(params: {
    JSESSIONID: string;
    username: string;
    url: string;
    institution: InstitutionType
  }) {
    logger.log("AuthService:rehydrate", "Rehydrating session", {
      username: params.username,
    });
    this.sigaaInstance = this.prepareSigaaInstance(params);
    const http = this.sigaaInstance.httpFactory.createHttp();
    const page = await http.get("/sigaa/vinculos.jsf");
    logger.log("AuthService:rehydrate", "Rehydrated page", page.url.pathname);
    const account = await this.sigaaInstance.accountFactory.getAccount(page);
    logger.log("AuthService:rehydrate", "Rehydrated account", {});
    const accountService = new AccountService(
      account,
      params.username,
      params.JSESSIONID
    );
    return accountService;
  }
  closeSession() {
    logger.log("AuthService:closeSession", "Closing session", {});
    this.sigaaInstance?.close();
  }
  getSigaaInstance() {
    if (!this.sigaaInstance) throw new Error("Sigaa instance not found");
    return this.sigaaInstance;
  }
}
