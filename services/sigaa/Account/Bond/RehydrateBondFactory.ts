import logger from "@services/logger";
import {
  HTTP,
  SigaaCourseResourcesFactory,
  SigaaCourseResourceManagerFactory,
  SigaaLessonParserFactory,
  SigaaCourseFactory,
  SigaaActivityFactory,
  SigaaBondFactory,
  HTTPFactory,
  Parser,
  StudentBond,
  InstitutionType,
} from "sigaa-api";
import { StudentBondWithAdditionalProps } from "./Bond";
import { prisma } from "@lib/prisma";

class RehydrateBondFactory {
  async addAdditionalPropsToBonds(bonds: StudentBond[], active: boolean) {
    logger.log("AccountService", "Adding additional props to bond", {});
    const bondsWithAdditionalProps: StudentBondWithAdditionalProps[] = [];
    for (const bond of bonds) {
      const bondStored = await prisma.bond.findUnique({
        where: { registration: bond.registration },
        select: { period: true, campus: true },
      });
      let period: string;
      let campus: string;
      if (bondStored) {
        logger.log("AccountService", "got period and campus from cache", {});
        period = bondStored.period;
        campus = bondStored.campus;
      } else {
        period = await bond.getCurrentPeriod();
        logger.log("AccountService", "got period", {});
        campus = await bond.getCampus();
        logger.log("AccountService", "got campus", {campus});
      }
      bondsWithAdditionalProps.push(
        Object.assign(bond, { period, campus, active })
      );
    }
    return bondsWithAdditionalProps;
  }
  create(
    bondData: {
      program: string;
      registration: string;
      sequence: number;
      institution: InstitutionType;
    },
    sigaaURL: string,
    httpFactory: HTTPFactory,
    http: HTTP,
    parser: Parser
  ): StudentBond {
    const { program, registration, institution, sequence } = bondData;
    const bondSwitchUrl = new URL(
      `/sigaa/escolhaVinculo.do?dispatch=escolher&vinculo=${sequence}`,
      sigaaURL
    );
    const courseResourcesFactory = new SigaaCourseResourcesFactory(parser);
    const courseResourcesManagerFactory = new SigaaCourseResourceManagerFactory(
      courseResourcesFactory
    );
    const lessonParserFactory = new SigaaLessonParserFactory(parser);
    const courseFactory = new SigaaCourseFactory(
      http,
      parser,
      courseResourcesManagerFactory,
      lessonParserFactory
    );
    const activityFactory = new SigaaActivityFactory();
    const bondFactory = new SigaaBondFactory(
      httpFactory,
      parser,
      courseFactory,
      activityFactory
    );
    const bond = bondFactory.createStudentBond(
      institution,
      registration,
      program,
      "",
      bondSwitchUrl
    );
    return bond;
  }
}

export default new RehydrateBondFactory();