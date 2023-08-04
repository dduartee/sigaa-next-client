import { LoginResponse } from "@pages/api/v1/auth/IFSC/login";
import { BondsResponse } from "@pages/api/v1/bonds";
import { ActivitiesResponse } from "@pages/api/v1/bonds/[registration]/activities";
import { CoursesResponse } from "@pages/api/v1/bonds/[registration]/courses";
import { UserCredentials } from "@types";

const fetchWrapper = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};
type LoggedUserCredentials = {
  username: string;
  token: string;
};

const fetchAPI = async (
  endpoint: string,
  body: Record<string, string | undefined>,
  errorMessage: string
): Promise<unknown> => {
  const response = await fetchWrapper(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.error) {
    return response;
  } else {
    throw new Error(errorMessage);
  }
};

const fetchLogin = async ({
  username,
  session,
  token,
}: UserCredentials): Promise<LoginResponse> => {
  if (username && (session || token)) {
    const body = { username, token, session, institution: "IFSC" };
    return fetchAPI(
      "/api/v1/auth/IFSC/login",
      body,
      "FETCHLOGIN: Parametros inválidos"
    ) as Promise<LoginResponse>;
  } else {
    throw new Error("FETCHLOGIN: Parametros inválidos");
  }
};

const fetchBonds = async ({ username, token }: LoggedUserCredentials) => {
  if (username && token) {
    const body = { username, token, institution: "IFSC" };
    return fetchAPI(
      "/api/v1/bonds",
      body,
      "FETCHBONDS: Parametros inválidos"
    ) as Promise<BondsResponse>;
  } else {
    throw new Error("FETCHBONDS: Parametros inválidos");
  }
};

const fetchCourses = async (
  { username, token }: LoggedUserCredentials,
  registration: string
) => {
  if (username && token && registration) {
    const body = { username, token, institution: "IFSC" };
    return (await fetchAPI(
      `/api/v1/bonds/${registration}/courses`,
      body,
      "FETCHCOURSES: Parametros inválidos"
    )) as Promise<CoursesResponse>;
  } else {
    throw new Error("FETCHCOURSES: Parametros inválidos");
  }
};
const fetchActivities = async (
  { username, token }: LoggedUserCredentials,
  registration: string
) => {
  if (username && token && registration) {
    const body = { username, token, institution: "IFSC" };
    return (await fetchAPI(
      `/api/v1/bonds/${registration}/activities`,
      body,
      "FETCHACTIVITIES: Parametros inválidos"
    )) as Promise<ActivitiesResponse>;
  } else {
    throw new Error("FETCHACTIVITIES: Parametros inválidos");
  }
};

export { fetchLogin, fetchBonds, fetchCourses, fetchActivities };
