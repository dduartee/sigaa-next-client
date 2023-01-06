import { CourseDTO } from "@DTOs/CourseDTO";
import { AuthService } from "@services/sigaa/Auth";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthenticationParams } from "./login";
import { BondService } from "@services/sigaa/Account/Bond/Bond";
import logger from "@services/logger";
import RehydrateBondFactory from "@services/sigaa/Account/Bond/RehydrateBondFactory";
import { prismaInstance } from "@lib/prisma";
import { ObjectId } from "bson";

interface QueryParams {
  registration: string;
}
type RequestBody = QueryParams & AuthenticationParams;
export default async function Courses(
  request: NextApiRequest,
  response: NextApiResponse<{ data: CourseDTO[] } | { error: string }>
) {
  logger.log("Courses", "Request received", {});
  const { username, sigaaURL, token, registration } =
    request.body as RequestBody;
  if (!sigaaURL) response.status(400).send({ error: "Sigaa URL is required" });
  if (token) {
    logger.log("Courses", "Token received", token);
    const storedSession = await prismaInstance.session.findUnique({
      where: { token },
      select: { value: true },
    });
    if (!storedSession)
      return response.status(400).send({ error: "Invalid token" });
    logger.log("Courses", "JSESSIONID received", {});
    const authService = new AuthService();
    const sigaaInstance = authService.prepareSigaaInstance({
      JSESSIONID: storedSession.value,
      username,
      url: sigaaURL,
    });
    const parser = sigaaInstance.parser;
    const httpFactory = sigaaInstance.httpFactory;
    const http = httpFactory.createHttp();
    const bondStored = await prismaInstance.bond.findUnique({
      where: { registration },
      select: {
        program: true,
        sequence: true,
        active: true,
      },
    });
    if (!bondStored)
      return response.status(400).send({ error: "Invalid registration" });
    const rehydratedBond = RehydrateBondFactory.create(
      {
        registration,
        program: bondStored.program,
        sequence: bondStored.sequence,
      },
      httpFactory,
      http,
      parser
    );
    const [bond] = await RehydrateBondFactory.addAdditionalPropsToBonds(
      [rehydratedBond],
      bondStored.active
    ); // gambiarra
    const bondService = new BondService(bond);
    const courses = await bondService.getCourses();
    const coursesDTOs = courses.map((course) => new CourseDTO(course));
    const coursesJSON = coursesDTOs.map((course) => course.toJSON());
    authService.closeSession();
    response.status(200).send({ data: coursesDTOs });
    for (const courseJSON of coursesJSON) {
      const storedCourse = await prismaInstance.sharedCourse.findUnique({
        where: { courseId: courseJSON.id },
      });
      if (storedCourse) {
        if (
          storedCourse.period !== courseJSON.period ||
          storedCourse.schedule !== courseJSON.schedule ||
          storedCourse.numberOfStudents !== courseJSON.numberOfStudents
        ) {
          await prismaInstance.sharedCourse.update({
            where: { courseId: courseJSON.id },
            data: {
              period: courseJSON.period,
              schedule: courseJSON.schedule,
              numberOfStudents: courseJSON.numberOfStudents,
            },
          });
        }
      } else {
        const sharedCourseId = new ObjectId().toString();
        await prismaInstance.$transaction([
          prismaInstance.sharedCourse.create({
            data: {
              id: sharedCourseId,
              courseId: courseJSON.id,
              code: courseJSON.code,
              numberOfStudents: courseJSON.numberOfStudents,
              period: courseJSON.period,
              schedule: courseJSON.schedule,
              title: courseJSON.title,
            },
          }),
          prismaInstance.course.create({
            data: {
              Bond: { connect: { registration } },
              SharedCourse: { connect: { id: sharedCourseId } },
            },
          }),
        ]);
      }
    }
  }
}
