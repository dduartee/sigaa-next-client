import { IStudentDTOProps, StudentDTO } from "@DTOs/StudentDTO";
import { AccountService } from "@services/sigaa/Account/Account";
import { StudentService } from "@services/sigaa/Account/Student";
import { AuthService } from "@services/sigaa/Auth";
import cacheService from "@lib/cache";
import {v4} from 'uuid'
import type { NextApiRequest, NextApiResponse } from "next";
export interface AuthenticationParams {
  username: string;
  password?: string;
  sigaaURL: string;
  token?: string;
}
type LoginResponse =
  | { data: IStudentDTOProps & { token: string } }
  | { error: string };
export default async function Login(
  request: NextApiRequest,
  response: NextApiResponse<LoginResponse>
) {
  const { username, password, sigaaURL, token } =
    request.body as AuthenticationParams;

    if (!username) response.status(400).send({ error: "Username is required" });
    if (!sigaaURL) response.status(400).send({ error: "Sigaa URL is required" });

  const authService = new AuthService();
  let studentDTO: StudentDTO;
  let session: string;
  if (token) {
    const JSESSIONID = cacheService.take(token) as string;
    if (!JSESSIONID) return response.status(400).send({ error: "Invalid token" });
    const accountService = await authService.rehydrate({
      JSESSIONID,
      username,
      url: sigaaURL,
    });
    studentDTO = await getStudentDTO(accountService);
    session = JSESSIONID;
  } else if (password) {
    const credentials = { username, password };
    const accountService = await authService.login(credentials, sigaaURL);
    studentDTO = await getStudentDTO(accountService);
    session = accountService.getJSESSIONID();
  } else {
    return response.status(400).send({ error: "Password is required" });
  }
  authService.closeSession();
  // generate random token
  const newToken = v4();
  // store token in cache
  cacheService.set(newToken, session);
  return response.status(200).send({ data: { ...studentDTO.toJSON(), token: newToken } });
}

async function getStudentDTO(accountService: AccountService) {
  const studentService = new StudentService(accountService);
  return await studentService.getStudentDTO();
}
