import type { ApiErrorResponse } from './server-api.types'

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code?: string,
    message = 'API request failed',
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  if (typeof value !== 'object' || value === null) return false
  if ('code' in value && typeof value.code !== 'string') return false
  if ('message' in value && typeof value.message !== 'string') return false

  return true
}

export async function getApiErrorResponse(response: Response) {
  try {
    const data: unknown = await response.json()
    return isApiErrorResponse(data) ? data : undefined
  }
  catch {
    return undefined
  }
}
