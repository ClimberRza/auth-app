import { generateToken } from '../../utils/generateToken/generateToken'
import { IErrResponse, ISuccessResponse, makeRequest } from '../makeRequest'

interface IUserData {
  email: string
  password: string
}

interface IUserDataInDB extends IUserData {
  id: string
  token: string
}

interface IUserToken {
  token: string
}

export const postUserData = async (userData: IUserData):
  Promise<ISuccessResponse<IUserToken> | IErrResponse> => {
    const allProfilesResponse = await makeRequest<IUserDataInDB[]>('get', '/profile')

    if (!allProfilesResponse.success) {
      return allProfilesResponse
    }

    let userToken = generateToken()
    // Guarantee token uniqueness
    while (allProfilesResponse.data.find(user => user.token === userToken)) {
      userToken = generateToken()
    }

    const userDataWithToken = {
      ...userData,
      token: userToken
    }

    const response = await makeRequest<IUserDataInDB>('post', '/profile', userDataWithToken)
    if (!response.success) {
      return response
    }

    const result: ISuccessResponse<IUserToken> = {
      success: true,
      data: {
        token: userToken
      }
    }

    return new Promise(resolve => {
      resolve(result)
    })
}