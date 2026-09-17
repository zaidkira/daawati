import React from 'react'
import { motion } from 'framer-motion'
import { Shirt } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const DressCode = ({ dressCode }) => {
  const { t, language } = useLanguage()

  return (
    <section className="py-16 px-4" style={{ backgroundColor: '#fdfbf7' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-12 rounded-3xl text-center"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(201, 162, 39, 0.15)'
          }}
        >
          <div className="flex justify-center mb-6">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(201, 162, 39, 0.15)'
              }}
            >
              <Shirt 
                className="w-10 h-10"
                style={{ color: '#c9a227' }}
              />
            </div>
          </div>

          <h2 
            className="text-3xl sm:text-4xl font-serif font-bold mb-4"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: '#4a4a4a'
            }}
          >
            {t('dressCode')}
          </h2>
          
          <p 
            className="text-xl"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: '#6b6b6b'
            }}
          >
            {language === 'ar' ? dressCode.textAr : dressCode.text}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default DressCode
