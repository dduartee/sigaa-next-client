import { AuthService } from "@services/sigaa/Auth";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthenticationParams } from "./login";
import { BondDTO, IBondDTOProps } from "@DTOs/BondDTO";
import logger from "@services/logger";
import { prismaInstance } from "@lib/prisma";
type RequestBody = AuthenticationParams;
export default async function Bonds(
  request: NextApiRequest,
  response: NextApiResponse<{ data: IBondDTOProps[] } | { error: string }>
) {
  logger.log("Bonds", "Request received", {});
  const { username, sigaaURL, token } = request.body as RequestBody;
  if (!sigaaURL) response.status(400).send({ error: "Sigaa URL is required" });
  if (token) {
    logger.log("Bonds", "Token received", token);
    const storedSession = await prismaInstance.session.findUnique({
      where: { token },
      select: { value: true },
    });
    if (!storedSession)
      return response.status(400).send({ error: "Invalid token" });
    logger.log("Bonds", "JSESSIONID received", storedSession.value);
    const authService = new AuthService();
    const accountService = await authService.rehydrate({
      JSESSIONID: storedSession.value,
      username,
      url: sigaaURL,
    });
    logger.log("Bonds", "Account service rehydrated", {});
    const activeBonds = await accountService.getActiveBonds();
    const inactiveBonds = await accountService.getInactiveBonds();
    logger.log("Bonds", "Bonds received", {
      activeBonds: activeBonds.length,
      inactiveBonds: inactiveBonds.length,
    });
    const bonds = [...activeBonds, ...inactiveBonds];
    const bondsJSON = bonds.map((bond) => new BondDTO(bond).toJSON());
    authService.closeSession();
    response.status(200).send({ data: bondsJSON });
    for (const bondJSON of bondsJSON) {
      await prismaInstance.bond.upsert({
        where: { registration: bondJSON.registration },
        create: {
          program: bondJSON.program,
          registration: bondJSON.registration,
          period: bondJSON.period,
          sequence: parseInt(bondJSON.sequence),
          active: bondJSON.active,
          Student: { connect: { username } },
          Campus: { connect: { acronym: bondJSON.campus.acronym } },
        },
        update: { period: bondJSON.period },
      });
    }
  }
}
