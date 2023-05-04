import { prisma } from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { loadCampuses } from "./campuses/[institution]";
export type InstitutionData = {
  name: string;
  acronym: string;
  url: string;
};
export async function loadInstitutions() {
  const institutions: InstitutionData[] = [
    {
      name: "Instituto Federal de Santa Catarina",
      acronym: "IFSC",
      url: new URL("https://sigaa.ifsc.edu.br/").toString(),
    },
  ];
  for (const institution of institutions) {
    await prisma.institution.upsert({
      where: { acronym: institution.acronym },
      update: {},
      create: institution,
    });
  }
  return institutions;
}
export default async function Institutions(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const institutions = await loadInstitutions();
  for (const institution of institutions) {
    await loadCampuses(institution);
    await prisma.institution.upsert({
      where: { acronym: institution.acronym },
      update: {},
      create: institution,
    });
  }
  response.status(200).json(institutions);
}
