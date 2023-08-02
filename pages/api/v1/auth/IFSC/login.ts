import { IStudentDTOProps, StudentDTO } from "@DTOs/StudentDTO";
import { AccountService } from "@services/sigaa/Account/Account";
import { StudentService } from "@services/sigaa/Account/Student";
import { AuthService } from "@services/sigaa/Auth";
import { v4 } from "uuid";
import type { NextApiRequest, NextApiResponse } from "next";
import logger from "@services/logger";
import { prisma } from "@lib/prisma";
import { compatibleInstitutions } from "../../institutions";

export interface IFSCAuthenticationParams {
  username: string;
  session?: string;
  token?: string;
}
export type LoginResponse =
  | { data: IStudentDTOProps & { token: string }, error: undefined}
  | { data: undefined, error: string };
export default async function LoginIFSC(
  request: NextApiRequest,
  response: NextApiResponse<LoginResponse>
) {

  logger.log("Login", "Request received", {});
  const body = JSON.parse(JSON.stringify(request.body)) as IFSCAuthenticationParams;

  const { username, session, token } = body;

  if (!username) return response.status(400).send({ data:undefined, error: "Username is required" });
  
  const compatibleInstitution = compatibleInstitutions.find(i => i.acronym === "IFSC");
  if (!compatibleInstitution) return response.status(400).send({ data:undefined, error: "Institution is not compatible" });

  const sigaaURL = compatibleInstitution.url;

  const authService = new AuthService();
  let studentDTO: StudentDTO;
  const newToken = v4();
  if (token) {
    logger.log("Login", "Token received", token);
    const storedSession = await prisma.session.findUnique({
      where: { token },
    });
    if (!storedSession)
      return response.status(400).send({ data:undefined, error: "Invalid token" });
    logger.log("Login", "JSESSIONID received", {});
    const accountService = await authService.rehydrate({
      JSESSIONID: storedSession.value,
      username,
      url: sigaaURL,
      institution: compatibleInstitution.acronym
    });
    logger.log("Login", "Account service rehydrated", {});
    studentDTO = await getStudentDTO(accountService);
    await prisma.session.update({
      where: { id: storedSession.id },
      data: { token: newToken },
    });
  } else if (session) {
    logger.log("Login", "only session received", {});
    const accountService = await authService.rehydrate({
      JSESSIONID: session,
      username,
      url: sigaaURL,
      institution: compatibleInstitution.acronym
    });
    studentDTO = await getStudentDTO(accountService);
    const studentJSON = studentDTO.toJSON();
    const studentInput = {
      ...studentJSON,
      passwordHash: "asdasdaskdoijoijoijoijehehhehehehehdgotcha"
    };
    const createOrUpdateStudent = await prisma.student.upsert({
      where: { username },
      update: studentInput,
      create: studentInput,
    });
    await prisma.session.upsert({
      where: { studentId: createOrUpdateStudent.id },
      update: { value: session, token: newToken },
      create: {
        value: session,
        token: newToken,
        Student: { connect: { id: createOrUpdateStudent.id } },
      },
    });
    logger.log("Login", "Student created or updated", {});
  } else {
    return response.status(400).send({ data:undefined, error: "Session is required" });
  }
  authService.closeSession();

  logger.log("Login", "Session stored", newToken);
  return response
    .status(200)
    .send({ data: { ...studentDTO.toJSON(), token: newToken }, error: undefined });
}

async function getStudentDTO(accountService: AccountService) {
  const studentService = new StudentService(accountService);
  return await studentService.getStudentDTO();
}
