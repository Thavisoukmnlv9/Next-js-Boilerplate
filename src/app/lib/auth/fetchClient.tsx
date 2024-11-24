interface ApiClientOptions {
  baseURL?: string
  headers?: Record<string, string>
}

class FetchClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor(options: ApiClientOptions = {}) {
    this.baseURL = options.baseURL || process.env.NEXT_PUBLIC_API_BASE_URL || ""
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...options.headers,
    }
  }

  private getFullUrl(url: string): string {
    return this.baseURL ? `${this.baseURL}${url}` : url
  }

  async post<T>(
    url: string,
    data: any,
    options: RequestInit = {}
  ): Promise<{ data: T }> {
    try {
      const response = await fetch(this.getFullUrl(url), {
        method: "POST",
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
        body: JSON.stringify(data),
        ...options,
      })

      if (!response.ok) {
        const errorBody = await response.text()
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorBody}`
        )
      }

      const responseData = await response.json()
      return { data: responseData }
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }
}

const $fetchClient = new FetchClient()

export default $fetchClient
