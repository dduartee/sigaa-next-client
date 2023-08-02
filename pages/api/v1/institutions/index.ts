import { prisma } from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export type CompatibleInstitutionAcronyms = "IFSC" | "UFFS";
export type InstitutionData = {
  name: string;
  acronym: CompatibleInstitutionAcronyms;
  url: string;
};
const compatibleInstitutions: InstitutionData[] = [
  {
    name: "Instituto Federal de Santa Catarina",
    acronym: "IFSC",
    url: new URL("https://sigrh.ifsc.edu.br/").toString(),
  },
  {
    name: "Universidade Federal da Fronteira Sul",
    acronym: "UFFS",
    url: new URL("https://sigaa.uffs.edu.br/").toString(),
  },
];
export async function loadInstitutions() {
  for (const institution of compatibleInstitutions) {
    await prisma.institution.upsert({
      where: { acronym: institution.acronym },
      update: {},
      create: institution,
    });
  }
  return compatibleInstitutions;
}
export default async function Institutions(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const institutions = await loadInstitutions();
  response.status(200).json(institutions);
}

export { compatibleInstitutions };
