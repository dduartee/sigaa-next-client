import { prisma } from "@lib/prisma";
import { CampusService } from "@services/sigaa/Campus";
import { NextApiRequest, NextApiResponse } from "next";
import { InstitutionType, Sigaa } from "sigaa-api";
import { CompatibleInstitutionAcronyms } from "..";
import logger from "@services/logger";

type CampusQuery = {
  institution: CompatibleInstitutionAcronyms;
};

export default async function Campuses(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { institution: acronym } = request.query as Partial<CampusQuery>;
  if (!acronym)
    return response.status(400).json({ message: "Acronym required" });
  const institution = await prisma.institution.findUnique({
    where: { acronym },
  });
  if (!institution)
    return response.status(404).json({ message: "Institution not found" });
  const campuses = await loadCampuses(institution);
  response.status(200).json(campuses);
}

export async function loadCampuses(institution: {
  url: string;
  acronym: string;
}) {
  logger.log("Campuses", `Loading campuses `, {
    acronym: institution.acronym,
  });
  const sigaaInstance = new Sigaa({
    url: institution.url,
    institution: institution.acronym as InstitutionType,
  });
  const campusService = new CampusService(sigaaInstance);
  const campusesStored = await prisma.campus.findMany({
    where: { Institution: { acronym: institution.acronym } },
    include: { Institution: true },
  });
  if (campusesStored.length != 0) {
    logger.log("Campuses", `got ${campusesStored.length} campuses from cache`, {
      acronym: institution.acronym,
    });
    return campusesStored.map((campus) => campus.name);
  }
  const campuses = await campusService.getListCampus();
  logger.log("Campuses", `got ${campuses.length} campuses from `, {
    acronym: institution.acronym,
  });
  for (const campus of campuses) {
    await prisma.campus.create({
      data: {
        name: campus,
        Institution: { connect: { acronym: institution.acronym } },
      },
    });
    logger.log("Campuses", "Campus created", {
      campus,
    });
  }
  return campuses;
}
