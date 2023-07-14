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
} from "sigaa-api";
import { StudentBondWithAdditionalProps } from "./Bond";
import { CampusDTO } from "@DTOs/CampusDTO";
import { prisma } from "@lib/prisma";

class RehydrateBondFactory {
  async addAdditionalPropsToBonds(bonds: StudentBond[], active: boolean) {
    logger.log("AccountService", "Adding additional props to bond", {});
    const bondsWithAdditionalProps: StudentBondWithAdditionalProps[] = [];
    for (const bond of bonds) {
      const bondStored = await prisma.bond.findUnique({
        where: { registration: bond.registration },
        include: { Campus: { include: { Institution: true } } },
      });
      let period: string;
      let campusDTO: CampusDTO;
      if (bondStored) {
        logger.log("AccountService", "got period and campus from cache", {});
        period = bondStored.period;
        const campus = bondStored.Campus;
        campusDTO = new CampusDTO(
          campus.name,
          campus.acronym,
          campus.Institution.acronym
        );
      } else {
        period = await bond.getCurrentPeriod();
        logger.log("AccountService", "got period", {});
        const campus = await bond.getCampus();
        const [name, acronymWithDate] = campus.split(" - ");
        const [acronym] = acronymWithDate.split(" ");
        const institutionStored = await prisma.campus.findUnique({
          where: { acronym },
          include: { Institution: true },
        });
        if (!institutionStored) throw new Error("Institution not found");
        campusDTO = new CampusDTO(
          name,
          acronym,
          institutionStored.Institution.acronym
        );

        logger.log("AccountService", "got campus", {});
      }
      bondsWithAdditionalProps.push(
        Object.assign(bond, { period, campus: campusDTO.toJSON(), active })
      );
    }
    return bondsWithAdditionalProps;
  }
  create(
    bondData: {
      program: string;
      registration: string;
      sequence: number;
    },
    httpFactory: HTTPFactory,
    http: HTTP,
    parser: Parser
  ): StudentBond {
    const { program, registration, sequence } = bondData;
    const bondSwitchUrl = new URL(
      `https://sigrh.ifsc.edu.br/sigaa/escolhaVinculo.do?dispatch=escolher&vinculo=${sequence}`
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
      registration,
      program,
      bondSwitchUrl
    );
    return bond;
  }
}

export default new RehydrateBondFactory();