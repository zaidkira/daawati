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
    <section className="py-20 px-4" style={{ backgroundColor: '#fdfbf7' }}>
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl sm:text-5xl font-serif font-bold mb-4"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: '#4a4a4a'
            }}
          >
            {t('faq')}
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{
              background: 'linear-gradient(to right, #c9a227, #d6af59, #c9a227)'
            }}
          />
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
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(201, 162, 39, 0.15)'
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between"
              >
                <span 
                  className="text-lg font-medium"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    color: '#4a4a4a'
                  }}
                >
                  {language === 'ar' ? item.question : item.questionFr}
                </span>
                {openIndex === index ? (
                  <ChevronUp 
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: '#c9a227' }}
                  />
                ) : (
                  <ChevronDown 
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: '#c9a227' }}
                  />
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
                      <p 
                        className="text-base"
                        style={{
                          fontFamily: '"Plus Jakarta Sans", sans-serif',
                          color: '#6b6b6b',
                          lineHeight: '1.6'
                        }}
                      >
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
