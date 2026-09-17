import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, MessageSquare, Plus, Trash2, Check, X } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../lib/supabase'

const RSVPForm = ({ invitationId, rsvpSettings }) => {
  const { t, direction } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    guestName: '',
    attending: null,
    companions: [],
    message: ''
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.guestName.trim()) {
      newErrors.guestName = 'الاسم مطلوب'
    }
    
    if (formData.attending === null) {
      newErrors.attending = 'يرجى تحديد الحضور'
    }
    
    if (formData.attending === true && formData.companions.length > (rsvpSettings?.maxCompanions || 5)) {
      newErrors.companions = `الحد الأقصى للمرافقين هو ${rsvpSettings?.maxCompanions || 5}`
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const { data, error } = await supabase
        .from('rsvps')
        .insert([
          {
            invitation_id: invitationId,
            guest_name: formData.guestName,
            attending: formData.attending,
            companions_count: formData.companions.length,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ])
        .select()
      
      if (error) throw error
      
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting RSVP:', error)
      alert('حدث خطأ أثناء إرسال التأكيد. يرجى المحاولة مرة أخرى.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const addCompanion = () => {
    if (formData.companions.length >= (rsvpSettings?.maxCompanions || 5)) return
    setFormData({
      ...formData,
      companions: [...formData.companions, '']
    })
  }

  const removeCompanion = (index) => {
    setFormData({
      ...formData,
      companions: formData.companions.filter((_, i) => i !== index)
    })
  }

  const updateCompanion = (index, value) => {
    const newCompanions = [...formData.companions]
    newCompanions[index] = value
    setFormData({
      ...formData,
      companions: newCompanions
    })
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 backdrop-blur-md border border-amber-500/20 rounded-3xl p-12 text-center"
        dir={direction}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-6"
        >
          <Check className="w-10 h-10 text-white" />
        </motion.div>
        <h3 className="text-2xl font-serif font-bold text-amber-100 mb-4">
          {t('thankYou')}
        </h3>
        <p className="text-amber-200/80">
          ننتظر رؤيتك في هذا اليوم المميز
        </p>
      </motion.div>
    )
  }

  return (
    <section id="rsvp" className="relative py-24 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          dir={direction}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-amber-500/20 mb-8">
            <Mail className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">
              {t('rsvp')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-amber-100 mb-4">
            تأكيد الحضور
          </h2>
          <p className="text-lg text-amber-200/70">
            يسعدنا معرفة إن كنت ستشاركنا فرحتنا
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-md border border-amber-500/20 rounded-3xl p-8 md:p-12"
          dir={direction}
        >
          {/* Name Field */}
          <div className="mb-6">
            <label className="block text-amber-200 font-medium mb-3">
              {t('name')} *
            </label>
            <div className="relative">
              <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400/60" />
              <input
                type="text"
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                className={`w-full px-12 py-4 bg-white/5 border ${
                  errors.guestName ? 'border-red-500/50' : 'border-amber-500/20'
                } rounded-xl text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-amber-500/50 transition-all`}
                placeholder="أدخل اسمك الكامل"
              />
            </div>
            {errors.guestName && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-red-400 text-sm"
              >
                {errors.guestName}
              </motion.p>
            )}
          </div>

          {/* Attending Radio */}
          <div className="mb-6">
            <label className="block text-amber-200 font-medium mb-3">
              {t('attending')} *
            </label>
            <div className="flex gap-4">
              {[
                { value: true, label: t('yes'), icon: Check },
                { value: false, label: t('no'), icon: X }
              ].map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData({ ...formData, attending: option.value })}
                  className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl border transition-all ${
                    formData.attending === option.value
                      ? 'bg-amber-500/20 border-amber-500/50'
                      : 'bg-white/5 border-amber-500/20 hover:border-amber-500/30'
                  }`}
                >
                  <option.icon className={`w-5 h-5 ${
                    formData.attending === option.value ? 'text-amber-400' : 'text-amber-400/60'
                  }`} />
                  <span className="text-amber-100 font-medium">{option.label}</span>
                </motion.button>
              ))}
            </div>
            {errors.attending && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-red-400 text-sm"
              >
                {errors.attending}
              </motion.p>
            )}
          </div>

          {/* Companions (only if attending) */}
          <AnimatePresence>
            {formData.attending === true && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <label className="block text-amber-200 font-medium mb-3">
                  {t('companions')}
                </label>
                
                {formData.companions.map((companion, index) => (
                  <div key={index} className="flex gap-3 mb-3">
                    <input
                      type="text"
                      value={companion}
                      onChange={(e) => updateCompanion(index, e.target.value)}
                      className="flex-1 px-4 py-3 bg-white/5 border border-amber-500/20 rounded-xl text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-amber-500/50 transition-all"
                      placeholder={`مرافق ${index + 1}`}
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeCompanion(index)}
                      className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-all"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </motion.button>
                  </div>
                ))}
                
                {formData.companions.length < (rsvpSettings?.maxCompanions || 5) && (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={addCompanion}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 transition-all text-amber-200"
                  >
                    <Plus className="w-5 h-5" />
                    {t('addCompanion')}
                  </motion.button>
                )}
                
                {errors.companions && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-red-400 text-sm"
                  >
                    {errors.companions}
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Adults Only Notice */}
          {rsvpSettings?.adultsOnly && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20"
            >
              <p className="text-amber-300 text-sm">
                {t('adultsOnly')}
              </p>
            </motion.div>
          )}

          {/* Message (Optional) */}
          <div className="mb-8">
            <label className="block text-amber-200 font-medium mb-3">
              {t('message')} {rsvpSettings?.requireMessage && '*'}
            </label>
            <div className="relative">
              <MessageSquare className="absolute right-4 top-4 w-5 h-5 text-amber-400/60" />
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-12 py-4 bg-white/5 border border-amber-500/20 rounded-xl text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-amber-500/50 transition-all resize-none"
                placeholder="أضف رسالة للعروسين (اختياري)"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, #c99c2c 0%, #d6af59 50%, #c99c2c 100%)',
              color: '#1a1a1a',
              boxShadow: '0 0 30px rgba(201, 156, 44, 0.3)'
            }}
          >
            {isSubmitting ? 'جاري الإرسال...' : t('submit')}
          </motion.button>
        </motion.form>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

export default RSVPForm
