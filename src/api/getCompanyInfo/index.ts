import { IErrResponse, ISuccessResponse, makeRequest } from '../makeRequest'

interface ICompanyData {
  info: string
}

export const getCompanyInformation = async ():
  Promise<ISuccessResponse<ICompanyData> | IErrResponse> => {
    const response = await makeRequest<string>('get', '/info')

    if (!response.success) {
      return response
    }
    
    const result: ISuccessResponse<ICompanyData> = {
      success: true,
      data: {
        info: response.data
      }
    }
    
    return result
}