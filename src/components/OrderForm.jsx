import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Check, Calendar } from 'lucide-react'

const OrderForm = () => {
  const [formData, setFormData] = useState({
    groomName: '',
    brideName: '',
    phone: '',
    package: 'premium',
    template: ''
  })

  const packages = [
    { id: 'essential', name: 'الأساسية', price: '4.900' },
    { id: 'premium', name: 'المميزة', price: '6.900', popular: true },
    { id: 'royal', name: 'الملكية', price: '9.900' }
  ]

  const templates = [
    'أختار لاحقًا',
    'Islamic Royal',
    'Sage Garden',
    'Floral Romantic',
    'Azura Beach',
    'Amazigh Royal',
    'El Mahroussa'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('شكرًا على طلبك! سنتواصل معك قريبًا.')
  }

  return (
    <section id="commander" className="relative py-24 px-4 sm:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-obsidian to-luxury-charcoal" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-luxury-gold-500/10 rounded-full blur-3xl animate-float" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-glass border border-luxury-gold-400/20 mb-8">
            <Calendar className="w-4 h-4 text-luxury-gold-400" />
            <span className="text-sm font-medium text-luxury-gold-300">
              ابدأ رحلتكما
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-luxury-champagne mb-4">
            اطللبا دعوتكما الآن
          </h2>
          <p className="text-lg text-luxury-champagne/70 max-w-2xl mx-auto">
            ثلاث خطوات بسيطة وتصلكما دعوتكما
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="glass-card p-10 rounded-3xl"
          dir="rtl"
        >
          {/* Package Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-luxury-champagne mb-4">
              الباقة المختارة
            </label>
            <div className="grid grid-cols-3 gap-4">
              {packages.map((pkg) => (
                <motion.button
                  key={pkg.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, package: pkg.id })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-4 rounded-xl transition-all duration-300 ${
                    formData.package === pkg.id
                      ? 'bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-400 text-luxury-obsidian shadow-gold-glow'
                      : 'bg-white/5 border border-white/10 text-luxury-champagne hover:border-luxury-gold-400/50'
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-2 -right-2 text-xs">⭐</span>
                  )}
                  <div className="font-semibold text-sm">{pkg.name}</div>
                  <div className={`text-xs mt-1 ${formData.package === pkg.id ? 'text-luxury-obsidian/70' : 'text-luxury-champagne/60'}`}>
                    {pkg.price} دج
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Template Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-luxury-champagne mb-4">
              القالب المختار <span className="font-normal text-luxury-champagne/50">(اختياري)</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {templates.map((template) => (
                <motion.button
                  key={template}
                  type="button"
                  onClick={() => setFormData({ ...formData, template })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    formData.template === template
                      ? 'bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-400 text-luxury-obsidian'
                      : 'bg-white/5 border border-white/10 text-luxury-champagne hover:border-luxury-gold-400/50'
                  }`}
                >
                  {template}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Name Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-luxury-champagne mb-3">
                اسم العريس*
              </label>
              <input
                type="text"
                placeholder="مثال: محمد"
                value={formData.groomName}
                onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                required
                className="input-luxury"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-luxury-champagne mb-3">
                اسم العروس*
              </label>
              <input
                type="text"
                placeholder="مثال: أمال"
                value={formData.brideName}
                onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                required
                className="input-luxury"
              />
            </div>
          </div>

          {/* Phone Input */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-luxury-champagne mb-3">
              رقم الهاتف*
            </label>
            <input
              type="tel"
              placeholder="مثال: 0550 12 34 56"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="input-luxury"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-5 rounded-full bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-400 text-luxury-obsidian font-bold text-lg shadow-gold-glow flex items-center justify-center gap-3"
          >
            <Send className="w-5 h-5" />
            أرسل الطلب
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}

export default OrderForm
