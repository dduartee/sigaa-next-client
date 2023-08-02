import { IStudentDTOProps, StudentDTO } from "@DTOs/StudentDTO";
import { AccountService } from "@services/sigaa/Account/Account";
import { StudentService } from "@services/sigaa/Account/Student";
import { AuthService } from "@services/sigaa/Auth";
import { v4 } from "uuid";
import type { NextApiRequest, NextApiResponse } from "next";
import logger from "@services/logger";
import { prisma } from "@lib/prisma";
import { compatibleInstitutions } from "../../institutions";

export interface UFFSAuthenticationParams {
  username: string;
  password?: string;
  token?: string;
}
type LoginResponse =
  | { data: IStudentDTOProps & { token: string } }
  | { error: string };
export default async function LoginUFFS(
  request: NextApiRequest,
  response: NextApiResponse<LoginResponse>
) {
  logger.log("Login", "Request received", {});
  const { username, password, token } =
    JSON.parse(JSON.stringify(request.body)) as UFFSAuthenticationParams;

  if (!username) return response.status(400).send({ error: "Username is required" });

  const compatibleInstitution = compatibleInstitutions.find(i => i.acronym === "UFFS");
  if (!compatibleInstitution) return response.status(400).send({ data:undefined, error: "Institution is not compatible" });

  const sigaaURL = compatibleInstitution.url;

  const authService = new AuthService();
  let studentDTO: StudentDTO;
  let session: string;
  const newToken = v4();
  if (token) {
    logger.log("Login", "Token received", token);
    const storedSession = await prisma.session.findUnique({
      where: { token },
    });
    if (!storedSession)
      return response.status(400).send({ error: "Invalid token" });
    logger.log("Login", "JSESSIONID received", storedSession.value);
    const accountService = await authService.rehydrate({
      JSESSIONID: storedSession.value,
      username,
      url: sigaaURL,
      institution: compatibleInstitution.acronym
    });
    logger.log("Login", "Account service rehydrated", {});
    studentDTO = await getStudentDTO(accountService);
    session = storedSession.value;
    await prisma.session.update({
      where: { id: storedSession.id },
      data: { token: newToken },
    });
  } else if (password) {
    logger.log("Login", "only password received", {});
    const credentials = { username, password };
    const accountService = await authService.login(credentials, sigaaURL, compatibleInstitution.acronym);
    studentDTO = await getStudentDTO(accountService);
    session = accountService.getJSESSIONID();
    const studentJSON = studentDTO.toJSON();

    const studentInput = {
      ...studentJSON,
      passwordHash: "DDDD"
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
    return response.status(400).send({ error: "Password is required" });
  }
  authService.closeSession();

  logger.log("Login", "Session stored", newToken);
  return response
    .status(200)
    .send({ data: { ...studentDTO.toJSON(), token: newToken } });
}

async function getStudentDTO(accountService: AccountService) {
  const studentService = new StudentService(accountService);
  return await studentService.getStudentDTO();
}
