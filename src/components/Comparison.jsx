import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Check, X } from 'lucide-react'

const Comparison = () => {
  return (
    <section className="relative py-24 px-4 sm:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-obsidian to-luxury-charcoal" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-luxury-gold-500/10 rounded-full blur-3xl animate-float" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-glass border border-luxury-gold-400/20 mb-8">
            <TrendingUp className="w-4 h-4 text-luxury-gold-400" />
            <span className="text-sm font-medium text-luxury-gold-300">
              وفّر المال والوقت
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-luxury-champagne mb-4">
            الدعوة الرقمية vs الورقية
          </h2>
          <p className="text-lg text-luxury-champagne/70 max-w-2xl mx-auto">
            قارن بين الدعوة الرقمية الحديثة والدعوة الورقية التقليدية
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Paper Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 rounded-3xl"
            dir="rtl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl">
                📄
              </div>
              <h3 className="text-2xl font-bold text-luxury-champagne">
                الدعوة الورقية
              </h3>
            </div>

            <div className="mb-8">
              <p className="text-5xl font-serif font-bold text-luxury-champagne mb-2">
                33.000
              </p>
              <span className="text-luxury-champagne/70">دج</span>
            </div>

            <ul className="space-y-4">
              {[
                { item: 'تصميم', price: '5.000' },
                { item: 'طباعة 100 بطاقة', price: '18.000' },
                { item: 'الأظرف', price: '4.000' },
                { item: 'التوزيع والتنقل', price: '6.000' }
              ].map((item, index) => (
                <li key={index} className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-luxury-champagne/80">{item.item}</span>
                  <span className="font-mono font-semibold text-luxury-champagne">
                    {item.price} دج
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-4 rounded-xl bg-white/5 text-center">
              <p className="text-luxury-champagne/70 text-sm">
                بلا متابعة حضور، بلا تعديل بعد الطباعة
              </p>
            </div>
          </motion.div>

          {/* Digital Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-8 rounded-3xl bg-gradient-to-b from-luxury-gold-500/20 to-luxury-gold-400/10 border-2 border-luxury-gold-400 shadow-gold-glow"
            dir="rtl"
          >
            <div className="absolute -top-4 right-8 px-4 py-2 rounded-full bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-400 text-luxury-obsidian text-xs font-bold shadow-lg">
              وفّر 28.100 دج
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-luxury-gold-400/20 flex items-center justify-center text-3xl">
                💻
              </div>
              <h3 className="text-2xl font-bold text-luxury-champagne">
                الدعوة الرقمية
              </h3>
            </div>

            <div className="mb-8">
              <p className="text-5xl font-serif font-bold text-luxury-champagne mb-2">
                4.900
              </p>
              <span className="text-luxury-champagne/70">دج</span>
            </div>

            <ul className="space-y-3">
              {[
                'لوحة متابعة الضيوف',
                'تأكيدات حضور فورية',
                'تسليم خلال ساعات',
                'تعديلات بعد الإرسال',
                'عربي + فرنسي',
                'موسيقى ومعرض صور'
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-luxury-gold-400/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-luxury-champagne" />
                  </div>
                  <span className="text-luxury-champagne/90 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Feature Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl overflow-hidden"
        >
          <div className="grid grid-cols-3 px-8 py-5 bg-white/5 border-b border-white/10 text-xs font-bold text-luxury-champagne/60 uppercase tracking-wider" dir="rtl">
            <span>الميزة</span>
            <span className="text-center">ورقي</span>
            <span className="text-center">رقمي</span>
          </div>

          {[
            { feature: 'تحديث التفاصيل بعد الإرسال', paper: false, digital: true },
            { feature: 'متابعة تأكيدات الحضور', paper: false, digital: true },
            { feature: 'خريطة تفاعلية للقاعة', paper: false, digital: true },
            { feature: 'عدّ تنازلي مباشر', paper: false, digital: true },
            { feature: 'معرض صور', paper: false, digital: true },
            { feature: 'موسيقى خلفية', paper: false, digital: true }
          ].map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 px-8 py-5 text-sm ${
                index < 5 ? 'border-b border-white/5' : ''
              } ${index % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
              dir="rtl"
            >
              <span className="text-luxury-champagne">{item.feature}</span>
              <span className="text-center text-luxury-champagne/40">
                <X className="w-5 h-5 mx-auto" />
              </span>
              <span className="text-center">
                <Check className="w-5 h-5 mx-auto text-luxury-gold-400" />
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Comparison
