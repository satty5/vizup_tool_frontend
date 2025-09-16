import React, { useEffect, useState } from 'react'
import '../../styles/profile.css'
import { useAuth } from '../../hooks/useAuth'
import { profiles } from '../../utils/supabase'

export default function Profile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      if (!user) { setLoading(false); return }
      const { data } = await profiles.getProfile(user.id)
      setProfile(data || null)
      setLoading(false)
    }
    load()
  }, [user])
  return (
    <div className="prof-root">
      <div className="prof-card">
        <div className="prof-header">
          <div className="prof-avatar">{(user?.email?.[0] || 'D').toUpperCase()}</div>
          <div className="prof-info">
            <div className="prof-name">{profile?.full_name || user?.email?.split('@')[0] || 'User'}</div>
            <div className="prof-email">{user?.email || 'demo@vizup.com'}</div>
          </div>
        </div>
        {loading ? (
          <div className="prof-body"><div className="prof-row"><span>Loading profile…</span><strong>…</strong></div></div>
        ) : (
          <div className="prof-body">
            <div className="prof-row"><span>Full name</span><strong>{profile?.full_name || '—'}</strong></div>
            <div className="prof-row"><span>Plan</span><strong>Starter</strong></div>
            <div className="prof-row"><span>Status</span><strong>Active</strong></div>
            <div className="prof-row"><span>Member since</span><strong>{new Date(user?.created_at || Date.now()).getFullYear()}</strong></div>
          </div>
        )}
      </div>
    </div>
  )
}


