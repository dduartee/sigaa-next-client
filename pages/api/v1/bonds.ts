import { AuthService } from "@services/sigaa/Auth";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthenticationParams } from "./login";
import { BondDTO } from "@DTOs/BondDTO";
type RequestBody = AuthenticationParams;
export default async function Bonds(
  request: NextApiRequest,
  response: NextApiResponse<{data: BondDTO[]} | {error: string}>
) {
  const { username, sigaaURL, JSESSIONID } = request.body as RequestBody;
  if (!sigaaURL) response.status(400).send({ error: "Sigaa URL is required" });
  if (JSESSIONID) {
    const authService = new AuthService();
    const accountService = await authService.rehydrate({JSESSIONID, username, url: sigaaURL});
    const activeBonds = await accountService.getActiveBonds();
    const inactiveBonds = await accountService.getInactiveBonds();
    const bonds = [...activeBonds, ...inactiveBonds];
    const bondsDTOs = bonds.map(bond => new BondDTO(bond));
    authService.closeSession();
    response.status(200).send({ data: bondsDTOs });
  }
}
