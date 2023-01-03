import { IStudentDTOProps, StudentDTO } from "@DTOs/StudentDTO";
import { AccountService } from "@services/sigaa/Account/Account";
import { StudentService } from "@services/sigaa/Account/Student";
import { AuthService } from "@services/sigaa/Auth";
import type { NextApiRequest, NextApiResponse } from "next";
export interface AuthenticationParams {
  username: string;
  password?: string;
  sigaaURL: string;
  JSESSIONID?: string;
}
type LoginResponse =
  | { data: IStudentDTOProps & { token: string } }
  | { error: string };
export default async function Login(
  request: NextApiRequest,
  response: NextApiResponse<LoginResponse>
) {
  const { username, password, sigaaURL, JSESSIONID } =
    request.body as AuthenticationParams;

  if (!sigaaURL) response.status(400).send({ error: "Sigaa URL is required" });
  if (!username) response.status(400).send({ error: "Username is required" });

  const authService = new AuthService();
  let studentDTO: StudentDTO;
  let token: string;
  if (JSESSIONID) {
    const accountService = await authService.rehydrate({
      JSESSIONID,
      username,
      url: sigaaURL,
    });
    studentDTO = await getStudentDTO(accountService);
    token = JSESSIONID;
  } else if (password) {
    const credentials = { username, password };
    const accountService = await authService.login(credentials, sigaaURL);
    studentDTO = await getStudentDTO(accountService);
    token = accountService.getJSESSIONID();
  } else {
    return response.status(400).send({ error: "Password is required" });
  }
  authService.closeSession();
  return response.status(200).send({ data: { ...studentDTO.toJSON(), token } });
}

async function getStudentDTO(accountService: AccountService) {
  const studentService = new StudentService(accountService);
  return await studentService.getStudentDTO();
}
