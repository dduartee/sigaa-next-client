import { AuthService } from "@services/sigaa/Auth";
import { NextApiRequest, NextApiResponse } from "next";
import { BondDTO, IBondDTOProps } from "@DTOs/BondDTO";
import logger from "@services/logger";
import { prisma } from "@lib/prisma";
import { compatibleInstitutions } from "../institutions";
type RequestBody = {
  username: string;
  token: string;
  institution: string;
};
export type BondsResponse = { data: IBondDTOProps[] };
export default async function Bonds(
  request: NextApiRequest,
  response: NextApiResponse< BondsResponse| { error: string }>
) {
  logger.log("Bonds", "Request received", {});
  const { username, institution, token } = JSON.parse(JSON.stringify(request.body)) as RequestBody;
  if (!token) return response.status(400).send({ error: "Token is required" });
  if (!institution) return response.status(400).send({ data:undefined, error: "Institution is required" });

  const compatibleInstitution = compatibleInstitutions.find(i => i.acronym === institution);
  if (!compatibleInstitution) return response.status(400).send({ data:undefined, error: "Institution is not compatible" });

  const sigaaURL = compatibleInstitution.url;

  logger.log("Bonds", "Token received", token);
  const storedSession = await prisma.session.findUnique({
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
    institution: compatibleInstitution.acronym
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
    await prisma.bond.upsert({
      where: { registration: bondDTO.bond.registration },
      create: {
        program: bondDTO.bond.program,
        registration: bondDTO.bond.registration,
        period: bondDTO.bond.period,
        campus: bondDTO.bond.campus,
        sequence: parseInt(sequence),
        active: bondDTO.bond.active,
        Student: { connect: { username } },
      },
      update: { period: bondDTO.bond.period },
    });
  }
}
