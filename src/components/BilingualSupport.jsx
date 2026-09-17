import React from 'react'
import { motion } from 'framer-motion'
import { Globe, Languages, ArrowRightLeft } from 'lucide-react'

const BilingualSupport = () => {
  return (
    <section className="relative py-24 px-4 sm:px-8 overflow-hidden">
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
            <Globe className="w-4 h-4 text-luxury-gold-400" />
            <span className="text-sm font-medium text-luxury-gold-300">
              ثنائية اللغة
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-luxury-champagne mb-4 leading-tight">
            عائلة هنا، وعائلة في الخارج؟
          </h2>
          <p className="text-lg text-luxury-champagne/80 max-w-2xl mx-auto leading-relaxed">
            كل دعوة تعمل بالعربية والفرنسية مع تبديل بلمسة واحدة — والاتجاه ينقلب تلقائيًا من اليمين إلى اليسار
          </p>
        </motion.div>

        {/* Language Switcher Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto p-10 glass-card rounded-3xl text-center"
        >
          <div className="flex items-center justify-center gap-8 p-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-luxury-champagne mb-2">
                العربية
              </p>
              <p className="text-sm text-luxury-champagne/60">
                RTL
              </p>
            </div>

            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="p-4 rounded-full bg-luxury-gold-400/20"
            >
              <ArrowRightLeft className="w-8 h-8 text-luxury-gold-400" />
            </motion.div>

            <div className="text-center">
              <p className="text-3xl font-bold text-luxury-champagne mb-2">
                Français
              </p>
              <p className="text-sm text-luxury-champagne/60">
                LTR
              </p>
            </div>
          </div>

          <p className="text-luxury-champagne/80 mt-6">
            تبديل فوري بين اللغتين مع الحفاظ على التصميم الأنيق
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12"
        >
          {[
            { icon: Languages, title: 'عربي + فرنسي', desc: 'نفس الدعوة، لغتان كاملتان' },
            { icon: Globe, title: 'تبديل بلمسة', desc: 'كل ضيف يقرأ بلغته المفضلة' },
            { icon: ArrowRightLeft, title: 'اتجاه تلقائي', desc: 'RTL للعربية، LTR للفرنسية' }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="p-6 glass-card rounded-2xl text-center"
            >
              <div className="w-12 h-12 rounded-full bg-luxury-gold-400/20 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-luxury-gold-400" />
              </div>
              <h3 className="text-lg font-bold text-luxury-champagne mb-2">
                {item.title}
              </h3>
              <p className="text-luxury-champagne/70 text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default BilingualSupport
