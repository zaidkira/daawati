import React from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const EventProgram = ({ program }) => {
  const { t, language } = useLanguage()

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
            {t('program')}
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{
              background: 'linear-gradient(to right, #c9a227, #d6af59, #c9a227)'
            }}
          />
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
              className="p-6 rounded-2xl flex items-center gap-6"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(201, 162, 39, 0.15)'
              }}
            >
              <div 
                className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(201, 162, 39, 0.15)'
                }}
              >
                <Clock 
                  className="w-8 h-8"
                  style={{ color: '#c9a227' }}
                />
              </div>
              <div className="flex-1">
                <div 
                  className="text-2xl font-serif font-bold mb-1"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    color: '#c9a227'
                  }}
                >
                  {item.time}
                </div>
                <div 
                  className="text-lg"
                  style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    color: '#4a4a4a'
                  }}
                >
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
