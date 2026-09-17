import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Users, UserCheck, UserX, Clock, Lock } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../lib/supabase'

const HostDashboard = ({ invitationId, isAuthorized }) => {
  const { t, language } = useLanguage()
  const [rsvps, setRsvps] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    declined: 0,
    pending: 0,
    totalGuests: 0
  })

  useEffect(() => {
    if (isAuthorized) {
      fetchRSVPs()
    }
  }, [invitationId, isAuthorized])

  const fetchRSVPs = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .eq('invitation_id', invitationId)
        .order('created_at', { ascending: false })

      if (error) throw error

      setRsvps(data || [])
      
      // Calculate stats
      const confirmed = data.filter(r => r.attending === true).length
      const declined = data.filter(r => r.attending === false).length
      const pending = data.filter(r => r.attending === null).length
      const totalGuests = data.reduce((sum, r) => {
        if (r.attending === true) {
          return sum + 1 + (r.companions_count || 0)
        }
        return sum
      }, 0)

      setStats({
        total: data.length,
        confirmed,
        declined,
        pending,
        totalGuests
      })
    } catch (error) {
      console.error('Error fetching RSVPs:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    const headers = [
      language === 'ar' ? 'الاسم' : 'Name',
      language === 'ar' ? 'الحالة' : 'Status',
      language === 'ar' ? 'المرافقين' : 'Companions',
      language === 'ar' ? 'إجمالي الضيوف' : 'Total Guests',
      language === 'ar' ? 'الرسالة' : 'Message',
      language === 'ar' ? 'التاريخ' : 'Date'
    ]

    const rows = rsvps.map(rsvp => [
      rsvp.guest_name,
      rsvp.attending === true ? (language === 'ar' ? 'حاضر' : 'Confirmed') : 
      rsvp.attending === false ? (language === 'ar' ? 'معتذر' : 'Declined') : 
      (language === 'ar' ? 'معلق' : 'Pending'),
      rsvp.companions?.join(', ') || '',
      rsvp.attending === true ? 1 + (rsvp.companions_count || 0) : 0,
      rsvp.message || '',
      new Date(rsvp.created_at).toLocaleDateString()
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `rsvps-${invitationId}-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 rounded-3xl text-center max-w-md"
        >
          <Lock className="w-16 h-16 text-luxury-gold-400 mx-auto mb-6" />
          <h2 className="text-2xl font-serif font-bold text-luxury-champagne mb-4">
            {language === 'ar' ? 'محمي' : 'Protected'}
          </h2>
          <p className="text-luxury-champagne/80">
            {language === 'ar' 
              ? 'هذه الصفحة محمية. يرجى تسجيل الدخول للوصول إلى لوحة التحكم.' 
              : 'This page is protected. Please log in to access the dashboard.'}
          </p>
        </motion.div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-luxury-gold-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-luxury-champagne mb-4">
            {t('dashboard')}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-luxury-gold-400 to-luxury-gold-600 mx-auto rounded-full" />
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-12"
        >
          {[
            { icon: Users, label: language === 'ar' ? 'إجمالي' : 'Total', value: stats.total, color: 'luxury-gold' },
            { icon: UserCheck, label: t('totalConfirmed'), value: stats.confirmed, color: 'green' },
            { icon: UserX, label: t('totalDeclined'), value: stats.declined, color: 'red' },
            { icon: Clock, label: t('totalPending'), value: stats.pending, color: 'yellow' },
            { icon: Users, label: language === 'ar' ? 'إجمالي الضيوف' : 'Total Guests', value: stats.totalGuests, color: 'luxury-gold' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="glass-card p-6 rounded-2xl text-center"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 text-${stat.color}-400`} />
              <div className="text-3xl font-serif font-bold text-luxury-champagne mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-luxury-champagne/70">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-end mb-8"
        >
          <button
            onClick={exportToCSV}
            className="luxury-button flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            {t('exportCSV')}
          </button>
        </motion.div>

        {/* RSVP Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-luxury-gold-400">
                    {language === 'ar' ? 'الاسم' : 'Name'}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-luxury-gold-400">
                    {t('attending')}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-luxury-gold-400">
                    {t('companions')}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-luxury-gold-400">
                    {language === 'ar' ? 'الرسالة' : 'Message'}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-luxury-gold-400">
                    {language === 'ar' ? 'التاريخ' : 'Date'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {rsvps.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-luxury-champagne/50">
                      {language === 'ar' ? 'لا توجد استجابات بعد' : 'No responses yet'}
                    </td>
                  </tr>
                ) : (
                  rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-luxury-champagne">
                        {rsvp.guest_name}
                      </td>
                      <td className="px-6 py-4">
                        {rsvp.attending === true ? (
                          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                            {language === 'ar' ? 'حاضر' : 'Yes'}
                          </span>
                        ) : rsvp.attending === false ? (
                          <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm">
                            {language === 'ar' ? 'معتذر' : 'No'}
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm">
                            {language === 'ar' ? 'معلق' : 'Pending'}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-luxury-champagne">
                        {rsvp.companions?.length || 0}
                      </td>
                      <td className="px-6 py-4 text-luxury-champagne/70 max-w-xs truncate">
                        {rsvp.message || '-'}
                      </td>
                      <td className="px-6 py-4 text-luxury-champagne/70 text-sm">
                        {new Date(rsvp.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HostDashboard
