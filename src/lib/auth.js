export const authManager = {
  async signIn(email, password) {
    const base = process.env.REACT_APP_API_URL
    if (!base) throw new Error('API base URL not configured')
    const resp = await fetch(`${base}/auth/sign-in`, {
      method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ email, password })
    })
    const data = await resp.json().catch(()=>null)
    if (!resp.ok) throw new Error(data?.error?.message || resp.statusText)
    if (data?.token) localStorage.setItem('vizup_token', data.token)
    return data
  },
  async signUp(email, password) {
    const base = process.env.REACT_APP_API_URL
    if (!base) throw new Error('API base URL not configured')
    const resp = await fetch(`${base}/auth/sign-up`, {
      method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ email, password })
    })
    const data = await resp.json().catch(()=>null)
    if (!resp.ok) throw new Error(data?.error?.message || resp.statusText)
    if (data?.token) localStorage.setItem('vizup_token', data.token)
    return data
  },
  signOut() { localStorage.removeItem('vizup_token') },
  getToken() { return localStorage.getItem('vizup_token') },
}

