import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, CheckCircle, XCircle, Clock, Download, BarChart3, Filter } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

const HostDashboard = ({ invitationId }) => {
  const { user } = useAuth()
  const [rsvps, setRsvps] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, confirmed, declined, pending

  useEffect(() => {
    if (user && invitationId) {
      fetchRSVPs()
    }
  }, [user, invitationId])

  const fetchRSVPs = async () => {
    try {
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .eq('invitation_id', invitationId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setRsvps(data || [])
    } catch (error) {
      console.error('Error fetching RSVPs:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    const headers = ['Guest Name', 'Attending', 'Companions', 'Message', 'Date']
    const rows = rsvps.map(rsvp => [
      rsvp.guest_name,
      rsvp.attending ? 'Yes' : 'No',
      rsvp.companions_count,
      rsvp.message || '',
      new Date(rsvp.created_at).toLocaleDateString()
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `rsvps-${invitationId}-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const stats = {
    total: rsvps.length,
    confirmed: rsvps.filter(r => r.attending).length,
    declined: rsvps.filter(r => !r.attending).length,
    totalGuests: rsvps.reduce((sum, r) => sum + (r.attending ? 1 + r.companions_count : 0), 0)
  }

  const filteredRSVPs = rsvps.filter(rsvp => {
    if (filter === 'all') return true
    if (filter === 'confirmed') return rsvp.attending
    if (filter === 'declined') return !rsvp.attending
    return true
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-amber-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-100 mb-2">لوحة التحكم</h1>
          <p className="text-amber-200/70">تتبع تأكيدات الحضور لحفل زفافك</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'إجمالي الردود', value: stats.total, icon: Users, color: 'from-blue-500 to-blue-600' },
            { label: 'مؤكدي الحضور', value: stats.confirmed, icon: CheckCircle, color: 'from-green-500 to-green-600' },
            { label: 'معتذرين', value: stats.declined, icon: XCircle, color: 'from-red-500 to-red-600' },
            { label: 'إجمالي الضيوف', value: stats.totalGuests, icon: BarChart3, color: 'from-amber-500 to-amber-600' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-md border border-amber-500/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-bold text-amber-100">{stat.value}</span>
              </div>
              <p className="text-amber-200/80 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-amber-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white/5 border border-amber-500/20 rounded-lg px-4 py-2 text-amber-100 focus:outline-none focus:border-amber-500/50"
            >
              <option value="all">الكل</option>
              <option value="confirmed">مؤكدي الحضور</option>
              <option value="declined">المعتذرين</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={exportToCSV}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 transition-all text-amber-200"
          >
            <Download className="w-5 h-5" />
            تصدير CSV
          </motion.button>
        </div>

        {/* RSVP Table */}
        <div className="bg-white/5 backdrop-blur-md border border-amber-500/20 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-amber-500/20">
                  <th className="px-6 py-4 text-right text-amber-200 font-medium">الاسم</th>
                  <th className="px-6 py-4 text-right text-amber-200 font-medium">الحالة</th>
                  <th className="px-6 py-4 text-right text-amber-200 font-medium">المرافقين</th>
                  <th className="px-6 py-4 text-right text-amber-200 font-medium">الرسالة</th>
                  <th className="px-6 py-4 text-right text-amber-200 font-medium">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {filteredRSVPs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-amber-200/60">
                      لا توجد ردود بعد
                    </td>
                  </tr>
                ) : (
                  filteredRSVPs.map((rsvp, index) => (
                    <motion.tr
                      key={rsvp.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-amber-500/10 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 text-amber-100">{rsvp.guest_name}</td>
                      <td className="px-6 py-4">
                        {rsvp.attending ? (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            مؤكد
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm">
                            <XCircle className="w-4 h-4" />
                            معتذر
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-amber-200">{rsvp.companions_count}</td>
                      <td className="px-6 py-4 text-amber-200/80 max-w-xs truncate">
                        {rsvp.message || '-'}
                      </td>
                      <td className="px-6 py-4 text-amber-200/60 text-sm">
                        {new Date(rsvp.created_at).toLocaleDateString('ar-DZ')}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HostDashboard
