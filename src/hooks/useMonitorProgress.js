import { useEffect, useRef, useState } from 'react'
import { supabase } from '../utils/supabase'

export function useMonitorProgress(runId) {
  const [event, setEvent] = useState(null)
  const [error, setError] = useState(null)
  const esRef = useRef(null)

  useEffect(() => {
    if (!runId) return
    const base = process.env.REACT_APP_API_URL || 'https://vizupauditvisibilityaug25-production.up.railway.app/api/v1'
    if (!base) { setError(new Error('API URL not configured')); return }
    
    // Get auth token for SSE connection
    supabase.auth.getSession().then(({ data: { session } }) => {
      const token = session?.access_token
      const url = token 
        ? `${base}/monitor/runs/${runId}/events?token=${token}`
        : `${base}/monitor/runs/${runId}/events`
      
      const es = new EventSource(url)
      esRef.current = es

      es.addEventListener('run.updated', (e) => setEvent({ type: 'run.updated', data: safeParse(e.data) }))
      es.addEventListener('run.completed', (e) => setEvent({ type: 'run.completed', data: safeParse(e.data) }))
      es.addEventListener('run.failed', (e) => setEvent({ type: 'run.failed', data: safeParse(e.data) }))
      es.onerror = (e) => { setError(new Error('SSE connection error')); es.close() }
    })

    return () => { esRef.current?.close() }
  }, [runId])

  return { event, error }
}

function safeParse(s) {
  try { return JSON.parse(s) } catch { return s }
}
