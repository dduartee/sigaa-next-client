import { CourseDTO } from "@DTOs/CourseDTO";
import { AuthService } from "@services/sigaa/Auth";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthenticationParams } from "./login";
import { BondService } from "@services/sigaa/Account/Bond/Bond";
import cacheService from "@lib/cache";
import logger from "@services/logger";

interface QueryParams {
  registration: string;
  active: boolean;
}
type RequestBody = QueryParams & AuthenticationParams;
export default async function Courses(
  request: NextApiRequest,
  response: NextApiResponse<{ data: CourseDTO[] } | { error: string }>
) {
  logger.log("Courses", "Request received", {});
  const { username, sigaaURL, token, active, registration } =
    request.body as RequestBody;
  if (!sigaaURL) response.status(400).send({ error: "Sigaa URL is required" });
  if (token) {
    logger.log("Courses", "Token received", token);
    const JSESSIONID = cacheService.get(token) as string;
    if (!JSESSIONID)
      return response.status(400).send({ error: "Invalid token" });
    logger.log("Courses", "JSESSIONID received", {});
    const authService = new AuthService();
    const accountService = await authService.rehydrate({
      JSESSIONID,
      username,
      url: sigaaURL,
    });
    
    const bond = await accountService.getSpecificBond(registration, active);
    if (!bond)
      return response
        .status(404)
        .send({ error: `Bond with registration ${registration} not found` });

    const bondService = new BondService(bond);
    const courses = await bondService.getCourses();
    const coursesDTOs = courses.map((course) => new CourseDTO(course));
    authService.closeSession();
    return response.status(200).send({ data: coursesDTOs });
  }
}
