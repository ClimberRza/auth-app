import { IErrResponse, ISuccessResponse, makeRequest } from '../../makeRequest'
import { IUserDataInDB } from '../../postUserData'

export const deleteUserData = async (token: string):
  Promise<ISuccessResponse<{}> | IErrResponse> => {
    const allProfilesResponse = await makeRequest<IUserDataInDB[]>('get', '/profiles')

    if (!allProfilesResponse.success) {
      return allProfilesResponse
    }

    const profileMatchTokenId = allProfilesResponse.data.find(user => user.token === token)?.['id'] || ''

    const response = await makeRequest<IUserDataInDB>(
      'delete',
      `/profiles/${profileMatchTokenId}`,
    )

    if (!response.success) {
      return response
    }

    const result: ISuccessResponse<{}> = {
      success: true,
      data: {}
    }
    
    // Wait 1 second
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('')
      }, 1000)
    })
    
    return result
}