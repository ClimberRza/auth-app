import axios from 'axios'

const BASE_URL = 'http://localhost:3500'

type TMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

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


export async function makeRequest<T>(
  method: TMethod, 
  additionalUrl: TUrl, 
  body?: unknown,
  searchParams?: Object
): 
Promise<ISuccessResponse<T> | IErrResponse> {
  try {
    let data: T
    if (method === 'get') {
      const response = await axios.get<T>(
        BASE_URL + additionalUrl,
        { params: searchParams }
      )
      data = response.data as T
    }
    if (method === 'post') {
      if (!body) {
        throw new Error('Nothing to post')
      }
      data = (await axios.post(BASE_URL + additionalUrl, body)).data
    }
    if (method === 'put') {
      // data = (await axios.put(BASE_URL + 'info')).data
    }
    if (method === 'patch') {
      // data = (await axios.patch(BASE_URL + 'info')).data
    }
    if (method === 'delete') {
      // data = (await axios.delete(BASE_URL + 'info')).data
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
    return new Promise(resolve => {
      const response: IErrResponse = {
        success: false,
        data: {
          message: "Access denied."
        }
      }
      resolve(response)
    })
  }
}
