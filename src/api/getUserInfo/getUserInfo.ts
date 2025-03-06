import { IErrResponse, ISuccessResponse, makeRequest } from '../makeRequest'
import { IUserDataInDB } from '../postUserData/postUserData'

interface IUserProfileData {
  fullname: string
  email: string
}

export const getUserInfo = async (token: string):
  Promise<ISuccessResponse<IUserProfileData> | IErrResponse> => {
    const response = await makeRequest<IUserDataInDB[]>(
      'get', 
      '/profiles',
      null,
      { token }
    )
    if (!response.success) {
      return response
    }
    const foundUser = response.data[0]
    const result: ISuccessResponse<IUserProfileData> = {
      success: true,
      data: {
        fullname: 'Stepan Russkih',
        email: foundUser.email
      }
    }
    return new Promise(resolve => {
      resolve(result)
    })
}