import React from 'react'
import Header from '../../components/layout/Header'
import { Eye, Search, TrendingUp, BarChart3, ArrowRight } from 'lucide-react'
import '../../styles/dashboard.css'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()

  const mainRoutes = [
    { id: 'monitor', title: 'Monitor', description: 'Monitor your presence on answer engines', icon: Eye, color: 'bg-blue-500', available: true },
    { id: 'diagnose', title: 'Diagnose', description: 'Diagnose and gap analysis', icon: Search, color: 'bg-green-500', available: true },
    { id: 'optimize', title: 'Optimize', description: 'Optimize your content strategy', icon: TrendingUp, color: 'bg-purple-500', available: true },
    { id: 'attribute', title: 'Attribute', description: 'Attribution tracking and analytics', icon: BarChart3, color: 'bg-orange-500', available: false, comingSoon: true },
  ]

  const tools = [
    { name: 'Keyword Research', description: 'Find high-impact keywords for answer engines', icon: Search, category: 'Research' },
    { name: 'Content Optimizer', description: 'Optimize content for AI visibility', icon: TrendingUp, category: 'Optimization' },
    { name: 'Competitor Analysis', description: 'Analyze competitor presence', icon: Eye, category: 'Analysis' },
    { name: 'Performance Tracker', description: 'Track visibility metrics', icon: BarChart3, category: 'Analytics' },
  ]

  return (
    <div className="v-dashboard">
      <div className="v-bg-pattern">
        <div className="v-floating-square"></div>
        <div className="v-floating-square"></div>
        <div className="v-floating-square"></div>
        <div className="v-floating-square"></div>
      </div>

      <main className="v-main">
        <section className="v-welcome">
          <h1 className="v-title">Your AI Visibility Command Center</h1>
        </section>

        <section className="v-tools" style={{ marginBottom: 0 }}>
          <div className="v-grid">
            {mainRoutes.map((route) => {
              const Icon = route.icon
              return (
                <div key={route.id} className="v-card" onClick={() => navigate(`/${route.id}`)}>
                  <div className="v-content">
                    <div className="v-head">
                      <div className="v-icon"><Icon className="w-6 h-6" /></div>
                      <div className="v-number">{route.id === 'monitor' ? '01' : route.id === 'diagnose' ? '02' : route.id === 'optimize' ? '03' : '04'}</div>
                    </div>
                    <div className="v-name">{route.title}</div>
                    <div className="v-desc">{route.description}</div>
                    <div className="v-tags">
                      <span className="v-tag">Fast</span>
                      <span className="v-tag">Secure</span>
                      <span className="v-tag">Accurate</span>
                    </div>
                    <div className="v-action">Open <ArrowRight className="w-4 h-4" /></div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}


