import { Account, StudentBond } from "sigaa-api";
import { StudentBondWithAdditionalProps } from "./Bond/Bond";

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
    let bonds: StudentBondWithAdditionalProps[];
    if (active === true) bonds = await this.getActiveBonds();
    else bonds = await this.getInactiveBonds();
    const bond = bonds.find((bond) => bond.registration === registration);
    return bond;
  }

  async getActiveBonds(): Promise<StudentBondWithAdditionalProps[]> {
    const activeBonds = await this.account.getActiveBonds();
    const studentActiveBonds = activeBonds.filter(
      (bond) => bond.type === "student"
    ) as StudentBond[];
    return await this.addAdditionalPropsToBonds(studentActiveBonds, true);
  }

  async getInactiveBonds(): Promise<StudentBondWithAdditionalProps[]> {
    const inactiveBonds = await this.account.getInactiveBonds();
    const studentInactiveBonds = inactiveBonds.filter(
      (bond) => bond.type === "student"
    ) as StudentBond[];
    return await this.addAdditionalPropsToBonds(studentInactiveBonds, false);
  }
  private async addAdditionalPropsToBonds(
    bonds: StudentBond[],
    active: boolean
  ) {
    const bondsWithAdditionalProps: StudentBondWithAdditionalProps[] = [];
    for (const bond of bonds) {
      const period = await bond.getCurrentPeriod();
      const campus = await bond.getCampus();
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
