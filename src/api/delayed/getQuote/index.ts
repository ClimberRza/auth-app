import { getRandomQuoteId } from '../../../utils/getRandomQuoteId'
import { IErrResponse, ISuccessResponse, makeRequest } from '../../makeRequest'


interface IQuoteInDb {
  quoteId: number
  authorId: number
  quote: string
}

export const getQuote = async (authorId: number, controller: AbortController):
  Promise<ISuccessResponse<IQuoteInDb> | IErrResponse> => {
    const response = await makeRequest<IQuoteInDb[]>(
      'get',
      '/quotes',
      null,
      { authorId },
      { signal: controller.signal }
    )

    if (!response.success) {
      return response
    }

    const randomQuoteId = getRandomQuoteId(response.data.length)
    const foundQuote = response.data[randomQuoteId]
    const result: ISuccessResponse<IQuoteInDb> = {
      success: true,
      data: {
        quoteId: foundQuote.quoteId,
        authorId: foundQuote.authorId,
        quote: foundQuote.quote
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