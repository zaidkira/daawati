import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: 'كيف أطلب دعوتي؟',
      answer: 'اختر القالب الذي أعجبك واضغط «اطلب هذا القالب» — يفتح واتساب برسالة جاهزة. نتفق على التفاصيل ونبدأ التصميم مباشرة.'
    },
    {
      question: 'كم يستغرق تجهيز الدعوة؟',
      answer: 'عادةً خلال 24-48 ساعة بعد استلام التفاصيل. للطلبات المعقدة أو التخصيص الكامل، قد يستغرق حتى 3 أيام.'
    },
    {
      question: 'هل يمكن تعديل الألوان والنصوص؟',
      answer: 'نعم! في الباقات المميزة والملكية، يمكنك طلب تعديلات غير محدودة على الألوان والنصوص حتى تصل للنتيجة المطلوبة.'
    },
    {
      question: 'كيف يؤكد الضيوف حضورهم؟',
      answer: 'كل دعوة تحتوي على زر RSVP يسمح للضيوف بتأكيد الحضور، عدد المرافقين والأطفال بضغطة واحدة من داخل الدعوة.'
    },
    {
      question: 'هل الدعوة تعمل على كل الهواتف؟',
      answer: 'نعم، الدعوات متوافقة مع جميع الهواتف الذكية (Android, iOS) وتعمل على المتصفحات المختلفة بشكل مثالي.'
    },
    {
      question: 'هل يمكن طباعة رمز QR على بطاقات ورقية؟',
      answer: 'نعم، في الباقة الملكية نزودك برمز QR جاهز للطباعة على الدعوات الورقية التقليدية لربطها بالدعوة الرقمية.'
    }
  ]

  return (
    <section id="faq" className="relative py-24 px-4 sm:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-charcoal to-luxury-obsidian" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-luxury-gold-500/10 rounded-full blur-3xl animate-float" />

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
            <HelpCircle className="w-4 h-4 text-luxury-gold-400" />
            <span className="text-sm font-medium text-luxury-gold-300">
              الأسئلة الشائعة
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-luxury-champagne mb-4">
            كل ما تحتاج معرفته
          </h2>
          <p className="text-lg text-luxury-champagne/70 max-w-2xl mx-auto">
            إجابات واضحة على أكثر الأسئلة شيوعًا
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="glass-card rounded-2xl overflow-hidden"
              dir="rtl"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-8 py-6 flex items-center justify-between gap-4 text-right"
              >
                <span className="text-base font-semibold text-luxury-champagne">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    openIndex === index
                      ? 'bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-400'
                      : 'bg-white/5'
                  }`}
                >
                  <ChevronDown
                    className={`w-5 h-5 ${
                      openIndex === index ? 'text-luxury-obsidian' : 'text-luxury-gold-400'
                    }`}
                  />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-8 pb-6 pt-0 border-t border-white/10"
                  >
                    <p className="text-luxury-champagne/80 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-8 glass-card rounded-3xl text-center"
          dir="rtl"
        >
          <p className="text-luxury-champagne/80 mb-6">
            لم تجد إجابة على سؤالك؟
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-400 text-luxury-obsidian font-semibold shadow-gold-glow"
          >
            تواصل معنا
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
