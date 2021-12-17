
export interface IInstitutionInfo {
  name: string;
  abbreviation: string;
  url: string;
  status: boolean;
}
export interface InstitutionsResponse {
    success: boolean;
    message: string;
    data: IInstitutionInfo[]
}

export type StatusRequest = {}

export interface StatusResponse {
  success: boolean;
  message: string;
}
