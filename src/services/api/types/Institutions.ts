export interface InstitutionsResponse {
    success: boolean;
    message: string;
    data: IInstitutionInfo[]
}


  export interface IInstitutionInfo {
    name: string;
    abbreviation: string;
    url: string;
    status: boolean;
}
export type StatusRequest = {}

export interface StatusResponse {
  success: boolean;
  message: string;
}