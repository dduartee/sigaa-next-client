import { Account, StudentBond } from "sigaa-api";
import { StudentBondWithAdditionalProps } from "./Bond/Bond";
import logger from "@services/logger";
import RehydrateBondFactory from "./Bond/RehydrateBondFactory";

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
      "https://sigrh.ifsc.edu.br/sigaa/img/no_picture.png"
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
    return await RehydrateBondFactory.addAdditionalPropsToBonds(studentActiveBonds, true);
  }

  async getInactiveBonds(): Promise<StudentBondWithAdditionalProps[]> {
    logger.log("AccountService", "Getting inactive bonds", {});
    const inactiveBonds = await this.account.getInactiveBonds();
    const studentInactiveBonds = inactiveBonds.filter(
      (bond) => bond.type === "student"
    ) as StudentBond[];
    logger.log("AccountService", "Inactive bonds", {});
    return await RehydrateBondFactory.addAdditionalPropsToBonds(studentInactiveBonds, false);
  }

  getJSESSIONID() {
    return this.JSESSIONID;
  }
  getUsername() {
    return this.username;
  }
}
