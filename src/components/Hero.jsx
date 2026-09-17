import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Heart, ChevronDown } from 'lucide-react'

const Hero = () => {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-8">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-obsidian via-luxury-charcoal to-luxury-obsidian" />
      
      {/* Decorative Elements */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-20 right-20 w-2 h-2 bg-luxury-gold-400 rounded-full"
      />
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute top-40 left-32 w-1.5 h-1.5 bg-luxury-gold-300 rounded-full"
      />
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute bottom-40 right-40 w-3 h-3 bg-luxury-burgundy-400 rounded-full blur-sm"
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center" dir="rtl">
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-glass border border-luxury-gold-400/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-luxury-gold-400" />
          <span className="text-sm font-medium text-luxury-gold-300">
            دعوات زفاف رقمية فاخرة
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight"
        >
          <span className="text-luxury-champagne">دعوة أنيقة تليق</span>
          <br />
          <span className="gold-gradient-text relative inline-block">
            بأجمل يوم في حياتكما
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 top-1/2 -translate-y-1/2"
            >
              <Heart className="w-8 h-8 text-luxury-burgundy-400 fill-luxury-burgundy-400" />
            </motion.div>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl text-luxury-champagne/70 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          دعوتكما هي أول انطباع عن حفلكما. صمّمها، شاركها برابط واحد، وتابع تأكيدات الحضور لحظة بلحظة.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button 
            onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
            className="luxury-button flex items-center gap-3 group"
          >
            استكشف القوالب
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
            className="luxury-button-outline"
          >
            اطلب الآن
          </button>
        </motion.div>

        {/* Price Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white/5 backdrop-blur-glass border border-luxury-gold-400/20"
        >
          <span className="text-2xl">✨</span>
          <span className="text-luxury-champagne/70">ابتداءً من</span>
          <span className="text-3xl font-serif font-bold text-luxury-gold-400">4.900 دج</span>
          <span className="text-lg text-luxury-champagne/50 line-through">7.900 دج</span>
          <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-400 text-luxury-obsidian text-sm font-bold">
            عرض محدود
          </span>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          {[
            { icon: '💌', text: 'دعوة رقمية' },
            { icon: '🌿', text: 'بلا ورق' },
            { icon: '🌍', text: 'عربي + فرنسي' }
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-luxury-champagne/80"
            >
              <span className="text-xl">{feature.icon}</span>
              <span className="text-sm font-medium">{feature.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-luxury-gold-400"
      >
        <span className="text-xs font-medium">اكتشف المزيد</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
