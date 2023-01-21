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
  const { username, sigaaURL, token } = JSON.parse(JSON.stringify(request.body)) as RequestBody;
  if (!sigaaURL) return response.status(400).send({ error: "Sigaa URL is required" });
  if (!token) return response.status(400).send({ error: "Token is required" });

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
  const bondsDTOs = bonds.map((bond) => new BondDTO(bond));
  authService.closeSession();
  response.status(200).send({ data: bondsDTOs.map((b) => b.toJSON()) });
  for (const bondDTO of bondsDTOs) {
    const bondSwitchUrl = bondDTO.bond.bondSwitchUrl || new URL("");
    const sequence = bondSwitchUrl.searchParams.get("vinculo") || ""; // ordem sequencial do vinculo
    await prismaInstance.bond.upsert({
      where: { registration: bondDTO.bond.registration },
      create: {
        program: bondDTO.bond.program,
        registration: bondDTO.bond.registration,
        period: bondDTO.bond.period,
        sequence: parseInt(sequence),
        active: bondDTO.bond.active,
        Student: { connect: { username } },
        Campus: { connect: { acronym: bondDTO.bond.campus.acronym } },
      },
      update: { period: bondDTO.bond.period },
    });
  }
}
