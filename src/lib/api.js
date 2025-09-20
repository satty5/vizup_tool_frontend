// api client for backend
import { supabase } from '../utils/supabase'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://vizupauditvisibilityaug25-production.up.railway.app/api/v1'

export const ErrorHandler = {
  toMessage(error) {
    if (!error) return 'Unknown error'
    if (typeof error === 'string') return error
    if (error.message) return error.message
    if (error.error?.message) return error.error.message
    return 'Request failed'
  }
}

async function authHeader() {
  // Get Supabase token for backend validation
  const { data: { session } } = await supabase.auth.getSession()
  const token = session?.access_token
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  if (!API_BASE_URL) {
    return Promise.reject(new Error('API base URL not configured'))
  }
  
  const authHeaders = await authHeader()
  
  const resp = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
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
