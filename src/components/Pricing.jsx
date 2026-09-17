import React from 'react'
import { motion } from 'framer-motion'
import { Check, Crown, Sparkles } from 'lucide-react'

const Pricing = () => {
  const plans = [
    {
      name: 'الأساسية',
      price: '4.900',
      originalPrice: '7.900',
      description: 'دعوة كاملة مع الميزات الأساسية',
      features: [
        'دعوة كاملة بأسميكما',
        'رابط خاص للمشاركة',
        'عدّ تنازلي حي',
        'معرض صور',
        'خريطة القاعة'
      ],
      popular: false
    },
    {
      name: 'المميزة',
      price: '6.900',
      originalPrice: '9.900',
      description: 'كل شيء تحتاجونه مع إضافات مميزة',
      features: [
        'كل مزايا الباقة الأساسية',
        'تأكيد الحضور RSVP',
        'دعوة باسم كل مدعو',
        'لوحة متابعة خاصة',
        'تعديلات على الألوان'
      ],
      popular: true
    },
    {
      name: 'الملكية',
      price: '9.900',
      originalPrice: '14.500',
      description: 'تخصيص كامل مع خدمة VIP',
      features: [
        'كل مزايا الباقة المميزة',
        'تخصيص كامل للقالب',
        'موسيقى وصوت خاصان',
        'رمز QR للطباعة',
        'تعديلات غير محدودة'
      ],
      popular: false
    }
  ]

  return (
    <section id="pricing" className="relative py-24 px-4 sm:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-charcoal to-luxury-obsidian" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-2 h-2 bg-luxury-gold-400 rounded-full animate-pulse-slow" />
      <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-luxury-burgundy-400 rounded-full animate-pulse-slow" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-glass border border-luxury-gold-400/20 mb-8">
            <Sparkles className="w-4 h-4 text-luxury-gold-400" />
            <span className="text-sm font-medium text-luxury-gold-300">
              أسعار شفافة وواضحة
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-luxury-champagne mb-4">
            اختر الباقة المناسبة لكما
          </h2>
          <p className="text-lg text-luxury-champagne/70 max-w-2xl mx-auto">
            دفعة واحدة، بدون مفاجآت. كل شيء قابل للنقاش حسب حاجتكما.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`relative p-8 rounded-3xl ${
                plan.popular
                  ? 'bg-gradient-to-b from-luxury-gold-500/20 to-luxury-gold-400/10 border-2 border-luxury-gold-400 shadow-gold-glow'
                  : 'glass-card'
              }`}
              dir="rtl"
            >
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-400 text-luxury-obsidian text-xs font-bold flex items-center gap-2 shadow-lg"
                >
                  <Crown className="w-4 h-4" />
                  الأكثر اختيارًا
                </motion.div>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-luxury-champagne' : 'text-luxury-champagne'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.popular ? 'text-luxury-champagne/80' : 'text-luxury-champagne/70'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-3">
                  <span className={`text-5xl font-serif font-bold ${plan.popular ? 'text-luxury-champagne' : 'text-luxury-gold-400'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-xl line-through ${plan.popular ? 'text-luxury-champagne/50' : 'text-luxury-champagne/40'}`}>
                    {plan.originalPrice}
                  </span>
                </div>
                <span className={`text-sm ${plan.popular ? 'text-luxury-champagne/70' : 'text-luxury-champagne/60'}`}>
                  دج
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.popular ? 'bg-luxury-gold-400/20' : 'bg-luxury-gold-400/10'
                    }`}>
                      <Check className={`w-3.5 h-3.5 ${plan.popular ? 'text-luxury-champagne' : 'text-luxury-gold-400'}`} />
                    </div>
                    <span className={`text-sm ${plan.popular ? 'text-luxury-champagne/90' : 'text-luxury-champagne/80'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-400 text-luxury-obsidian shadow-gold-glow'
                    : 'border-2 border-luxury-gold-400 text-luxury-gold-400 hover:bg-luxury-gold-400/10'
                }`}
              >
                اطللب هذه الباقة
              </button>
            </motion.div>
          ))}
        </div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-8 glass-card rounded-3xl max-w-2xl mx-auto flex items-center gap-6"
          dir="rtl"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-luxury-gold-500 to-luxury-gold-400 flex items-center justify-center flex-shrink-0">
            <Check className="w-8 h-8 text-luxury-obsidian" />
          </div>
          <div>
            <p className="font-bold text-luxury-gold-400 text-lg mb-2">
              ضمان الاسترجاع الكامل
            </p>
            <p className="text-luxury-champagne/70 text-sm leading-relaxed">
              ما عجبتكش الدعوة قبل مشاركتها مع الضيوف؟ نرجعولك دراهمك كاملة — بلا أسئلة وبلا شروط.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
