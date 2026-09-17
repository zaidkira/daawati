import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, CheckCircle, Send } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../lib/supabase'

const RSVPForm = ({ invitationId, adultsOnly }) => {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    attending: null,
    companions: [],
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const addCompanion = () => {
    if (formData.companions.length < 5) {
      setFormData({
        ...formData,
        companions: [...formData.companions, '']
      })
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const { data, error } = await supabase
        .from('rsvps')
        .insert({
          invitation_id: invitationId,
          guest_name: formData.name,
          attending: formData.attending,
          companions_count: formData.companions.filter(c => c.trim()).length,
          companions: formData.companions.filter(c => c.trim()),
          message: formData.message
        })
        .select()

      if (error) throw error

      setIsSubmitted(true)
    } catch (err) {
      console.error('RSVP submission error:', err)
      setError(language === 'ar' ? 'حدث خطأ، يرجى المحاولة مرة أخرى' : 'An error occurred, please try again')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto py-20 px-4"
      >
        <div className="glass-card p-12 rounded-3xl text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-400" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-luxury-champagne mb-4">
            {t('thankYou')}
          </h2>
          <p className="text-luxury-champagne/80">
            {language === 'ar' ? 'نتطلع لرؤيتك في حفلنا' : 'We look forward to seeing you at our celebration'}
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <section id="rsvp" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-luxury-champagne mb-4">
            {t('rsvp')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-luxury-gold-400 to-luxury-gold-600 mx-auto rounded-full" />
        </motion.div>

        {/* Adults Only Notice */}
        {adultsOnly && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4 rounded-xl mb-8 text-center"
          >
            <p className="text-luxury-gold-300 font-medium">
              {t('adultsOnly')}
            </p>
          </motion.div>
        )}

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="glass-card p-8 sm:p-12 rounded-3xl space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-luxury-champagne mb-2 font-medium">
              {t('name')} *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-luxury"
              placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
            />
          </div>

          {/* Attending */}
          <div>
            <label className="block text-luxury-champagne mb-3 font-medium">
              {t('attending')} *
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, attending: true })}
                className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
                  formData.attending === true
                    ? 'bg-luxury-gold-500 text-luxury-obsidian'
                    : 'bg-white/5 text-luxury-champagne border border-white/10 hover:border-luxury-gold-400/50'
                }`}
              >
                {t('yes')}
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, attending: false })}
                className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
                  formData.attending === false
                    ? 'bg-luxury-gold-500 text-luxury-obsidian'
                    : 'bg-white/5 text-luxury-champagne border border-white/10 hover:border-luxury-gold-400/50'
                }`}
              >
                {t('no')}
              </button>
            </div>
          </div>

          {/* Companions */}
          {formData.attending === true && (
            <div>
              <label className="block text-luxury-champagne mb-3 font-medium">
                {t('companions')}
              </label>
              
              <div className="space-y-3 mb-3">
                {formData.companions.map((companion, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={companion}
                      onChange={(e) => updateCompanion(index, e.target.value)}
                      className="input-luxury flex-1"
                      placeholder={language === 'ar' ? 'اسم المرافق' : 'Companion name'}
                    />
                    <button
                      type="button"
                      onClick={() => removeCompanion(index)}
                      className="p-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {formData.companions.length < 5 && (
                <button
                  type="button"
                  onClick={addCompanion}
                  className="flex items-center gap-2 text-luxury-gold-400 hover:text-luxury-gold-300 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  {t('addCompanion')}
                </button>
              )}
            </div>
          )}

          {/* Message */}
          <div>
            <label className="block text-luxury-champagne mb-2 font-medium">
              {t('message')}
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="input-luxury min-h-[100px] resize-none"
              placeholder={language === 'ar' ? 'رسالة اختيارية...' : 'Optional message...'}
            />
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-red-500/20 text-red-400 text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!formData.name || formData.attending === null || isSubmitting}
            className="luxury-button w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-luxury-obsidian border-t-transparent rounded-full animate-spin" />
                {language === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {t('submit')}
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  )
}

export default RSVPForm
