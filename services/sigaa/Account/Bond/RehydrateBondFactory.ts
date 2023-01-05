import { SigaaHTTPFactory, HTTP, SigaaParser, SigaaCourseResourcesFactory, SigaaCourseResourceManagerFactory, SigaaLessonParserFactory, SigaaCourseFactory, SigaaActivityFactory, SigaaBondFactory } from "sigaa-api";

export class RehydrateBondFactory {
  async create(
    bondData: {
      program: string;
      registration: string;
      bondSwitchUrl: URL;
    },
    httpFactory: SigaaHTTPFactory,
    http: HTTP,
    parser: SigaaParser
  ) {
    const { program, registration, bondSwitchUrl } = bondData;
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
