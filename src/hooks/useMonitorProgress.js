import { useEffect, useRef, useState } from 'react'
import { supabase } from '../utils/supabase'

export function useMonitorProgress(runId) {
  const [progress, setProgress] = useState({ percent: 0 })
  const [status, setStatus] = useState('queued')
  const [currentActivity, setCurrentActivity] = useState('')
  const [stats, setStats] = useState(null)
  const [error, setError] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const esRef = useRef(null)
  const pollRef = useRef(null)

  const connectToSSE = async (runId) => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.access_token) {
        throw new Error('No authentication session')
      }

      const base = process.env.REACT_APP_API_URL || 'https://vizupauditvisibilityaug25-production.up.railway.app/api/v1'
      const sseUrl = `${base}/monitor/runs/${runId}/events?token=${session.access_token}`
      
      console.log('🔌 [SSE] Connecting to run:', runId)
      
      const eventSource = new EventSource(sseUrl)
      esRef.current = eventSource
      
      eventSource.onopen = () => {
        console.log('✅ [SSE] Connection opened for run:', runId)
        setIsConnected(true)
        setError(null)
      }
      
      // Handle different event types
      eventSource.addEventListener('run.started', (event) => {
        const data = safeParse(event.data)
        console.log('🚀 [SSE] Run started:', data)
        setStatus('running')
      })
      
      eventSource.addEventListener('run.updated', (event) => {
        const data = safeParse(event.data)
        console.log('📡 [SSE] Progress update:', data)
        
        if (data.progress) {
          setProgress(data.progress)
        }
        if (data.status) {
          setStatus(data.status)
        }
        if (data.stats) {
          setStats(data.stats)
        }
        if (data.current) {
          setCurrentActivity(data.current)
        }
      })
      
      eventSource.addEventListener('run.completed', (event) => {
        const data = safeParse(event.data)
        console.log('✅ [SSE] Run completed:', data)
        
        // Force completion state
        setProgress({ percent: 100 })
        setStatus('completed')
        setIsConnected(false)
        
        // Close connection
        eventSource.close()
        
        console.log('🎉 Monitor run finished! Ready to show results.')
      })
      
      eventSource.addEventListener('run.failed', (event) => {
        const data = safeParse(event.data)
        console.error('❌ [SSE] Run failed:', data)
        
        setStatus('failed')
        setError(new Error(data.error || 'Run failed'))
        setIsConnected(false)
        eventSource.close()
      })
      
      eventSource.onerror = (error) => {
        console.error('❌ [SSE] Connection error:', error)
        setIsConnected(false)
        
        // Try to reconnect once after 3 seconds
        setTimeout(() => {
          if (status !== 'completed' && status !== 'failed') {
            console.log('🔄 [SSE] Attempting to reconnect...')
            connectToSSE(runId)
          }
        }, 3000)
      }
      
      return eventSource
      
    } catch (error) {
      console.error('❌ [SSE] Setup failed:', error)
      setError(error)
      throw error
    }
  }

  // Fallback polling for status updates
  const startFallbackPolling = (runId) => {
    if (pollRef.current) clearInterval(pollRef.current)
    
    pollRef.current = setInterval(async () => {
      try {
        console.log('🔄 [Fallback] Checking run status...')
        
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.access_token) return
        
        const base = process.env.REACT_APP_API_URL || 'https://vizupauditvisibilityaug25-production.up.railway.app/api/v1'
        const response = await fetch(`${base}/monitor/runs/${runId}`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        })
        
        if (!response.ok) return
        
        const data = await response.json()
        console.log('📊 [Fallback] Current status:', data)
        
        if (data.status === 'completed') {
          setProgress({ percent: 100 })
          setStatus('completed')
          setIsConnected(false)
          clearInterval(pollRef.current)
          console.log('✅ [Fallback] Run completed via polling!')
        } else if (data.status === 'failed') {
          setStatus('failed')
          setError(new Error('Run failed'))
          setIsConnected(false)
          clearInterval(pollRef.current)
        } else {
          // Update progress from polling
          if (data.progress) {
            setProgress(data.progress)
          }
          if (data.status) {
            setStatus(data.status)
          }
        }
        
      } catch (error) {
        console.error('❌ [Fallback] Polling failed:', error)
      }
    }, 5000) // Poll every 5 seconds
  }

  useEffect(() => {
    if (!runId) return

    // Start SSE connection
    connectToSSE(runId).catch(() => {
      // If SSE fails, fall back to polling immediately
      console.log('🔄 [Monitor] SSE failed, starting fallback polling')
      startFallbackPolling(runId)
    })

    // Also start fallback polling as backup
    setTimeout(() => {
      if (!isConnected) {
        console.log('🔄 [Monitor] Starting backup polling')
        startFallbackPolling(runId)
      }
    }, 10000) // Start backup polling after 10 seconds

    return () => {
      if (esRef.current) {
        esRef.current.close()
      }
      if (pollRef.current) {
        clearInterval(pollRef.current)
      }
    }
  }, [runId])

  return { progress, status, currentActivity, stats, error, isConnected }
}

function safeParse(s) {
  try { return JSON.parse(s) } catch { return s }
}
