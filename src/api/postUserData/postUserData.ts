import { generateToken } from '../../utils/generateToken/generateToken'
import { IErrResponse, ISuccessResponse, makeRequest } from '../makeRequest'

interface IUserData {
  email: string
  password: string
}

export interface IUserDataInDB extends IUserData {
  id: string
  token: string
}

interface IUserToken {
  token: string
}

export const postUserData = async (userData: IUserData):
  Promise<ISuccessResponse<IUserToken> | IErrResponse> => {
    const allProfilesResponse = await makeRequest<IUserDataInDB[]>('get', '/profiles')

    if (!allProfilesResponse.success) {
      return allProfilesResponse
    }
    // If db already contains such user, we dont post his profile in db
    const sameUserInDb = allProfilesResponse.data
    .find(user => user.email === userData.email && user.password === userData.password)
    if (sameUserInDb) {
        return new Promise(resolve => {
          resolve({
            success: true,
            data: {
              token: sameUserInDb.token
            }
          })
        })
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

    // Post request
    const response = await makeRequest<IUserDataInDB>('post', '/profiles', userDataWithToken)
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