import {
  CourseStudentData,
  SigaaCourseResourcesFactory,
  SigaaCourseResourceManagerFactory,
  SigaaLessonParserFactory,
  SigaaCourseFactory,
  HTTP,
  Parser,
  SigaaCourseStudent,
} from "sigaa-api";

class RehydrateCourseFactory {
    
    create(
    courseData: CourseStudentData,
    http: HTTP,
    parser: Parser
  ): SigaaCourseStudent {
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
    return courseFactory.createCourseStudent(courseData);
  }
}

export default new RehydrateCourseFactory();
