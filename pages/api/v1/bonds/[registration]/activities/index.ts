import { ActivityDTO, IActivityDTOProps } from "@DTOs/ActivityDTO";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@lib/prisma";
import { BondService } from "@services/sigaa/Account/Bond/Bond";
import RehydrateBondFactory from "@services/sigaa/Account/Bond/RehydrateBondFactory";
import { AuthService } from "@services/sigaa/Auth";
import { compatibleInstitutions } from "@pages/api/v1/institutions";

interface QueryParams {
  registration: string;
}

type RequestBody = {
  username: string;
  token: string;
  institution: string;
};

export type ActivitiesResponse = {
  data: IActivityDTOProps[];
};

export default async function Activities(
  request: NextApiRequest,
  response: NextApiResponse<ActivitiesResponse | { error: string }>
) {
  const { username, institution, token } = JSON.parse(
    JSON.stringify(request.body)
  ) as RequestBody;

  if (!token) return response.status(400).send({ error: "Token is required" });
  if (!institution) return response.status(400).send({ data:undefined, error: "Institution is required" });

  const compatibleInstitution = compatibleInstitutions.find(i => i.acronym === institution);
  if (!compatibleInstitution) return response.status(400).send({ data:undefined, error: "Institution is not compatible" });

  const sigaaURL = compatibleInstitution.url;
  
  const { registration } = request.query as Partial<QueryParams>;
  if (!registration)
    return response.status(400).send({ error: "Registration is required" });

  const storedSession = await prisma.session.findUnique({
    where: { token },
    select: { value: true },
  });
  if (!storedSession)
    return response.status(400).send({ error: "Invalid token" });

  const authService = new AuthService();
  const sigaaInstance = authService.prepareSigaaInstance({
    JSESSIONID: storedSession.value,
    username,
    url: sigaaURL,
    institution: compatibleInstitution.acronym
  });
  const parser = sigaaInstance.parser;
  const httpFactory = sigaaInstance.httpFactory;
  const http = httpFactory.createHttp();

  const bondStored = await prisma.bond.findUnique({
    where: { registration },
    select: {
      program: true,
      sequence: true,
      active: true,
    },
  });
  if (!bondStored)
    return response.status(400).send({ error: "Invalid registration" });

  const rehydratedBond = RehydrateBondFactory.create(
    {
      registration,
      program: bondStored.program,
      sequence: bondStored.sequence,
      institution: compatibleInstitution.acronym
    },
    sigaaURL,
    httpFactory,
    http,
    parser
  );
  const [bond] = await RehydrateBondFactory.addAdditionalPropsToBonds(
    [rehydratedBond],
    bondStored.active
  );

  const bondService = new BondService(bond);
  const activities = await bondService.getActivities();
  const activitiesDTO = activities.map((a) => new ActivityDTO(a));
  return response
    .status(200)
    .send({ data: activitiesDTO.map((a) => a.toJSON()) });
}
