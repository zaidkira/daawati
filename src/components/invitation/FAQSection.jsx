import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const FAQSection = ({ faq }) => {
  const { t, language } = useLanguage()
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-luxury-charcoal to-luxury-obsidian">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-luxury-champagne mb-4">
            {t('faq')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-luxury-gold-400 to-luxury-gold-600 mx-auto rounded-full" />
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faq.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between"
              >
                <span className="text-lg font-medium text-luxury-champagne">
                  {language === 'ar' ? item.question : item.questionFr}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-luxury-gold-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-luxury-gold-400 flex-shrink-0" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-luxury-champagne/80">
                        {language === 'ar' ? item.answer : item.answerFr}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
