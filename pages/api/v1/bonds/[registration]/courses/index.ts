import { CourseDTO, ICourseDTOProps } from "@DTOs/CourseDTO";
import { AuthService } from "@services/sigaa/Auth";
import { NextApiRequest, NextApiResponse } from "next";
import { BondService } from "@services/sigaa/Account/Bond/Bond";
import logger from "@services/logger";
import RehydrateBondFactory from "@services/sigaa/Account/Bond/RehydrateBondFactory";
import { prisma } from "@lib/prisma";
import { ObjectId } from "bson";
import { compatibleInstitutions } from "@pages/api/v1/institutions";

interface QueryParams {
  registration: string;
}
type RequestBody = {
  username: string;
  token: string;
  institution: string;
};
export type CoursesResponse = {
  data: ICourseDTOProps[];
};

export default async function Courses(
  request: NextApiRequest,
  response: NextApiResponse<CoursesResponse | { error: string }>
) {
  logger.log("Courses", "Request received", {});
  const { username, institution, token } =
    JSON.parse(JSON.stringify(request.body)) as RequestBody;


  if (!token) return response.status(400).send({ error: "Token is required" });
  if (!institution) return response.status(400).send({ data:undefined, error: "Institution is required" });

  const compatibleInstitution = compatibleInstitutions.find(i => i.acronym === institution);
  if (!compatibleInstitution) return response.status(400).send({ data:undefined, error: "Institution is not compatible" });

  const sigaaURL = compatibleInstitution.url;

  const { registration } = request.query as Partial<QueryParams>;
  if (!registration) return response.status(400).send({ error: "Registration is required" });
  logger.log("Courses", "Token received", token);
  const storedSession = await prisma.session.findUnique({
    where: { token },
    select: { value: true },
  });
  if (!storedSession) return response.status(400).send({ error: "Invalid token" });
  logger.log("Courses", "JSESSIONID received", {});
  const authService = new AuthService();
  const sigaaInstance = authService.prepareSigaaInstance({
    JSESSIONID: storedSession.value,
    username,
    url: sigaaURL,
    institution: compatibleInstitution.acronym
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
    },
  });
  if (!bondStored)
    return response.status(400).send({ error: "Invalid registration" });
  const rehydratedBond = RehydrateBondFactory.create(
    {
      registration,
      program: bondStored.program,
      sequence: bondStored.sequence,
      institution: compatibleInstitution.acronym
    },
    sigaaURL,
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
  authService.closeSession();
  response
    .status(200)
    .send({ data: coursesDTOs.map((course) => course.toJSON()) });
  for (const courseDTO of coursesDTOs) {
    const storedCourse = await prisma.sharedCourse.findUnique({
      where: { courseId: courseDTO.course.id },
    });
    if (storedCourse) {
      if (
        storedCourse.period !== courseDTO.course.period ||
        storedCourse.schedule !== courseDTO.course.schedule ||
        storedCourse.numberOfStudents !== courseDTO.course.numberOfStudents
      ) {
        logger.log("Courses", "Updating course", courseDTO.course.code);
        await prisma.sharedCourse.update({
          where: { courseId: courseDTO.course.id },
          data: {
            period: courseDTO.course.period,
            schedule: courseDTO.course.schedule,
            numberOfStudents: courseDTO.course.numberOfStudents,
          },
        });
      }
    } else {
      const sharedCourseId = new ObjectId().toString();
      const courseForm = courseDTO.course.getCourseForm();
      const postValues = JSON.stringify(courseForm.postValues);
      await prisma.$transaction([
        prisma.sharedCourse.create({
          data: {
            id: sharedCourseId,
            courseId: courseDTO.course.id,
            code: courseDTO.course.code,
            numberOfStudents: courseDTO.course.numberOfStudents,
            period: courseDTO.course.period,
            schedule: courseDTO.course.schedule,
            title: courseDTO.course.title,
            postValues
          },
        }),
        prisma.course.create({
          data: {
            Bond: { connect: { registration } },
            SharedCourse: { connect: { id: sharedCourseId } },
          },
        }),
      ]);
    }
  }
}
