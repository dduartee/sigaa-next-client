import { CampusDTO } from "@DTOs/CampusDTO";
import { prismaInstance } from "@lib/prisma";
import { CampusService } from "@services/sigaa/Campus";
import { NextApiRequest, NextApiResponse } from "next";
import { Sigaa } from "sigaa-api";

type CampusQuery = {
  institution: string;
};

export default async function Campuses(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { institution: acronym } = request.query as CampusQuery;
  if (!acronym) return response.status(400).json({ message: "Acronym required" });
  const institution = await prismaInstance.institution.findUnique({
    where: { acronym },
  });
  if (!institution)
    return response.status(404).json({ message: "Institution not found" });
  const campuses = await loadCampuses(institution);
  response.status(200).json(campuses);
  for (const campus of campuses) {
    await prismaInstance.campus.upsert({
      where: { acronym: campus.acronym },
      update: {},
      create: {
        name: campus.name,
        acronym: campus.acronym,
        Institution: { connect: { acronym: institution.acronym } },
      },
    });
  }
}

export async function loadCampuses(institution: {
  url: string;
  acronym: string;
}) {
  const sigaaInstance = new Sigaa({ url: institution.url });
  const campusService = new CampusService(sigaaInstance);
  const campusesStored = await prismaInstance.campus.findMany({
    where: { Institution: { acronym: institution.acronym } },
    include: { Institution: true },
  });
  if (campusesStored.length != 0) {
    return campusesStored.map((campus) =>
      new CampusDTO(campus.name, campus.acronym, institution.acronym).toJSON()
    );
  }
  const campuses = await campusService.getListCampus();
  return campuses;
}
