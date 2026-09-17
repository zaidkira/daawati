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
        <div 
          className="p-12 rounded-3xl text-center"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(201, 162, 39, 0.15)'
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.15)'
            }}
          >
            <CheckCircle 
              className="w-12 h-12"
              style={{ color: '#22c55e' }}
            />
          </motion.div>
          <h2 
            className="text-3xl sm:text-4xl font-serif font-bold mb-4"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: '#4a4a4a'
            }}
          >
            {t('thankYou')}
          </h2>
          <p 
            className="text-lg"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: '#6b6b6b'
            }}
          >
            {language === 'ar' ? 'نتطلع لرؤيتك في حفلنا' : 'We look forward to seeing you at our celebration'}
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <section id="rsvp" className="py-20 px-4" style={{ backgroundColor: '#fdfbf7' }}>
      <div className="max-w-2xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 
            className="text-4xl sm:text-5xl font-serif font-bold mb-4"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: '#4a4a4a'
            }}
          >
            {t('rsvp')}
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{
              background: 'linear-gradient(to right, #c9a227, #d6af59, #c9a227)'
            }}
          />
        </motion.div>

        {/* Adults Only Notice */}
        {adultsOnly && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl mb-8 text-center"
            style={{
              backgroundColor: 'rgba(201, 162, 39, 0.1)',
              border: '1px solid rgba(201, 162, 39, 0.3)'
            }}
          >
            <p 
              className="font-medium"
              style={{ color: '#c9a227' }}
            >
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
          className="p-8 sm:p-12 rounded-3xl space-y-6"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(201, 162, 39, 0.15)'
          }}
        >
          {/* Name */}
          <div>
            <label 
              className="block mb-2 font-medium"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                color: '#4a4a4a'
              }}
            >
              {t('name')} *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-6 py-4 rounded-xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid rgba(201, 162, 39, 0.3)',
                color: '#4a4a4a',
                fontFamily: '"Plus Jakarta Sans", sans-serif'
              }}
              placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
            />
          </div>

          {/* Attending */}
          <div>
            <label 
              className="block mb-3 font-medium"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                color: '#4a4a4a'
              }}
            >
              {t('attending')} *
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, attending: true })}
                className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
                  formData.attending === true
                    ? 'bg-gradient-to-r from-[#c9a227] to-[#d6af59] text-[#1a1a1a]'
                    : 'bg-white/5 border border-white/10 text-[#4a4a4a] hover:border-[#c9a227]/50'
                }`}
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif'
                }}
              >
                {t('yes')}
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, attending: false })}
                className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
                  formData.attending === false
                    ? 'bg-gradient-to-r from-[#c9a227] to-[#d6af59] text-[#1a1a1a]'
                    : 'bg-white/5 border border-white/10 text-[#4a4a4a] hover:border-[#c9a227]/50'
                }`}
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif'
                }}
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
                      className="flex-1 px-6 py-4 rounded-xl"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                        border: '1px solid rgba(201, 162, 39, 0.3)',
                        color: '#4a4a4a',
                        fontFamily: '"Plus Jakarta Sans", sans-serif'
                      }}
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
            <label 
              className="block mb-2 font-medium"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                color: '#4a4a4a'
              }}
            >
              {t('message')}
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-6 py-4 rounded-xl min-h-[100px] resize-none"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid rgba(201, 162, 39, 0.3)',
                color: '#4a4a4a',
                fontFamily: '"Plus Jakarta Sans", sans-serif'
              }}
              placeholder={language === 'ar' ? 'رسالة اختيارية...' : 'Optional message...'}
            />
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl text-center"
              style={{
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                border: '1px solid rgba(220, 38, 38, 0.3)',
                color: '#dc2626'
              }}
            >
              {error}
            </motion.div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!formData.name || formData.attending === null || isSubmitting}
            className="w-full py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #c9a227 0%, #d6af59 50%, #c9a227 100%)',
              color: '#1a1a1a',
              fontFamily: '"Playfair Display", serif',
              boxShadow: '0 4px 20px rgba(201, 162, 39, 0.3)'
            }}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a] rounded-full animate-spin" />
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
