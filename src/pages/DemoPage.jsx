import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import InvitationView from '../components/invitation/InvitationView'
import { demoData } from '../data/demoData'
import { themes, getThemeBySlug } from '../data/themes'

const DemoPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  
  const theme = getThemeBySlug(slug)
  
  if (!theme) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-amber-400 mb-4">القالب غير موجود</h1>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-full bg-amber-500 text-slate-900 font-semibold"
          >
            العودة للصفحة الرئيسية
          </button>
        </div>
      </div>
    )
  }

  return (
    <InvitationView 
      data={demoData} 
      theme={theme} 
      isDemo={true}
    />
  )
}

export default DemoPage
