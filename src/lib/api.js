// api client for backend

const API_BASE_URL = process.env.REACT_APP_API_URL || ''

export const ErrorHandler = {
  toMessage(error) {
    if (!error) return 'Unknown error'
    if (typeof error === 'string') return error
    if (error.message) return error.message
    if (error.error?.message) return error.error.message
    return 'Request failed'
  }
}

function authHeader() {
  const token = localStorage.getItem('vizup_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  if (!API_BASE_URL) {
    return Promise.reject(new Error('API base URL not configured'))
  }
  const resp = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await resp.text()
  let data = null
  try { data = text ? JSON.parse(text) : null } catch { data = text }
  if (!resp.ok) {
    throw new Error(data?.error?.message || data?.message || resp.statusText)
  }
  return data
}

export const apiClient = {
  get: (p) => request(p, { method: 'GET' }),
  post: (p, b) => request(p, { method: 'POST', body: b }),
  patch: (p, b) => request(p, { method: 'PATCH', body: b }),
  del: (p) => request(p, { method: 'DELETE' }),
  isConfigured: Boolean(API_BASE_URL),
  baseUrl: API_BASE_URL,
}
