import axios from 'axios'

const BASE_URL = 'http://localhost:3500'

type TMethod = 'get' | 'post' | 'delete'

type TUrl = `/${string}`

export interface IErrResponse {
  success: false
  data: {
    message: 'Access denied.'
  }
}

export interface ISuccessResponse<TData> {
  success: true
  data: TData
}

interface IReqestOptions {
  signal?: AbortSignal
}

export async function makeRequest<T>(
  method: TMethod, 
  additionalUrl: TUrl, 
  body?: unknown,
  searchParams?: Object,
  options?: IReqestOptions
): 
Promise<ISuccessResponse<T> | IErrResponse> {
  try {
    let data: T

    if (method === 'get') {
      const response = await axios.get<T>(
        BASE_URL + additionalUrl,
        { 
          params: searchParams,
          signal: options?.signal
        }
      )
      data = response.data as T
    }

    if (method === 'post') {
      if (!body) {
        throw new Error('Nothing to post')
      }
      data = (await axios.post(BASE_URL + additionalUrl, body)).data
    }

    if (method === 'delete') {
      data = (await axios.delete(BASE_URL + additionalUrl)).data
    }

    return new Promise(resolve => {
      const response: ISuccessResponse<T> = {
        success: true,
        data
      }
      resolve(response)
    })

  } catch (error: any) {
    console.log(error)
  
    const response: IErrResponse = {
      success: false,
      data: {
        message: "Access denied."
      }
    }

    return response
  }
}
