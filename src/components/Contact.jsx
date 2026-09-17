import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Mail, Phone } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contact" className="relative py-24 px-4 sm:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-burgundy-900 via-luxury-obsidian to-luxury-charcoal" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-full h-full">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-luxury-gold-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-luxury-burgundy-500/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-glass border border-luxury-gold-400/20 mb-8">
            <MessageCircle className="w-4 h-4 text-luxury-gold-400" />
            <span className="text-sm font-medium text-luxury-gold-300">
              تواصل معنا
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-luxury-champagne mb-4 leading-tight">
            جاهزان لدعوة لا تُنسى؟
          </h2>
          <p className="text-lg text-luxury-champagne/80 max-w-2xl mx-auto leading-relaxed">
            راسلنا على واتساب أو عبر البريد — نرد بسرعة
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {/* WhatsApp Card */}
          <motion.a
            href="https://wa.me/213775428017"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="flex items-center gap-5 p-8 glass-card rounded-3xl"
            dir="rtl"
          >
            <div className="w-16 h-16 rounded-2xl bg-luxury-gold-400/20 flex items-center justify-center flex-shrink-0">
              <Phone className="w-8 h-8 text-luxury-gold-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-luxury-champagne mb-2">
                واتساب
              </h3>
              <p className="text-luxury-champagne/80">
                +213 775 428 017
              </p>
            </div>
          </motion.a>

          {/* Email Card */}
          <motion.a
            href="mailto:contact@dawati.dz"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="flex items-center gap-5 p-8 glass-card rounded-3xl"
            dir="rtl"
          >
            <div className="w-16 h-16 rounded-2xl bg-luxury-gold-400/20 flex items-center justify-center flex-shrink-0">
              <Mail className="w-8 h-8 text-luxury-gold-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-luxury-champagne mb-2">
                البريد الإلكتروني
              </h3>
              <p className="text-luxury-champagne/80">
                contact@dawati.dz
              </p>
            </div>
          </motion.a>
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 glass-card rounded-3xl text-center"
        >
          <p className="text-luxury-champagne/80 mb-6">
            نرد على جميع الاستفسارات خلال 24 ساعة
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { label: 'أكثر من 100 زوج', icon: '💑' },
              { label: 'تقييم 4.9/5', icon: '⭐' },
              { label: 'دعم 24/7', icon: '🕐' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-luxury-champagne/90 font-medium">
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
