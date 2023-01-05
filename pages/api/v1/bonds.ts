import { AuthService } from "@services/sigaa/Auth";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthenticationParams } from "./login";
import { BondDTO } from "@DTOs/BondDTO";
import cacheService from "@lib/cache";
import logger from "@services/logger";
type RequestBody = AuthenticationParams;
export default async function Bonds(
  request: NextApiRequest,
  response: NextApiResponse<{data: BondDTO[]} | {error: string}>
) {
  logger.log("Bonds", "Request received", {});
  const { username, sigaaURL, token } = request.body as RequestBody;
  if (!sigaaURL) response.status(400).send({ error: "Sigaa URL is required" });
  if (token) {
    logger.log("Bonds", "Token received", token);
    const JSESSIONID = cacheService.get(token) as string;
    if (!JSESSIONID) return response.status(400).send({ error: "Invalid token" });
    logger.log("Bonds", "JSESSIONID received", {});
    const authService = new AuthService();
    const accountService = await authService.rehydrate({JSESSIONID, username, url: sigaaURL});
    logger.log("Bonds", "Account service rehydrated", {});
    const activeBonds = await accountService.getActiveBonds();
    const inactiveBonds = await accountService.getInactiveBonds();
    logger.log("Bonds", "Bonds received", {activeBonds: activeBonds.length, inactiveBonds: inactiveBonds.length});
    const bonds = [...activeBonds, ...inactiveBonds];
    const bondsDTOs = bonds.map(bond => new BondDTO(bond));
    authService.closeSession();
    return response.status(200).send({ data: bondsDTOs });
  }
}
