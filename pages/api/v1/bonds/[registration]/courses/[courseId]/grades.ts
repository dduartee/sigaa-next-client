import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@lib/prisma";
import { AuthService } from "@services/sigaa/Auth";
import { ICourseDTOProps } from "@DTOs/CourseDTO";
import { CourseService } from "@services/sigaa/Account/Bond/Course/Course";
import logger from "@services/logger";
import { SharedCourse } from "@prisma/client";
import { compatibleInstitutions } from "@pages/api/v1/institutions";

interface QueryParams {
  registration: string;
  courseId: string;
}
type RequestBody = {
  username: string;
  token: string;
  institution: string;
};

type GradesResponse = {
  data: ICourseDTOProps;
};

export default async function Grades(
  request: NextApiRequest,
  response: NextApiResponse<GradesResponse | { error: string }>
) {
  const { username, institution, token } =
    JSON.parse(JSON.stringify(request.body)) as RequestBody;
  logger.log("Grades", "Request received", {});
  if (!token) return response.status(400).send({ error: "Token is required" });
  if (!institution) return response.status(400).send({ data:undefined, error: "Institution is required" });
  const compatibleInstitution = compatibleInstitutions.find(i => i.acronym === institution);
  if (!compatibleInstitution) return response.status(400).send({ data:undefined, error: "Institution is not compatible" });
  
  if(compatibleInstitution.acronym === "UFFS") return response.status(400).send({ data:undefined, error: "Institution is not compatible to this endpoint" });

  const sigaaURL = compatibleInstitution.url;
  
  const { registration, courseId } = request.query as Partial<QueryParams>;
  if (!registration)
    return response.status(400).send({ error: "Registration is required" });
  if (!courseId)
    return response.status(400).send({ error: "CourseId is required" });

  const storedSession = await prisma.session.findUnique({
    where: { token },
    select: { value: true },
  });
  if (!storedSession)
    return response.status(400).send({ error: "Invalid token" });

  logger.log("Grades", "JSESSIONID received", {});
  const authService = new AuthService();
  const sigaaInstance = authService.prepareSigaaInstance({
    JSESSIONID: storedSession.value,
    username,
    url: sigaaURL,
    institution: compatibleInstitution.acronym
  });
  const parser = sigaaInstance.parser;
  /**
   * O http deve ser instanciado apenas uma vez,
   * assim como o SigaaRequestStack instanciado dentro dele
   */
  const http = sigaaInstance.httpFactory.createHttp();
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

  const sharedCourse = await prisma.sharedCourse.findUnique({
    where: { courseId },
  }) as SharedCourse;
  if (!sharedCourse)
    return response.status(400).send({ error: "Invalid sharedCourse" });
  const courses = bondStored.Courses;
  const course = courses.find((course) => course.sharedCourseId === sharedCourse.id);
  if (!course) return response.status(400).send({ error: "Invalid course" });
  /**
   * Rehidratar o course apartir dos dados salvos no banco
  */
  const courseService = new CourseService();
  logger.log("Grades", "Rehydrating course", {});
  courseService.rehydrateCourse(sharedCourse, compatibleInstitution.acronym, {
    parser,
    http,
  });
  logger.log("Grades", "getting grades", {});
  await courseService.getGrades();
  logger.log("Grades", "Sending response", {});
  const courseDTO = courseService.getDTO();
  return response.status(200).send({ data: courseDTO.toJSON() });
}
