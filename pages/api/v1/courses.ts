import { CourseDTO } from "@DTOs/CourseDTO";
import { AuthService } from "@services/sigaa/Auth";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthenticationParams } from "./login";
import { BondService } from "@services/sigaa/Account/Bond/Bond";
import cacheService from "@lib/cache";
import logger from "@services/logger";
import RehydrateBondFactory from "@services/sigaa/Account/Bond/RehydrateBondFactory";

interface QueryParams {
  registration: string;
  active: boolean;
  program: string;
  sequence: string;
}
type RequestBody = QueryParams & AuthenticationParams;
export default async function Courses(
  request: NextApiRequest,
  response: NextApiResponse<{ data: CourseDTO[] } | { error: string }>
) {
  logger.log("Courses", "Request received", {});
  const {
    username,
    sigaaURL,
    token,
    active, // pegar do db
    registration,
    program, // pegar do db
    sequence, // pegar do db
  } = request.body as RequestBody;
  if (!sigaaURL) response.status(400).send({ error: "Sigaa URL is required" });
  if (token) {
    logger.log("Courses", "Token received", token);
    const JSESSIONID = cacheService.get(token) as string;
    if (!JSESSIONID)
      return response.status(400).send({ error: "Invalid token" });
    logger.log("Courses", "JSESSIONID received", {});
    const authService = new AuthService();
    const sigaaInstance = authService.prepareSigaaInstance({
      JSESSIONID,
      username,
      url: sigaaURL,
    });
    const parser = sigaaInstance.parser;
    const httpFactory = sigaaInstance.httpFactory;
    const http = httpFactory.createHttp();
    const rehydratedBond = RehydrateBondFactory.create(
      {
        registration,
        program,
        sequence,
      },
      httpFactory,
      http,
      parser
    );
    const [bond] = await RehydrateBondFactory.addAdditionalPropsToBonds([rehydratedBond], active) // gambiarra
    const bondService = new BondService(bond);
    const courses = await bondService.getCourses();
    const coursesDTOs = courses.map((course) => new CourseDTO(course));
    authService.closeSession();
    return response.status(200).send({ data: coursesDTOs });
  }
}
