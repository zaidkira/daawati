import React from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const EventProgram = ({ program }) => {
  const { t, language } = useLanguage()

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
            {t('program')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-luxury-gold-400 to-luxury-gold-600 mx-auto rounded-full" />
        </motion.div>

        {/* Program List */}
        <div className="space-y-4">
          {program.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl flex items-center gap-6"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-luxury-gold-400/20 flex items-center justify-center">
                <Clock className="w-8 h-8 text-luxury-gold-400" />
              </div>
              <div className="flex-1">
                <div className="text-2xl font-serif font-bold text-luxury-gold-400 mb-1">
                  {item.time}
                </div>
                <div className="text-lg text-luxury-champagne">
                  {language === 'ar' ? item.title : item.titleFr}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventProgram
