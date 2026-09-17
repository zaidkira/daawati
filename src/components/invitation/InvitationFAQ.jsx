import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const InvitationFAQ = ({ faq }) => {
  const { t, direction } = useLanguage()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
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
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">
              {t('faq')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-amber-100 mb-4">
            الأسئلة الشائعة
          </h2>
          <p className="text-lg text-amber-200/70 max-w-2xl mx-auto">
            إجابات على الأسئلة التي قد تدور في ذهنك
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faq.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-white/5 backdrop-blur-md border border-amber-500/20 rounded-2xl overflow-hidden"
              dir={direction}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-8 py-6 flex items-center justify-between gap-4 text-right"
              >
                <span className="text-base font-semibold text-amber-100">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    openIndex === index
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                      : 'bg-white/5'
                  }`}
                >
                  <ChevronDown
                    className={`w-5 h-5 ${
                      openIndex === index ? 'text-white' : 'text-amber-400'
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
                    className="px-8 pb-6 pt-0 border-t border-amber-500/20"
                  >
                    <p className="text-amber-200/80 text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

export default InvitationFAQ
