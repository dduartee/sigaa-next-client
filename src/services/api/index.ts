import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import config from '@config.json'
import { CoursesRequest, CoursesResponse } from './types/Courses'
import { LoginRequest, LoginResponse } from './types/Login'
import { BondsRequest, BondsResponse } from './types/Bonds'
import { UserRequest, UserResponse } from './types/User'
import { InstitutionsResponse } from './types/Institutions'
import { GradesRequest, GradesResponse } from './types/Grades'
// create a type for username: string, token: string, password: undefined

// create a class for api
class Api {
    api: AxiosInstance;

    constructor (baseURL: string) {
      this.api = axios.create({
        baseURL
      })
    }

    private async post<Request, Response> (url: string, data?: Request, config?: AxiosRequestConfig<Request>): Promise<AxiosResponse<Response>> {
      return await this.api.post(url, data, config).catch(error => this.handleError<Response>(error))
    }

    private async get<Response> (url: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<Response>> {
      return await this.api.get(url, config).catch(error => this.handleError<Response>(error))
    }

    /**
     * Em casos de erro, api retorna valor !== 200, então, é necessário tratar o erro retornando um AxiosResponse
     * @param error
     * @returns
     */
    private handleError<Response> (error: {response: AxiosResponse<Response>}) {
      console.error(error.response.data)
      return error.response
    }

    async getInstitutions (): Promise<InstitutionsResponse> {
      const response = await this.get<InstitutionsResponse>('/institutions')
      return response.data
    }

    async doLogin (data: LoginRequest): Promise<LoginResponse> {
      const response = await this.post<LoginRequest, LoginResponse>('/auth/login', data)
      return response.data
    }

    async getUser (data: UserRequest): Promise<UserResponse> {
      const response = await this.post<UserRequest, UserResponse>('/users/me', data)
      return response.data
    }

    async getBonds (data: BondsRequest): Promise<BondsResponse> {
      const response = await this.post<BondsRequest, BondsResponse>('/bonds', data)
      return response.data
    }

    async getCourses (data: CoursesRequest, registration: string): Promise<CoursesResponse> {
      const response = await this.post<CoursesRequest, CoursesResponse>(`/bonds/${registration}/courses`, data)
      return response.data
    }

    async getGrades (data: GradesRequest, registration: string): Promise<GradesResponse> {
      const response = await this.post<GradesRequest, GradesResponse>(`/bonds/${registration}/grades`, data)
      return response.data
    }
}

export default new Api(`${config.baseURL}/api/v1`)
