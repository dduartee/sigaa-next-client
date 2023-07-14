// lessons api endpoint of the same course

import { ICourseDTOProps } from "@DTOs/CourseDTO";
import { prisma } from "@lib/prisma";
import { AuthenticationParams } from "@pages/api/v1/auth/login";
import { SharedCourse } from "@prisma/client";
import logger from "@services/logger";
import { CourseService } from "@services/sigaa/Account/Bond/Course/Course";
import { AuthService } from "@services/sigaa/Auth";
import { NextApiRequest, NextApiResponse } from "next";

interface QueryParams {
  registration: string;
  courseId: string;
}

type RequestBody = AuthenticationParams;

type LessonsResponse = {
  data: ICourseDTOProps;
};

export default async function Lessons(
  request: NextApiRequest,
  response: NextApiResponse<LessonsResponse | { error: string }>
) {
  const { username, sigaaURL, token } = JSON.parse(
    JSON.stringify(request.body)
  ) as RequestBody;
  if (!sigaaURL)
    return response.status(400).send({ error: "Sigaa URL is required" });
  if (!token) return response.status(400).send({ error: "Token is required" });
  const { registration, courseId } = request.query as Partial<QueryParams>;
  if (!registration)
    return response.status(400).send({ error: "Registration is required" });
  if (!courseId)
    return response.status(400).send({ error: "Course ID is required" });
  const storedSession = await prisma.session.findUnique({
    where: { token },
    select: { value: true },
  });
  if (!storedSession)
    return response.status(400).send({ error: "Invalid token" });
  const authService = new AuthService();
  const sigaaInstance = authService.prepareSigaaInstance({
    JSESSIONID: storedSession.value,
    username,
    url: sigaaURL,
  });
  const parser = sigaaInstance.parser;
  const httpFactory = sigaaInstance.httpFactory;
  const http = httpFactory.createHttp();
  const bondStored = await prisma.bond.findUnique({
    where: { registration },
    select: {
      program: true,
      sequence: true,
      active: true,
      Courses: true,
    },
  });
  if (!bondStored)
    return response.status(400).send({ error: "Invalid registration" });
  logger.log("Grades", "Bond received", {});
  const sharedCourse = (await prisma.sharedCourse.findUnique({
    where: { courseId },
  })) as SharedCourse;
  if (!sharedCourse)
    return response.status(400).send({ error: "Invalid sharedCourse" });
  const courses = bondStored.Courses;
  const course = courses.find(
    (course) => course.sharedCourseId === sharedCourse.id
  );
  if (!course) return response.status(400).send({ error: "Invalid course" });
  /**
   * Rehidratar o course apartir dos dados salvos no banco
   */
  const courseService = new CourseService();
  logger.log("Grades", "Rehydrating course", {});
  courseService.rehydrateCourse(sharedCourse, {
    parser,
    http,
  });
  await courseService.getLessons();
  const courseDTO = courseService.getDTO();
  return response.status(200).send({ data: courseDTO.toJSON() });
}
