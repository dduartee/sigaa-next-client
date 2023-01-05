import { IBondDTOProps } from "@DTOs/BondDTO";
import cacheService from "@lib/cache";
import logger from "@services/logger";
import { HTTP, SigaaCourseResourcesFactory, SigaaCourseResourceManagerFactory, SigaaLessonParserFactory, SigaaCourseFactory, SigaaActivityFactory, SigaaBondFactory, HTTPFactory, Parser, StudentBond } from "sigaa-api";
import { StudentBondWithAdditionalProps } from "./Bond";

type BondCache = IBondDTOProps

class RehydrateBondFactory {
  async addAdditionalPropsToBonds(
    bonds: StudentBond[],
    active: boolean
  ) {
    logger.log("AccountService", "Adding additional props to bond", {});
    const bondsWithAdditionalProps: StudentBondWithAdditionalProps[] = [];
    for (const bond of bonds) {
      const cache = cacheService.get<BondCache>(bond.registration);
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
  create(
    bondData: {
      program: string;
      registration: string;
      sequence: string;
    },
    httpFactory: HTTPFactory,
    http: HTTP,
    parser: Parser
  ): StudentBond {
    const { program, registration, sequence } = bondData;
    const bondSwitchUrl = new URL(`https://sigaa.ifsc.edu.br/sigaa/escolhaVinculo.do?dispatch=escolher&vinculo=${sequence}`);
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
      registration,
      program,
      bondSwitchUrl
    );
    return bond;
  }
}

export default new RehydrateBondFactory();