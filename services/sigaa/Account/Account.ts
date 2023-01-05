import { Account, StudentBond } from "sigaa-api";
import { StudentBondWithAdditionalProps } from "./Bond/Bond";
import logger from "@services/logger";
import cacheService from "@lib/cache";
import { IBondDTOProps } from "@DTOs/BondDTO";

export class AccountService {
  constructor(
    private account: Account,
    private username: string,
    private JSESSIONID: string
  ) {}

  async getFullname() {
    const fullName = await this.account.getName();
    return fullName;
  }

  async getProfilePictureURL() {
    const noPictureURL = new URL(
      "https://sigaa.ifsc.edu.br/sigaa/img/no_picture.png"
    );
    const profilePictureURL =
      (await this.account.getProfilePictureURL()) ?? noPictureURL;
    return profilePictureURL;
  }

  async getEmails() {
    const emails = await this.account.getEmails();
    return emails;
  }

  async getSpecificBond(registration: string, active: boolean) {
    logger.log("AccountService", "Getting specific bond", {registration, active});
    let bonds: StudentBondWithAdditionalProps[];
    if (active === true) bonds = await this.getActiveBonds();
    else bonds = await this.getInactiveBonds();
    const bond = bonds.find((bond) => bond.registration === registration);
    logger.log("AccountService", "found bond", {});
    return bond;
  }

  async getActiveBonds(): Promise<StudentBondWithAdditionalProps[]> {
    logger.log("AccountService", "Getting active bonds", {});
    const activeBonds = await this.account.getActiveBonds();
    const studentActiveBonds = activeBonds.filter(
      (bond) => bond.type === "student"
    ) as StudentBond[];
    logger.log("AccountService", "Active bonds", {});
    return await this.addAdditionalPropsToBonds(studentActiveBonds, true);
  }

  async getInactiveBonds(): Promise<StudentBondWithAdditionalProps[]> {
    logger.log("AccountService", "Getting inactive bonds", {});
    const inactiveBonds = await this.account.getInactiveBonds();
    const studentInactiveBonds = inactiveBonds.filter(
      (bond) => bond.type === "student"
    ) as StudentBond[];
    logger.log("AccountService", "Inactive bonds", {});
    return await this.addAdditionalPropsToBonds(studentInactiveBonds, false);
  }
  private async addAdditionalPropsToBonds(
    bonds: StudentBond[],
    active: boolean
  ) {
    logger.log("AccountService", "Adding additional props to bond", {});
    const bondsWithAdditionalProps: StudentBondWithAdditionalProps[] = [];
    for (const bond of bonds) {
      const cache = cacheService.get<IBondDTOProps>(bond.registration);
      let period: string;
      let campus: string;
      if (cache) {
        logger.log("AccountService", "got period and campus from cache", {});
        period = cache.period;
        campus = cache.campus;
      } else {
        period = await bond.getCurrentPeriod();
        logger.log("AccountService", "got period", {});
        campus = await bond.getCampus();
        logger.log("AccountService", "got campus", {});
        cacheService.set(bond.registration, { period, campus });
      }
      bondsWithAdditionalProps.push(
        Object.assign(bond, { period, campus, active })
      );
    }
    return bondsWithAdditionalProps;
  }

  getJSESSIONID() {
    return this.JSESSIONID;
  }
  getUsername() {
    return this.username;
  }
}
