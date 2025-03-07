import { IErrResponse, ISuccessResponse, makeRequest } from '../../makeRequest'
import { getRandomAuthorId } from '../../../utils/getRandomAuthorId'


interface IAuthorInDb {
  authorId: number
  name: string
}

export const getAuthor = async (controller: AbortController):
  Promise<ISuccessResponse<IAuthorInDb> | IErrResponse> => {
    const randomAuthorId = getRandomAuthorId()

    const response = await makeRequest<IAuthorInDb[]>(
      'get',
      '/authors',
      null,
      { authorId: randomAuthorId },
      { signal: controller.signal }
    )

    if (!response.success) {
      return response
    }

    const foundAuthor = response.data[0]
    const result: ISuccessResponse<IAuthorInDb> = {
      success: true,
      data: {
        authorId: foundAuthor.authorId,
        name: foundAuthor.name
      }
    }

    // Wait 5 seconds
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('')
      }, 5000)
    })
    
    return result
}